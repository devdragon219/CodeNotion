import { ContractBillingPauseFormInput } from '../../../../interfaces/FormInputs/ContractActions';

export interface ContractBillingPauseConfirmationDialogProps {
  pausedSince: Date | null;
  onClose: () => void;
  onSave: (value: ContractBillingPauseFormInput) => void;
}
