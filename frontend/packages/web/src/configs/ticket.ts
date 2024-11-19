import { TicketMasterStatus } from '@realgimm5/frontend-common/gql/types';

export const SORTED_TICKET_MASTER_STATUSES = [
  TicketMasterStatus.New,
  TicketMasterStatus.Assigned,
  TicketMasterStatus.InProgress,
  TicketMasterStatus.Resolved,
  TicketMasterStatus.Completed,
];

export const ALLOWED_SUPPLIER_TICKET_MASTER_STATUSES = [
  TicketMasterStatus.Assigned,
  TicketMasterStatus.InProgress,
  TicketMasterStatus.Resolved,
];
