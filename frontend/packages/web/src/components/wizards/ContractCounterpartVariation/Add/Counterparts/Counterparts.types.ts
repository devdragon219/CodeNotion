import { ContractCounterpartFormInput } from '../../../../../interfaces/FormInputs/Contract';
import { ContractCounterpartVariationAddFormInput } from '../../../../../interfaces/FormInputs/ContractActions';

export interface CounterpartsStepProps {
  counterpartAdd: ContractCounterpartVariationAddFormInput;
  currentCounterparts: ContractCounterpartFormInput[];
  isContractActive: boolean;
  onBack: () => void;
  onChange: (counterpartAdd: ContractCounterpartVariationAddFormInput) => void;
  onError: (error?: boolean | string) => void;
  onSave: (counterpartAdd: ContractCounterpartVariationAddFormInput) => void;
}
