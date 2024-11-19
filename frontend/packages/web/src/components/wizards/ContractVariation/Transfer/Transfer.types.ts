import { UseStepperProps } from '@realgimm5/frontend-common/hooks';

import { ContractFormInput } from '../../../../interfaces/FormInputs/Contract';
import { ContractVariationTransferFormInput } from '../../../../interfaces/FormInputs/ContractActions';

export interface ContractTransferStepperProps extends UseStepperProps {
  contract: ContractFormInput;
  contractTransfer: ContractVariationTransferFormInput;
  isActive: boolean;
  onBack: () => void;
  onChange: (contractTransfer: ContractVariationTransferFormInput) => void;
  onSave: (contractTransfer: ContractVariationTransferFormInput) => void;
}
