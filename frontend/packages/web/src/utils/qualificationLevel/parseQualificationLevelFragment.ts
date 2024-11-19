import { QualificationLevelFragment } from '../../gql/RealGimm.Web.QualificationLevel.fragment';
import { QualificationLevelFormInput } from '../../interfaces/FormInputs/QualificationLevel';

export const parseQualificationLevelToQualificationLevelFormInput = (
  qualificationLevel: QualificationLevelFragment,
): QualificationLevelFormInput => ({
  internalCode: qualificationLevel.internalCode,
  name: qualificationLevel.name,
  ordering: qualificationLevel.ordering,
  qualificationLevelId: qualificationLevel.id,
});
