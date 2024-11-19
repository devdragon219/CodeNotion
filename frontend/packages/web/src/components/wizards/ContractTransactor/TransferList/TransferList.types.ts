import { ContractTransactorFormInput } from '../../../../interfaces/FormInputs/Contract';

export interface ContractTransactorsTransferListStepProps {
  currentTransactors: ContractTransactorFormInput[];
  effectStartDate: Date | null;
  isContractActive: boolean;
  transactors: ContractTransactorFormInput[];
  onChange: (transactors: ContractTransactorFormInput[]) => void;
  onError: (error?: boolean | string) => void;
  onNext: () => void;
}
