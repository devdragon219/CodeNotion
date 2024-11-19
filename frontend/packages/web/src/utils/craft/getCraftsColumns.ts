import { TableColumn } from '@realgimm5/frontend-common/interfaces';

import { CraftFragment } from '../../gql/RealGimm.Web.Craft.fragment';

export const getCraftsColumns = (): TableColumn<CraftFragment>[] => [
  {
    id: 'ordering',
    label: 'craft.field.ordering',
    type: 'number',
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: 'internalCode',
    label: 'craft.field.internal_code',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'name',
    label: 'craft.field.name',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
];
