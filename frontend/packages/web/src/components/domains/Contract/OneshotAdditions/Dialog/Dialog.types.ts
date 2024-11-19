import { ContractOneshotAdditionFormInput } from '../../../../../interfaces/FormInputs/Contract';

export interface OneshotAdditionDialogInput {
  oneshotAddition: ContractOneshotAdditionFormInput;
  index: number;
}

export interface OneshotAdditionDialogProps {
  input?: OneshotAdditionDialogInput;
  onClose: () => void;
  onSave: (value: ContractOneshotAdditionFormInput | OneshotAdditionDialogInput) => void;
}
