import { Control, UseFormSetValue } from 'react-hook-form';

import { GroupFormInput } from '../../../../interfaces/FormInputs/Group';

export interface GroupPermissionsProps {
  control: Control<GroupFormInput>;
  readonly?: boolean;
  setValue: UseFormSetValue<GroupFormInput>;
}
