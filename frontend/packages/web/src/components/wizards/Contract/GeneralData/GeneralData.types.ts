import { ContractFormInput } from '../../../../interfaces/FormInputs/Contract';

export interface ContractGeneralDataStepProps {
  canUseInternalCode: boolean;
  contract: ContractFormInput;
  isContractActive: boolean;
  onChange: (contract: ContractFormInput) => void;
  onError: () => void;
  onNext: () => void;
}
