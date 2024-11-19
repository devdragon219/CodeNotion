import { WorkTeamFormInput } from '../../../interfaces/FormInputs/WorkTeam';

export interface WorkTeamCreateDialogProps {
  onClose: () => void;
  onSave: (value: WorkTeamFormInput) => void;
}
