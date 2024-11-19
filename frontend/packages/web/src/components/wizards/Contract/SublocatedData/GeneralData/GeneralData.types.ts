import { ContractFormInput } from '../../../../../interfaces/FormInputs/Contract';

export interface ContractSublocatedDataGeneralDataSubStepProps {
  contract: ContractFormInput;
  onBack: () => void;
  onChange: (contract: ContractFormInput) => void;
  onError: (error?: boolean | string) => void;
  onNext: () => void;
}