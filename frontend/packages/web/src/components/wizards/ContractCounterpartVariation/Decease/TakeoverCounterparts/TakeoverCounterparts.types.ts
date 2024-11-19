import { ContractCounterpartVariationDeceaseFormInput } from '../../../../../interfaces/FormInputs/ContractActions';

export interface TakeoverCounterpartsStepProps {
  counterpartDecease: ContractCounterpartVariationDeceaseFormInput;
  isContractActive: boolean;
  onAddHeir: (onComplete: () => void) => void;
  onBack: () => void;
  onChange: (counterpartDecease: ContractCounterpartVariationDeceaseFormInput) => void;
  onError: (error?: boolean | string) => void;
  onNext: () => void;
}
