import { QualificationLevelFormInput } from '../../interfaces/FormInputs/QualificationLevel';

export const getEmptyQualificationLevelFormInput = (): QualificationLevelFormInput => ({
  internalCode: '',
  name: '',
  ordering: 0,
  qualificationLevelId: null,
});
