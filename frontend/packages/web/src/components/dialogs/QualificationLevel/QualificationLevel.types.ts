import { QualificationLevelFormInput } from '../../../interfaces/FormInputs/QualificationLevel';

export interface QualificationLevelDialogProps {
  input?: QualificationLevelFormInput;
  readonly?: boolean;
  onClose: () => void;
  onSave: (value: QualificationLevelFormInput) => void;
}
