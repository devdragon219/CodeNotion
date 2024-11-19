import { ContractFormInput } from '../../../../interfaces/FormInputs/Contract';
import { ContractVariationTakeoverFormInput } from '../../../../interfaces/FormInputs/ContractActions';

export interface ContractTakeoverProps {
  contract: ContractFormInput;
  contractTakeover: ContractVariationTakeoverFormInput;
  isActive: boolean;
  onBack: () => void;
  onChange: (contractTakeover: ContractVariationTakeoverFormInput) => void;
  onSave: (contractTakeover: ContractVariationTakeoverFormInput) => void;
}
