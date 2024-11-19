import { ContractCounterpartVariationTransferFormInput } from '../../../../../interfaces/FormInputs/ContractActions';

export interface TransferDataStepProps {
  counterpartTransfer: ContractCounterpartVariationTransferFormInput;
  isContractActive: boolean;
  managementSubjectOfficers: {
    id: number;
    name: string;
  }[];
  onBack: () => void;
  onChange: (counterpartTransfer: ContractCounterpartVariationTransferFormInput) => void;
  onError: () => void;
  onNext: () => void;
}
