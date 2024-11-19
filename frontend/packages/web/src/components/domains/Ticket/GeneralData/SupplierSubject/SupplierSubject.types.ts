import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';

import { TicketFormInput } from '../../../../../interfaces/FormInputs/Ticket';

export interface SupplierSubjectFieldProps {
  control: Control<TicketFormInput>;
  errors: FieldErrors<TicketFormInput>;
  disabled?: boolean;
  readonly?: boolean;
  setValue: UseFormSetValue<TicketFormInput>;
}
