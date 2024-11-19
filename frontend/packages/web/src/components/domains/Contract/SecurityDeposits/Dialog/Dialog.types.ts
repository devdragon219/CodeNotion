import { ContractSecurityDepositFormInput } from '../../../../../interfaces/FormInputs/Contract';

export interface SecurityDepositDialogInput {
  securityDeposit: ContractSecurityDepositFormInput;
  index: number;
}

export interface SecurityDepositDialogProps {
  input?: SecurityDepositDialogInput;
  onClose: () => void;
  onSave: (value: ContractSecurityDepositFormInput[] | SecurityDepositDialogInput) => void;
}
