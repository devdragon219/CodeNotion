import { UseStepperProps } from '@realgimm5/frontend-common/hooks';

import { ContractFormInput } from '../../../../interfaces/FormInputs/Contract';
import { ContractCounterpartVariationTransferFormInput } from '../../../../interfaces/FormInputs/ContractActions';

export interface CounterpartTransferStepperProps extends UseStepperProps {
  contract: ContractFormInput;
  counterpartTransfer: ContractCounterpartVariationTransferFormInput;
  isActive: boolean;
  onBack: () => void;
  onChange: (counterpartTransfer: ContractCounterpartVariationTransferFormInput) => void;
  onSave: (counterpartTransfer: ContractCounterpartVariationTransferFormInput) => void;
}
