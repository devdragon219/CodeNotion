import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control, FieldErrors } from 'react-hook-form';

import { TicketFormInput } from '../../../../interfaces/FormInputs/Ticket';

export interface TicketDocumentsProps {
  control: Control<TicketFormInput>;
  errors: FieldErrors<TicketFormInput>;
  mode: FormMode;
  readonly?: boolean;
}
