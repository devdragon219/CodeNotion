import { ContractFormInput } from '../../../../interfaces/FormInputs/Contract';

export interface ContractRevaluationStepProps {
  contract: ContractFormInput;
  onBack: () => void;
  onChange: (contract: ContractFormInput) => void;
  onError: () => void;
  onNext: () => void;
}
