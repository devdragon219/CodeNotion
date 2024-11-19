import { ContractTypeFormInput } from '../../../interfaces/FormInputs/ContractType';

export interface ContractTypeDialogProps {
  onClose: () => void;
  onSave: (contractType: ContractTypeFormInput) => void;
}
