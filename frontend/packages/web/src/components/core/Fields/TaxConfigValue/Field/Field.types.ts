import { FormMode } from '@realgimm5/frontend-common/enums';
import { FieldErrors } from 'react-hook-form';

import { TaxConfigFieldFormInput, TaxConfigValueFormInput } from '../../../../../interfaces/FormInputs/TaxConfig';

export interface TaxConfigFieldProps {
  errors?: FieldErrors<TaxConfigValueFormInput>;
  field: TaxConfigFieldFormInput;
  index: number;
  mode: FormMode;
  readonly?: boolean;
  onChange: (field: TaxConfigFieldFormInput) => void;
}
