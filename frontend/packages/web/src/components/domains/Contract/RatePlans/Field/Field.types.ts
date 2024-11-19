import { Control, FieldErrors } from 'react-hook-form';

import { ContractRatePlanFormInput } from '../../../../../interfaces/FormInputs/Contract';

export interface RatePlanFieldProps {
  control: Control<ContractRatePlanFormInput>;
  errors: FieldErrors<ContractRatePlanFormInput>;
}
