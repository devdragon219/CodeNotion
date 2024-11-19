import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control, FieldErrors } from 'react-hook-form';

import { CatalogueTypeActivityFormInput } from '../../../../interfaces/FormInputs/CatalogueType';
import { TicketChecklistTemplateFormInput } from '../../../../interfaces/FormInputs/TicketChecklistTemplate';

export interface TicketChecklistTemplatePreventativeMaintenanceActivitiesProps {
  control: Control<TicketChecklistTemplateFormInput>;
  currentActivities?: CatalogueTypeActivityFormInput[];
  errors: FieldErrors<TicketChecklistTemplateFormInput>;
  mode: FormMode;
  readonly?: boolean;
}
