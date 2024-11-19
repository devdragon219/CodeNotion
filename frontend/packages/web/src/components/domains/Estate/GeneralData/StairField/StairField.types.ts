import { Control, FieldErrors } from 'react-hook-form';

import { EstateFormInput } from '../../../../../interfaces/FormInputs/Estate';

export interface StairFieldProps {
  control: Control<EstateFormInput>;
  errors: FieldErrors<EstateFormInput>;
  index: number;
  readonly?: boolean;
}
