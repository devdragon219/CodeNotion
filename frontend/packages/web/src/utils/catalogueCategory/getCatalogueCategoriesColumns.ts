import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { ReactElement } from 'react';

import { CatalogueCategoryFragment } from '../../gql/RealGimm.Web.CatalogueCategory.fragment';

export const getCatalogueCategoriesColumns = (
  showAll: (row: CatalogueCategoryFragment) => ReactElement,
): TableColumn<CatalogueCategoryFragment>[] => [
  {
    id: 'internalCode',
    label: 'catalogue_category.field.catalogue_category_code',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'name',
    label: 'catalogue_category.field.catalogue_category_name',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'subCategories',
    label: 'catalogue_category.field.catalogue_sub_category',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    getRowValue: (row) => {
      if (row.subCategories.length === 0) {
        return '-';
      }
      if (row.subCategories.length === 1) {
        return row.subCategories[0].name;
      }
      return showAll(row);
    },
  },
];
