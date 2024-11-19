import { ContractTransactorFormInput } from '../../../interfaces/FormInputs/Contract';

export interface ContractTransactorCreateDialogProps {
  currentTransactors: ContractTransactorFormInput[];
  effectStartDate: Date | null;
  isActive: boolean;
  onClose: () => void;
  onSave: (transactors: ContractTransactorFormInput[]) => void;
}
