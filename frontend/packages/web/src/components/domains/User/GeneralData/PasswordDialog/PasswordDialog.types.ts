import { UserPasswordFormInput } from '../../../../../interfaces/FormInputs/User';

export interface PasswordDialogProps {
  onClose: () => void;
  onSave: (value: UserPasswordFormInput) => void;
}
