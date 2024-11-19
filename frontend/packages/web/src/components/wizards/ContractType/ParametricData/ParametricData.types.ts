import { ContractTypeFormInput } from '../../../../interfaces/FormInputs/ContractType';

export interface ContractTypeParametricDataStepProps {
  contractType: ContractTypeFormInput;
  onChange: (contractType: ContractTypeFormInput) => void;
  onBack: () => void;
  onError: () => void;
  onNext: () => void;
}
