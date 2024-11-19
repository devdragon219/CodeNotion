import { ContractFormInput, SublocatedContractFormInput } from '../../../interfaces/FormInputs/Contract';

export interface ContractCreateDialogProps {
  isActive: boolean;
  isSublocated: boolean;
  sublocatedContract?: SublocatedContractFormInput;
  onClose: () => void;
  onSave: (contract: ContractFormInput) => void;
}
