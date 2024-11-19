import { UserFormInput } from '../../../../interfaces/FormInputs/User';

export interface UserGeneralDataStepProps {
  canUseUserName: boolean;
  user: UserFormInput;
  onChange: (user: UserFormInput) => void;
  onError: () => void;
  onNext: () => void;
}
