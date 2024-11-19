import { TicketMainType } from '@realgimm5/frontend-common/gql/types';

export interface TicketsTableProps {
  mainType?: TicketMainType;
  status?: 'expired' | 'expiring';
}
