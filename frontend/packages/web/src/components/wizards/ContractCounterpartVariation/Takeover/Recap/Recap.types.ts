import { ContractCounterpartVariationTakeoverFormInput } from '../../../../../interfaces/FormInputs/ContractActions';

export interface RecapStepProps {
  counterpartTakeover: ContractCounterpartVariationTakeoverFormInput;
  isContractActive: boolean;
  onBack: () => void;
  onEdit: (step: number) => void;
  onSave: (counterpartTakeover: ContractCounterpartVariationTakeoverFormInput) => void;
}
