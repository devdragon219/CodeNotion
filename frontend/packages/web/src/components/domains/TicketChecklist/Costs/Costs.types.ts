import { Control, FieldErrors } from 'react-hook-form';

import { TicketChecklistFormInput } from '../../../../interfaces/FormInputs/TicketChecklist';

export interface TicketChecklistCostsProps {
  control: Control<TicketChecklistFormInput>;
  errors: FieldErrors<TicketChecklistFormInput>;
  readonly?: boolean;
}
