import { PrimaryTable } from '@realgimm5/frontend-common/components';
import { useCallback, useMemo } from 'react';

import { CatalogueTypeRow } from '../../../../../interfaces/FormInputs/CatalogueType';
import { groupCatalogueTypes } from '../../../../../utils/catalogueType/groupCatalogueTypes';
import { FacilityContractCatalogueTypesTableProps } from './Table.types';

export const FacilityContractCatalogueTypesTable = ({
  catalogueTypes,
  useRowExpandCollapse = true,
}: FacilityContractCatalogueTypesTableProps) => {
  const catalogueCategories = useMemo(() => groupCatalogueTypes(catalogueTypes), [catalogueTypes]);

  const getRowId = useCallback((row: CatalogueTypeRow) => String(row.id), []);
  const getSubRows = useCallback((row: CatalogueTypeRow) => row.subRows, []);

  return (
    <PrimaryTable
      color="secondary"
      columns={[
        {
          id: 'categoryName',
          label: 'facility_contract.field.catalogue_category',
          getCanExpand: (depth) => depth === 0,
          getRowValue: (row) => (typeof row.id === 'string' && row.id.startsWith('CO') ? row.category.name : ''),
        },
        {
          id: 'subCategoryName',
          label: 'facility_contract.field.catalogue_subcategory',
          getCanExpand: (depth) => depth === 1,
          getRowValue: (row) =>
            typeof row.id === 'string' && row.id.startsWith('SC') ? (row.subCategory?.name ?? '') : '',
        },
        {
          id: 'name',
          label: 'facility_contract.field.catalogue_type',
        },
      ]}
      empty="catalogue_type.text.no_catalogue_types"
      rows={catalogueCategories}
      totalCount={catalogueCategories.length}
      getRowId={getRowId}
      getSubRows={getSubRows}
      useColumnVisibility={false}
      usePagination={false}
      useRowActions={false}
      useRowSelection={false}
      useSelectedRows={false}
      useRowExpandCollapse={useRowExpandCollapse}
    />
  );
};
