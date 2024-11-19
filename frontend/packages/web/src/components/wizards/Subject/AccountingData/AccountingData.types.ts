import { SubjectFormInput } from '../../../../interfaces/FormInputs/Subject';

export interface SubjectAccountingDataStepProps {
  subject: SubjectFormInput;
  onBack: () => void;
  onChange: (subject: SubjectFormInput) => void;
  onError: () => void;
  onNext: () => void;
}