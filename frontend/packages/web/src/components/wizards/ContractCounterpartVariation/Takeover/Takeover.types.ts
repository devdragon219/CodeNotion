import { UseStepperProps } from '@realgimm5/frontend-common/hooks';

import { ContractFormInput } from '../../../../interfaces/FormInputs/Contract';
import { ContractCounterpartVariationTakeoverFormInput } from '../../../../interfaces/FormInputs/ContractActions';

export interface CounterpartTakeoverStepperProps extends UseStepperProps {
  contract: ContractFormInput;
  counterpartTakeover: ContractCounterpartVariationTakeoverFormInput;
  isActive: boolean;
  onBack: () => void;
  onChange: (counterpartTakeover: ContractCounterpartVariationTakeoverFormInput) => void;
  onSave: (counterpartTakeover: ContractCounterpartVariationTakeoverFormInput) => void;
}
