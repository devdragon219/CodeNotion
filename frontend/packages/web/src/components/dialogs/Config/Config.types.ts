import { ConfigFormInput } from '../../../interfaces/FormInputs/Config';

export interface ConfigDialogProps {
  input?: ConfigFormInput;
  readonly?: boolean;
  onClose: () => void;
  onSave: (value: ConfigFormInput) => void;
}
