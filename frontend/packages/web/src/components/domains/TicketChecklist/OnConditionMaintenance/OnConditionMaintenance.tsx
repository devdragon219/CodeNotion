import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control } from 'react-hook-form';

import { TicketChecklistTemplateFormInput } from '../../../../interfaces/FormInputs/TicketChecklistTemplate';
import { TicketChecklistTemplateOnConditionMaintenance } from '../../TicketChecklistTemplate/OnConditionMaintenance/OnConditionMaintenance';
import { TicketChecklistOnConditionMaintenanceProps } from './OnConditionMaintenance.types';

export const TicketChecklistOnConditionMaintenance = ({
  control,
  errors,
  readonly,
}: TicketChecklistOnConditionMaintenanceProps) => (
  <TicketChecklistTemplateOnConditionMaintenance
    control={control as unknown as Control<TicketChecklistTemplateFormInput>}
    errors={errors}
    isDefinitive
    mode={FormMode.Edit}
    readonly={readonly}
  />
);
