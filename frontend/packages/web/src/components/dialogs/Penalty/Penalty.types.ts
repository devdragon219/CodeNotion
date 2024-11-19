import { PenaltyFormInput } from '../../../interfaces/FormInputs/Penalty';

export interface PenaltyCreateDialogProps {
  contractInternalCode?: string;
  onClose: () => void;
  onSave: (value: PenaltyFormInput[]) => void;
}
