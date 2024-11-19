import { ContractCounterpartVariationTransferFormInput } from '../../../../../interfaces/FormInputs/ContractActions';

export interface RecapStepProps {
  counterpartTransfer: ContractCounterpartVariationTransferFormInput;
  isContractActive: boolean;
  onBack: () => void;
  onEdit: (step: number) => void;
  onSave: (counterpartTransfer: ContractCounterpartVariationTransferFormInput) => void;
}
