import { UseStepperProps } from '@realgimm5/frontend-common/hooks';

import { ContractFormInput } from '../../../../interfaces/FormInputs/Contract';
import { ContractCounterpartVariationDeceaseFormInput } from '../../../../interfaces/FormInputs/ContractActions';

export interface CounterpartDeceaseStepperProps extends UseStepperProps {
  contract: ContractFormInput;
  counterpartDecease: ContractCounterpartVariationDeceaseFormInput;
  isActive: boolean;
  onAddHeir: (onComplete: () => void) => void;
  onBack: () => void;
  onChange: (counterpartDecease: ContractCounterpartVariationDeceaseFormInput) => void;
  onSave: (counterpartDecease: ContractCounterpartVariationDeceaseFormInput) => void;
}
