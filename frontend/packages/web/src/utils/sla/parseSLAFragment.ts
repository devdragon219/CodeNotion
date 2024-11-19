import { SlaDetailFragment } from '../../gql/RealGimm.Web.SLA.fragment';
import { SlaFormInput } from '../../interfaces/FormInputs/SLA';
import { parseConditionsFragmentToGroupConditionsFormInput } from '../components/conditionsBuilder/parseConditionsFragment';

export const parseSlaToSlaFormInput = (sla: SlaDetailFragment): SlaFormInput => ({
  conditions: {
    ifCondition: parseConditionsFragmentToGroupConditionsFormInput(sla.flatIfConditions, sla.ifCondition.id),
    thenCondition: parseConditionsFragmentToGroupConditionsFormInput(sla.flatThenConditions, sla.thenCondition.id),
  },
  description: sla.description,
  guid: crypto.randomUUID(),
  internalCode: sla.internalCode,
  slaId: sla.id,
});
