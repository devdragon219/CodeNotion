import { InterventionTypeFragment } from '../../gql/RealGimm.Web.InterventionType.fragment';
import { InterventionTypeFormInput } from '../../interfaces/FormInputs/InterventionType';

export const parseInterventionTypeToInterventionTypeFormInput = (
  interventionType: InterventionTypeFragment,
): InterventionTypeFormInput => ({
  internalCode: interventionType.internalCode,
  interventionTypeId: interventionType.id,
  name: interventionType.name,
});
