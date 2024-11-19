import { ContractTransactorFormInput } from '../../../../interfaces/FormInputs/Contract';

export interface ContractTransactorsTableStepProps {
  isContractActive: boolean;
  transactors: ContractTransactorFormInput[];
  onBack: () => void;
  onChange: (transactors: ContractTransactorFormInput[]) => void;
  onError: (error?: boolean | string) => void;
  onSave: (transactors: ContractTransactorFormInput[]) => void;
}
