import { ContractFormInput } from '../../../../interfaces/FormInputs/Contract';

export interface ContractDocumentsStepProps {
  contract: ContractFormInput;
  onBack: () => void;
  onChange: (contract: ContractFormInput) => void;
  onError: () => void;
  onNext: () => void;
}
