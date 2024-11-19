import { CraftFormInput } from '../../../interfaces/FormInputs/Craft';

export interface CraftDialogProps {
  input?: CraftFormInput;
  readonly?: boolean;
  onClose: () => void;
  onSave: (value: CraftFormInput) => void;
}
