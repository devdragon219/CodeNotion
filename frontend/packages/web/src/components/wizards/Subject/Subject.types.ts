import { SubjectType } from '../../../enums/SubjectType';
import { SubjectFormInput } from '../../../interfaces/FormInputs/Subject';

export interface SubjectCreateDialogProps {
  subjectType: SubjectType;
  onClose: () => void;
  onSave: (subject: SubjectFormInput, subjectType: SubjectType) => void;
}
