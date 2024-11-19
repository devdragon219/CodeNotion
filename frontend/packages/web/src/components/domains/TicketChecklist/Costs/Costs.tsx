import { Control } from 'react-hook-form';

import { TicketChecklistTemplateFormInput } from '../../../../interfaces/FormInputs/TicketChecklistTemplate';
import { TicketChecklistTemplateCosts } from '../../TicketChecklistTemplate/Costs/Costs';
import { TicketChecklistCostsProps } from './Costs.types';

export const TicketChecklistCosts = ({ control, errors, readonly }: TicketChecklistCostsProps) => (
  <TicketChecklistTemplateCosts
    control={control as unknown as Control<TicketChecklistTemplateFormInput>}
    errors={errors}
    readonly={readonly}
  />
);
