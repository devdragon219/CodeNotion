import { ContractFormInput } from '../../../../../interfaces/FormInputs/Contract';

export interface ContractRegistrationTaxTakeoverSubStepProps {
  contract: ContractFormInput;
  onBack: () => void;
  onChange: (contract: ContractFormInput) => void;
  onError: (error?: boolean | string) => void;
  onNext: () => void;
}
