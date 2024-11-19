import { ContractReleaseFormInput } from '../../../../interfaces/FormInputs/ContractActions';

export interface ContractReleaseDialogProps {
  onClose: () => void;
  onSave: (value: ContractReleaseFormInput) => void;
}
