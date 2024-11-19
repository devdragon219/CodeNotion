import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';

import { CostChargeFormInput } from '../../../../interfaces/FormInputs/CostCharge';

export interface CostChargeGeneralDataProps {
  control: Control<CostChargeFormInput>;
  errors: FieldErrors<CostChargeFormInput>;
  mode: FormMode;
  readonly?: boolean;
  setValue: UseFormSetValue<CostChargeFormInput>;
}
