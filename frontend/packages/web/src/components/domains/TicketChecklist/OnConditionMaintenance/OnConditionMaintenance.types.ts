import { Control, FieldErrors } from 'react-hook-form';

import { TicketChecklistFormInput } from '../../../../interfaces/FormInputs/TicketChecklist';

export interface TicketChecklistOnConditionMaintenanceProps {
  control: Control<TicketChecklistFormInput>;
  errors: FieldErrors<TicketChecklistFormInput>;
  readonly?: boolean;
}
