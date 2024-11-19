import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';

import { TicketChecklistTemplateFormInput } from '../../../../../interfaces/FormInputs/TicketChecklistTemplate';

export interface TicketChecklistTemplateCatalogueTypeFieldProps {
  control: Control<TicketChecklistTemplateFormInput>;
  errors: FieldErrors<TicketChecklistTemplateFormInput>;
  readonly?: boolean;
  setValue: UseFormSetValue<TicketChecklistTemplateFormInput>;
}
