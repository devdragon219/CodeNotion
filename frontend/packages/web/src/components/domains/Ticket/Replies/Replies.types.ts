import { Control } from 'react-hook-form';

import { TicketFormInput } from '../../../../interfaces/FormInputs/Ticket';

export interface TicketRepliesProps {
  control: Control<TicketFormInput>;
  readonly?: boolean;
}
