import { UseStepperProps } from '@realgimm5/frontend-common/hooks';

import { ContractFormInput } from '../../../../interfaces/FormInputs/Contract';
import { ContractCounterpartVariationAddFormInput } from '../../../../interfaces/FormInputs/ContractActions';

export interface CounterpartAddStepperProps extends UseStepperProps {
  contract: ContractFormInput;
  counterpartAdd: ContractCounterpartVariationAddFormInput;
  isActive: boolean;
  onBack: () => void;
  onChange: (counterpartAdd: ContractCounterpartVariationAddFormInput) => void;
  onSave: (counterpartAdd: ContractCounterpartVariationAddFormInput) => void;
}
