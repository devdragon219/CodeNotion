import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useCallback, useMemo } from 'react';
import { Controller, useWatch } from 'react-hook-form';

import { useGetAllCatalogueCategoriesQuery } from '../../../../../gql/RealGimm.Web.CatalogueCategory.operation';
import { CatalogueTypeRow } from '../../../../../interfaces/FormInputs/CatalogueType';
import { groupCatalogueCategories } from '../../../../../utils/catalogueCategory/groupCatalogueCategories';
import { FacilityContractCatalogueTypesFieldProps } from './Field.types';

export const FacilityContractCatalogueTypesField = ({ control }: FacilityContractCatalogueTypesFieldProps) => {
  const estateUnits = useWatch({ control, name: 'estateUnits' });
  const [queryState] = useGetAllCatalogueCategoriesQuery({
    variables: {
      where: {
        catalogueTypes: {
          some: {
            items: {
              some: {
                estate: {
                  id: {
                    in: estateUnits.map(({ estate }) => estate.id),
                  },
                },
              },
            },
          },
        },
      },
    },
  });
  const catalogueCategories = useMemo(
    () => groupCatalogueCategories(queryState.data?.catalogueCategory.listCatalogueCategoriesFull ?? []),
    [queryState.data],
  );

  const getRowId = useCallback((row: CatalogueTypeRow) => String(row.id), []);
  const getSubRows = useCallback((row: CatalogueTypeRow) => row.subRows, []);

  const handleRowsSelected = useCallback(
    (onChange: (rows: CatalogueTypeRow[]) => void) => (rows: CatalogueTypeRow[]) => {
      onChange(rows.filter(({ id }) => typeof id === 'number'));
    },
    [],
  );

  return (
    <>
      {queryState.fetching && <Loader />}
      <Controller
        name="catalogueTypes"
        control={control}
        render={({ field }) => (
          <PrimaryTable
            color="secondary"
            columns={[
              {
                id: 'category.name',
                label: 'facility_contract.field.catalogue_category',
                getCanSelect: (depth) => depth === 0,
                getCanExpand: (depth) => depth === 0,
                getRowValue: (row) => (typeof row.id === 'string' && row.id.startsWith('CO') ? row.category.name : ''),
              },
              {
                id: 'subCategoryName',
                label: 'facility_contract.field.catalogue_subcategory',
                getCanSelect: (depth) => depth === 1,
                getCanExpand: (depth) => depth === 1,
                getRowValue: (row) =>
                  typeof row.id === 'string' && row.id.startsWith('SC') ? (row.subCategory?.name ?? '') : '',
              },
              {
                id: 'name',
                label: 'facility_contract.field.catalogue_type',
                getCanSelect: (depth) => depth === 2,
              },
            ]}
            empty="catalogue_type.text.no_catalogue_types"
            initialState={{
              rowSelection: field.value.reduce(
                (acc, it) => ({
                  ...acc,
                  [it.id]: true,
                }),
                {},
              ),
            }}
            rows={catalogueCategories}
            totalCount={catalogueCategories.length}
            getRowId={getRowId}
            getSubRows={getSubRows}
            onRowsSelected={handleRowsSelected(field.onChange)}
            useColumnVisibility={false}
            usePagination={false}
            useRowActions={false}
            useRowSelection={false}
            useSelectedRows={false}
            useRowExpandCollapse
          />
        )}
      />
    </>
  );
};
