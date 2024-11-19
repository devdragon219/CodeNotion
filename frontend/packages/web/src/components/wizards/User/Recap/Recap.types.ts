import { UserFormInput } from '../../../../interfaces/FormInputs/User';

export interface UserRecapStepProps {
  user: UserFormInput;
  onBack: () => void;
  onEdit: (step: number) => void;
  onSave: (user: UserFormInput) => void;
}
