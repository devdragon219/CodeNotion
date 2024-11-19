import { Control } from 'react-hook-form';

import { TicketFormInput } from '../../../../interfaces/FormInputs/Ticket';

export interface TicketRemindersProps {
  control: Control<TicketFormInput>;
  readonly?: boolean;
}
