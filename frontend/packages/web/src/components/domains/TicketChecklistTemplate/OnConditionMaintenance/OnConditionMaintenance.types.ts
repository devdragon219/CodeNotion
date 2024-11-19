import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control, FieldErrors } from 'react-hook-form';

import { TicketChecklistTemplateFormInput } from '../../../../interfaces/FormInputs/TicketChecklistTemplate';

export interface TicketChecklistTemplateOnConditionMaintenanceProps {
  control: Control<TicketChecklistTemplateFormInput>;
  errors: FieldErrors<TicketChecklistTemplateFormInput>;
  isDefinitive?: boolean;
  mode: FormMode;
  readonly?: boolean;
}
