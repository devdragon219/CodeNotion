import { FormMode } from '@realgimm5/frontend-common/enums';
import { FieldErrors } from 'react-hook-form';

import { TaxConfigValueFormInput } from '../../../../interfaces/FormInputs/TaxConfig';

export interface TaxConfigValueFieldProps {
  errors?: FieldErrors<TaxConfigValueFormInput>;
  mode: FormMode;
  readonly?: boolean;
  value: TaxConfigValueFormInput;
  onChange?: (value: TaxConfigValueFormInput) => void;
}
