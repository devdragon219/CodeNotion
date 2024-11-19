import { GroupFormInput } from '../../../../interfaces/FormInputs/Group';

export interface GroupGeneralDataStepProps {
  group: GroupFormInput;
  onChange: (user: GroupFormInput) => void;
  onError: () => void;
  onNext: () => void;
}
