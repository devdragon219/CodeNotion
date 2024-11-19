import { SubjectType } from '../../../../enums/SubjectType';
import { SubjectFormInput } from '../../../../interfaces/FormInputs/Subject';

export interface SubjectRecapStepProps {
  subject: SubjectFormInput;
  subjectType: SubjectType;
  onBack: () => void;
  onEdit: (step: number) => void;
  onSave: (subject: SubjectFormInput, subjectType: SubjectType) => void;
}
