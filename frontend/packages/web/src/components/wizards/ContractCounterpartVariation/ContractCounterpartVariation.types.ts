import { ContractFormInput } from '../../../interfaces/FormInputs/Contract';
import { ContractCounterpartVariationFormInput } from '../../../interfaces/FormInputs/ContractActions';

export interface ContractCounterpartVariationDialogProps {
  contract: ContractFormInput;
  isActive: boolean;
  onClose: () => void;
  onSave: (counterpartVariation: ContractCounterpartVariationFormInput) => void;
}
