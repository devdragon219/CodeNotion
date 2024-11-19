import { ContractFormInput } from '../../../../../interfaces/FormInputs/Contract';
import { ContractVariationTransferFormInput } from '../../../../../interfaces/FormInputs/ContractActions';

export interface ManagementSubjectStepProps {
  contract: ContractFormInput;
  contractTransfer: ContractVariationTransferFormInput;
  onBack: () => void;
  onChange: (contractTransfer: ContractVariationTransferFormInput) => void;
  onError: () => void;
  onSave: (contractTransfer: ContractVariationTransferFormInput) => void;
}
