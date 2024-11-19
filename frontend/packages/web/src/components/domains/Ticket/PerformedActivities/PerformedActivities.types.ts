import { Control } from 'react-hook-form';

import { TicketFormInput } from '../../../../interfaces/FormInputs/Ticket';

export interface TicketPerformedActivitiesProps {
  control: Control<TicketFormInput>;
  readonly?: boolean;
}
