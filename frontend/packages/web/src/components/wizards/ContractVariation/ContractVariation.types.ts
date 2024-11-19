import { ContractFormInput } from '../../../interfaces/FormInputs/Contract';
import { ContractVariationFormInput } from '../../../interfaces/FormInputs/ContractActions';

export interface ContractVariationDialogProps {
  contract: ContractFormInput;
  isActive: boolean;
  onClose: () => void;
  onSave: (contractVariation: ContractVariationFormInput) => void;
}
