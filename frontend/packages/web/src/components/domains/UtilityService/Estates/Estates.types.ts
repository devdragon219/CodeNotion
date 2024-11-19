import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';

import { UtilityServiceFormInput } from '../../../../interfaces/FormInputs/UtilityService';

export interface UtilityServiceEstatesProps {
  control: Control<UtilityServiceFormInput>;
  errors: FieldErrors<UtilityServiceFormInput>;
  readonly?: boolean;
  setValue: UseFormSetValue<UtilityServiceFormInput>;
}
