import { Control, FieldErrors } from 'react-hook-form';

import { TicketQuoteFormInput } from '../../../../../interfaces/FormInputs/Ticket';

export interface ArticlesTableProps {
  control: Control<TicketQuoteFormInput>;
  errors: FieldErrors<TicketQuoteFormInput>;
}
