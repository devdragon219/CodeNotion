import { SubjectType } from '../../../../enums/SubjectType';
import { SubjectFormInput } from '../../../../interfaces/FormInputs/Subject';

export interface SubjectGeneralDataStepProps {
  canUseInternalCode: boolean;
  isLegalNatureDisabled: boolean;
  subject: SubjectFormInput;
  subjectType: SubjectType;
  onChange: (subject: SubjectFormInput) => void;
  onError: () => void;
  onNext: () => void;
}
