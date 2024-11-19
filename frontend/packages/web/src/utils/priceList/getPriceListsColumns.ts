import { TableColumn } from '@realgimm5/frontend-common/interfaces';

import { PriceListFragment } from '../../gql/RealGimm.Web.PriceList.fragment';

export const getPriceListsColumns = (): TableColumn<PriceListFragment>[] => [
  {
    id: 'ordering',
    label: 'price_list.field.ordering',
    type: 'number',
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: 'internalCode',
    label: 'price_list.field.internal_code',
    enableColumnFilter: true,
    enableSorting: true,
    enableGlobalFilter: true,
  },
  {
    id: 'name',
    label: 'price_list.field.name',
    enableColumnFilter: true,
    enableSorting: true,
    enableGlobalFilter: true,
  },
];
