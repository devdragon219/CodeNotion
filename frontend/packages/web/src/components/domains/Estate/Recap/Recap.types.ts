import { Control, FieldErrors } from 'react-hook-form';

import { EstateFormInput } from '../../../../interfaces/FormInputs/Estate';

export interface EstateRecapProps {
  control: Control<EstateFormInput>;
  errors: FieldErrors<EstateFormInput>;
}
