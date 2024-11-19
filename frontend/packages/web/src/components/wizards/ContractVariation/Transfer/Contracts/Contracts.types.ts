import { ContractFormInput } from '../../../../../interfaces/FormInputs/Contract';
import { ContractVariationTransferFormInput } from '../../../../../interfaces/FormInputs/ContractActions';

export interface ContractsStepProps {
  contract: ContractFormInput;
  contractTransfer: ContractVariationTransferFormInput;
  isContractActive: boolean;
  onBack: () => void;
  onChange: (contractTransfer: ContractVariationTransferFormInput) => void;
  onError: (error?: boolean | string) => void;
  onNext: () => void;
}
