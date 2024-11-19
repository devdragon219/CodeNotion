import { MainUsageTypeFormInput } from '../../../interfaces/FormInputs/MainUsageType';

export interface MainUsageTypeDialogProps {
  input?: MainUsageTypeFormInput;
  readonly?: boolean;
  onClose: () => void;
  onSave: (value: MainUsageTypeFormInput) => void;
}
