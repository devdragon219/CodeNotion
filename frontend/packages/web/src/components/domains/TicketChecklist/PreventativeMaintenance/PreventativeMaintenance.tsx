import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control, UseFormSetValue } from 'react-hook-form';

import { TicketChecklistTemplateFormInput } from '../../../../interfaces/FormInputs/TicketChecklistTemplate';
import { TicketChecklistTemplatePreventativeMaintenance } from '../../TicketChecklistTemplate/PreventativeMaintenance/PreventativeMaintenance';
import { TicketChecklistPreventativeMaintenanceProps } from './PreventativeMaintenance.types';

export const TicketChecklistPreventativeMaintenance = ({
  control,
  errors,
  readonly,
  setValue,
}: TicketChecklistPreventativeMaintenanceProps) => (
  <TicketChecklistTemplatePreventativeMaintenance
    control={control as unknown as Control<TicketChecklistTemplateFormInput>}
    errors={errors}
    isDefinitive
    mode={FormMode.Edit}
    readonly={readonly}
    setValue={setValue as unknown as UseFormSetValue<TicketChecklistTemplateFormInput>}
  />
);
