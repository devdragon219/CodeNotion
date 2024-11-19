import { ContractCounterpartFormInput } from '../../../../../interfaces/FormInputs/Contract';
import { ContractCounterpartVariationTakeoverFormInput } from '../../../../../interfaces/FormInputs/ContractActions';

export interface TakeoverCounterpartsStepProps {
  counterpartTakeover: ContractCounterpartVariationTakeoverFormInput;
  currentCounterparts: ContractCounterpartFormInput[];
  isContractActive: boolean;
  onBack: () => void;
  onChange: (counterpartTakeover: ContractCounterpartVariationTakeoverFormInput) => void;
  onError: (error?: boolean | string) => void;
  onNext: () => void;
}
