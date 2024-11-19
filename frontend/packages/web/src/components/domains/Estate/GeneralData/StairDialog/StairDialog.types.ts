import { StairFormInput } from '../../../../../interfaces/FormInputs/Stair';

export interface StairDialogInput {
  stair: StairFormInput;
  index: number;
}

export interface StairDialogProps {
  input?: StairDialogInput;
  onClose: () => void;
  onSave: (value: StairFormInput[] | StairDialogInput) => void;
}
