import { SubjectType } from '../../../../enums/SubjectType';
import { SubjectFormInput } from '../../../../interfaces/FormInputs/Subject';

export interface SubjectPersonalDataStepProps {
  canBeGroupLeader: boolean;
  canUseInterGroupSignature: boolean;
  isBirthTaxIdCodeValid: boolean;
  subject: SubjectFormInput;
  subjectType: SubjectType;
  onBack: () => void;
  onChange: (subject: SubjectFormInput) => void;
  onError: () => void;
  onNext: () => void;
}
