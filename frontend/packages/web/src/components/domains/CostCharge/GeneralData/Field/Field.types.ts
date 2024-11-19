import { Control, FieldErrors } from 'react-hook-form';

import { CostChargeFormInput } from '../../../../../interfaces/FormInputs/CostCharge';

export interface CostChargeConsumptionFieldProps {
  control: Control<CostChargeFormInput>;
  errors: FieldErrors<CostChargeFormInput>;
  measurementUnit: string;
  type: 'actual' | 'expected';
}
