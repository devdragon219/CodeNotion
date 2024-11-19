import { GroupFormInput } from '../../../../interfaces/FormInputs/Group';

export interface GroupPermissionsStepProps {
  group: GroupFormInput;
  onChange: (user: GroupFormInput) => void;
  onError: () => void;
  onBack: () => void;
  onNext: () => void;
}
