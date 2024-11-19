import { Control, FieldErrors } from 'react-hook-form';

import { UtilityServiceFormInput } from '../../../../../interfaces/FormInputs/UtilityService';

export interface UtilityTypeFieldProps {
  control: Control<UtilityServiceFormInput>;
  disabled?: boolean;
  errors: FieldErrors<UtilityServiceFormInput>;
  readonly?: boolean;
}
