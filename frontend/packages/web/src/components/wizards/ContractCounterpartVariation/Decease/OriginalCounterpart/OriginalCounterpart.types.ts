import { ContractCounterpartFormInput } from '../../../../../interfaces/FormInputs/Contract';
import { ContractCounterpartVariationDeceaseFormInput } from '../../../../../interfaces/FormInputs/ContractActions';

export interface OriginalCounterpartStepProps {
  counterpartDecease: ContractCounterpartVariationDeceaseFormInput;
  currentCounterparts: ContractCounterpartFormInput[];
  isContractActive: boolean;
  onBack: () => void;
  onChange: (counterpartDecease: ContractCounterpartVariationDeceaseFormInput) => void;
  onError: (error?: boolean | string) => void;
  onNext: () => void;
}
