import { Control } from 'react-hook-form';

import { CostChargeFormInput } from '../../../../interfaces/FormInputs/CostCharge';

export interface CostChargeUtilityServiceProps {
  control: Control<CostChargeFormInput>;
  readonly?: boolean;
}
