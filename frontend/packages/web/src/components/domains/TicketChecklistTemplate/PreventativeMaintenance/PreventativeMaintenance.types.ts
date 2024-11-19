import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';

import { TicketChecklistTemplateFormInput } from '../../../../interfaces/FormInputs/TicketChecklistTemplate';

export interface TicketChecklistTemplatePreventativeMaintenanceProps {
  control: Control<TicketChecklistTemplateFormInput>;
  errors: FieldErrors<TicketChecklistTemplateFormInput>;
  isDefinitive?: boolean;
  mode: FormMode;
  readonly?: boolean;
  setValue: UseFormSetValue<TicketChecklistTemplateFormInput>;
}
