import { ContractFormInput } from '../../../../interfaces/FormInputs/Contract';

export interface ContractRecapStepProps {
  contract: ContractFormInput;
  isContractActive: boolean;
  isContractSublocated: boolean;
  onBack: () => void;
  onEdit: (step: number) => void;
  onSave: (contract: ContractFormInput) => void;
}
