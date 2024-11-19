import { ContractCounterpartFormInput } from '../../../../../interfaces/FormInputs/Contract';
import { ContractCounterpartVariationTransferFormInput } from '../../../../../interfaces/FormInputs/ContractActions';

export interface TakeoverCounterpartsStepProps {
  counterpartTransfer: ContractCounterpartVariationTransferFormInput;
  currentCounterparts: ContractCounterpartFormInput[];
  isContractActive: boolean;
  onBack: () => void;
  onChange: (counterpartTransfer: ContractCounterpartVariationTransferFormInput) => void;
  onError: (error?: boolean | string) => void;
  onNext: () => void;
}
