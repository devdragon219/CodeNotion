import { ContractCounterpartFormInput } from '../../../../../interfaces/FormInputs/Contract';
import { ContractCounterpartVariationDeceaseFormInput } from '../../../../../interfaces/FormInputs/ContractActions';

export interface CounterpartsStepProps {
  counterpartDecease: ContractCounterpartVariationDeceaseFormInput;
  currentCounterparts: ContractCounterpartFormInput[];
  isContractActive: boolean;
  onBack: () => void;
  onChange: (counterpartDecease: ContractCounterpartVariationDeceaseFormInput) => void;
  onError: (error?: boolean | string) => void;
  onSave: (counterpartDecease: ContractCounterpartVariationDeceaseFormInput) => void;
}
