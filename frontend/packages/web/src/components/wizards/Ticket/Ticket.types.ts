import { TicketMainType } from '@realgimm5/frontend-common/gql/types';

import { TicketFormInput } from '../../../interfaces/FormInputs/Ticket';

export interface TicketCreateDialogProps {
  mainType: TicketMainType;
  onClose: () => void;
  onSave: (ticket: TicketFormInput) => void;
}
