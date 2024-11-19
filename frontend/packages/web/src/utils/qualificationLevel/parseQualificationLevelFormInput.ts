import { QualificationLevelInput } from '@realgimm5/frontend-common/gql/types';

import { QualificationLevelFormInput } from '../../interfaces/FormInputs/QualificationLevel';

export const parseQualificationLevelFormInputToQualificationLevelInput = (
  qualificationLevel: QualificationLevelFormInput,
): QualificationLevelInput => ({
  internalCode: qualificationLevel.internalCode,
  name: qualificationLevel.name,
  ordering: qualificationLevel.ordering,
});
