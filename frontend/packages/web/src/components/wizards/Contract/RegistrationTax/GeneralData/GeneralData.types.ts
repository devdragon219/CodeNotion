import { ContractFormInput } from '../../../../../interfaces/FormInputs/Contract';

export interface ContractRegistrationTaxGeneralDataSubStepProps {
  contract: ContractFormInput;
  isContractActive: boolean;
  onBack: () => void;
  onChange: (contract: ContractFormInput) => void;
  onError: (error?: boolean | string) => void;
  onNext: () => void;
}
