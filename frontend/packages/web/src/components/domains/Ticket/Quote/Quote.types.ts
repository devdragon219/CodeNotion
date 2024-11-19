import { Control, FieldErrors } from 'react-hook-form';

import { TicketFormInput } from '../../../../interfaces/FormInputs/Ticket';

export interface TicketQuoteProps {
  control: Control<TicketFormInput>;
  errors: FieldErrors<TicketFormInput>;
  isSupplier?: boolean;
  readonly?: boolean;
}