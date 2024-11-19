import { FunctionAreaFormInput } from '../../../interfaces/FormInputs/FunctionArea';

export interface FunctionAreaDialogInput {
  functionArea: FunctionAreaFormInput;
  index: number;
}

export interface FunctionAreaDialogProps {
  input?: FunctionAreaDialogInput;
  readonly?: boolean;
  onClose: () => void;
  onSave: (value: FunctionAreaFormInput[] | FunctionAreaDialogInput) => void;
}
