import { ContractFormInput } from '../../../../interfaces/FormInputs/Contract';

export interface ContractSecurityDepositsStepProps {
  contract: ContractFormInput;
  onBack: () => void;
  onChange: (contract: ContractFormInput) => void;
  onError: () => void;
  onNext: () => void;
}
