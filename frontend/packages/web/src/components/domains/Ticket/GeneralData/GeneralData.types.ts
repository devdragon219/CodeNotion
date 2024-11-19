import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';

import { TicketFormInput } from '../../../../interfaces/FormInputs/Ticket';

export interface TicketGeneralDataProps {
  control: Control<TicketFormInput>;
  errors: FieldErrors<TicketFormInput>;
  isSupplier?: boolean;
  mode: FormMode;
  readonly?: boolean;
  setValue: UseFormSetValue<TicketFormInput>;
}
