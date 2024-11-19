import { TableColumn } from '@realgimm5/frontend-common/interfaces';

import { CatalogueTypeFragment } from '../../gql/RealGimm.Web.CatalogueType.fragment';

export const getCatalogueTypesColumns = (): TableColumn<CatalogueTypeFragment>[] => [
  {
    id: 'internalCode',
    label: 'catalogue_type.field.catalogue_type_code',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'name',
    label: 'catalogue_type.field.catalogue_type',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'category',
    label: 'catalogue_type.field.catalogue_type_category',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
    getRowValue: (row) => row.category.name,
  },
  {
    id: 'subCategory',
    label: 'catalogue_type.field.catalogue_type_subcategory',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
    getRowValue: (row) => row.subCategory?.name ?? '-',
  },
  {
    id: 'usageTypes',
    label: 'catalogue_type.field.catalogue_type_usage_type',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    getRowValue: (row) => (row.usageTypes.length === 12 ? 'ALL' : row.usageTypes.map(({ name }) => name).join(', ')),
  },
];
