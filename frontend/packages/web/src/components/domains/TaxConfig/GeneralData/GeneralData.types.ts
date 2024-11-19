import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control, FieldErrors } from 'react-hook-form';

import { TaxConfigFormInput } from '../../../../interfaces/FormInputs/TaxConfig';

export interface TaxConfigGeneralDataProps {
  control: Control<TaxConfigFormInput>;
  errors: FieldErrors<TaxConfigFormInput>;
  mode: FormMode;
  readonly?: boolean;
}
