import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';

import { EstateFormInput } from '../../../../interfaces/FormInputs/Estate';

export interface EstateAddressesProps {
  control: Control<EstateFormInput>;
  errors: FieldErrors<EstateFormInput>;
  mode: FormMode;
  readonly?: boolean;
  setValue: UseFormSetValue<EstateFormInput>;
}
