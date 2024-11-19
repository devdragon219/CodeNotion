import { Control, FieldErrors } from 'react-hook-form';

import { EstateFormInput } from '../../../../../interfaces/FormInputs/Estate';

export interface ManagementOrgUnitFieldProps {
  control: Control<EstateFormInput>;
  errors: FieldErrors<EstateFormInput>;
  readonly?: boolean;
}