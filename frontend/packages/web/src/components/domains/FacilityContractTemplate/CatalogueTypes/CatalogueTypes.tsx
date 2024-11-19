import { Grid2 } from '@mui/material';
import { Alert, Loader, PrimaryTable, SectionTitle } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useCallback, useMemo } from 'react';
import { Controller } from 'react-hook-form';

import { useGetAllCatalogueCategoriesQuery } from '../../../../gql/RealGimm.Web.CatalogueCategory.operation';
import { CatalogueTypeRow } from '../../../../interfaces/FormInputs/CatalogueType';
import { groupCatalogueCategories } from '../../../../utils/catalogueCategory/groupCatalogueCategories';
import { FacilityContractTemplateCatalogueTypesProps } from './CatalogueTypes.types';

export const FacilityContractTemplateCatalogueTypes = ({
  control,
  errors,
  mode,
}: FacilityContractTemplateCatalogueTypesProps) => {
  const [queryState] = useGetAllCatalogueCategoriesQuery();
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
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {queryState.fetching && <Loader />}
      <SectionTitle value="facility_contract_template.section_title.catalogue_types" />
      {mode === FormMode.Edit && errors.catalogueTypes?.message && (
        <Grid2 size={12}>
          <Alert severity="error" message={errors.catalogueTypes.message} />
        </Grid2>
      )}
      <Grid2 size={12}>
        <Controller
          name="catalogueTypes"
          control={control}
          render={({ field }) => (
            <PrimaryTable
              color="secondary"
              columns={[
                {
                  id: 'categoryName',
                  label: 'facility_contract_template.field.catalogue_category',
                  getCanSelect: (depth) => depth === 0,
                  getCanExpand: (depth) => depth === 0,
                  getRowValue: (row) =>
                    typeof row.id === 'string' && row.id.startsWith('CO') ? row.category.name : '',
                },
                {
                  id: 'subCategoryName',
                  label: 'facility_contract_template.field.catalogue_subcategory',
                  getCanSelect: (depth) => depth === 1,
                  getCanExpand: (depth) => depth === 1,
                  getRowValue: (row) =>
                    typeof row.id === 'string' && row.id.startsWith('SC') ? (row.subCategory?.name ?? '') : '',
                },
                {
                  id: 'name',
                  label: 'facility_contract_template.field.catalogue_type',
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
      </Grid2>
    </Grid2>
  );
};
