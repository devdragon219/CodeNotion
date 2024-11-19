import { Control, UseFormSetValue } from 'react-hook-form';

import { PermissionsFieldValues } from '../../../../interfaces/FormInputs/Permissions';

export interface GroupPermissionsFieldProps {
  control: Control<PermissionsFieldValues>;
  setValue: UseFormSetValue<PermissionsFieldValues>;
}
