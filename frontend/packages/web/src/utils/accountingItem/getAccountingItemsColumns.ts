import { TableColumn } from '@realgimm5/frontend-common/interfaces';

import { AccountingItemFragment } from '../../gql/RealGimm.Web.AccountingItem.fragment';

export const getAccountingItemsColumns = (): TableColumn<AccountingItemFragment>[] => [
  {
    id: 'internalCode',
    label: 'accounting_item.field.internal_code',
    enableColumnFilter: true,
    enableSorting: true,
    enableGlobalFilter: true,
  },
  {
    id: 'description',
    label: 'accounting_item.field.description',
    enableColumnFilter: true,
    enableSorting: true,
    enableGlobalFilter: true,
  },
  {
    id: 'externalCode',
    label: 'accounting_item.field.external_code',
    enableColumnFilter: true,
    enableSorting: true,
    enableGlobalFilter: true,
  },
];
