import { Control, FieldErrors } from 'react-hook-form';

import { TicketChecklistTemplateFormInput } from '../../../../interfaces/FormInputs/TicketChecklistTemplate';

export interface TicketChecklistTemplateCostsProps {
  control: Control<TicketChecklistTemplateFormInput>;
  errors: FieldErrors<TicketChecklistTemplateFormInput>;
  readonly?: boolean;
}
