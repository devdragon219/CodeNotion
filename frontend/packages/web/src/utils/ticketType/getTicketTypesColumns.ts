import { TableColumn } from '@realgimm5/frontend-common/interfaces';

import { TicketTypeFragment } from '../../gql/RealGimm.Web.TicketType.fragment';

export const getTicketTypesColumns = (): TableColumn<TicketTypeFragment>[] => [
  {
    id: 'ordering',
    label: 'ticket_type.field.ordering',
    type: 'number',
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: 'internalCode',
    label: 'ticket_type.field.internal_code',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'description',
    label: 'ticket_type.field.description',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
];
