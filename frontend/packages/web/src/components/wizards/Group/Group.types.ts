import { GroupFormInput } from '../../../interfaces/FormInputs/Group';

export interface GroupCreateDialogProps {
  onClose: () => void;
  onSave: (subject: GroupFormInput) => void;
}
