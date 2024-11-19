import { Control, FieldErrors } from 'react-hook-form';

import { EstateUnitFormInput } from '../../../../../interfaces/FormInputs/EstateUnit';

export interface OfficialActFieldProps {
  control: Control<EstateUnitFormInput>;
  errors: FieldErrors<EstateUnitFormInput>;
  readonly?: boolean;
}
