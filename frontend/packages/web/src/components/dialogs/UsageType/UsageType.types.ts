import { UsageTypeFormInput } from '../../../interfaces/FormInputs/UsageType';

export interface UsageTypeDialogProps {
  input?: UsageTypeFormInput;
  readonly?: boolean;
  onClose: () => void;
  onSave: (value: UsageTypeFormInput) => void;
}
