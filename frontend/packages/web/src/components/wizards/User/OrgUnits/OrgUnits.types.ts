import { UserFormInput } from '../../../../interfaces/FormInputs/User';

export interface UserOrgUnitsStepProps {
  user: UserFormInput;
  onBack: () => void;
  onChange: (user: UserFormInput) => void;
  onError: () => void;
  onNext: () => void;
}
