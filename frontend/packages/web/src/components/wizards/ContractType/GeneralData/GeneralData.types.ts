import { ContractTypeFormInput } from '../../../../interfaces/FormInputs/ContractType';

export interface ContractTypeGeneralDataStepProps {
  contractType: ContractTypeFormInput;
  canUseInternalCode: boolean;
  onChange: (contractType: ContractTypeFormInput) => void;
  onError: () => void;
  onNext: () => void;
}
