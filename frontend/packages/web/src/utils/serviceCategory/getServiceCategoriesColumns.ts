import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { ReactElement } from 'react';

import { ServiceCategoryFragment } from '../../gql/RealGimm.Web.ServiceCategory.fragment';

export const getServiceCategoriesColumns = (
  showAll: (row: ServiceCategoryFragment) => ReactElement,
): TableColumn<ServiceCategoryFragment>[] => [
  {
    id: 'internalCode',
    label: 'service_category.field.service_category_code',
    enableColumnFilter: true,
    enableSorting: true,
    enableGlobalFilter: true,
  },
  {
    id: 'name',
    label: 'service_category.field.name',
    enableColumnFilter: true,
    enableSorting: true,
    enableGlobalFilter: true,
  },
  {
    id: 'serviceSubCategories',
    label: 'service_category.field.service_sub_categories',
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
