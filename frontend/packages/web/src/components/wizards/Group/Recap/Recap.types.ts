import { GroupFormInput } from '../../../../interfaces/FormInputs/Group';

export interface GroupRecapStepProps {
  group: GroupFormInput;
  onBack: () => void;
  onEdit: (step: number) => void;
  onSave: (user: GroupFormInput) => void;
}
