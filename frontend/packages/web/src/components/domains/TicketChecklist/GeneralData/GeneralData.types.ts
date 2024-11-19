import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';

import { TicketChecklistFormInput } from '../../../../interfaces/FormInputs/TicketChecklist';

export interface TicketChecklistGeneralDataProps {
  control: Control<TicketChecklistFormInput>;
  errors: FieldErrors<TicketChecklistFormInput>;
  readonly?: boolean;
  setValue: UseFormSetValue<TicketChecklistFormInput>;
}
