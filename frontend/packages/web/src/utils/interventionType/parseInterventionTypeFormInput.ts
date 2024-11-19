import { InterventionTypeInput } from '@realgimm5/frontend-common/gql/types';

import { InterventionTypeFormInput } from '../../interfaces/FormInputs/InterventionType';

export const parseInterventionTypeFormInputToInterventionTypeInput = (
  interventionType: InterventionTypeFormInput,
): InterventionTypeInput => ({
  internalCode: interventionType.internalCode,
  name: interventionType.name,
});
