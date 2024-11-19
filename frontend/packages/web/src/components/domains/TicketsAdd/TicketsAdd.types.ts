import { TicketMainType } from '@realgimm5/frontend-common/gql/types';

export interface TicketsAddProps {
  onAdd: (mainType: TicketMainType) => void;
}
