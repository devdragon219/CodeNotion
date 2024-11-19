import { FormMode } from '@realgimm5/frontend-common/enums';
import { SlaInput } from '@realgimm5/frontend-common/gql/types';

import { SlaFormInput } from '../../interfaces/FormInputs/SLA';
import { parseGroupConditionsFormInputToConditionsInput } from '../components/conditionsBuilder/parseConditionsFormInput';

export const parseSlaFormInputToSlaInput = (sla: SlaFormInput, mode: FormMode): SlaInput => ({
  description: sla.description,
  id: mode === FormMode.Create ? undefined : sla.slaId,
  ifCondition: parseGroupConditionsFormInputToConditionsInput(sla.conditions.ifCondition, mode),
  internalCode: sla.internalCode,
  thenCondition: parseGroupConditionsFormInputToConditionsInput(sla.conditions.thenCondition, mode),
});
