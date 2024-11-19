import { ContractTypeFormInput } from '../../../../interfaces/FormInputs/ContractType';

export interface ContractTypeRecapStepProps {
  contractType: ContractTypeFormInput;
  onBack: () => void;
  onEdit: (step: number) => void;
  onSave: (contractType: ContractTypeFormInput) => void;
}
