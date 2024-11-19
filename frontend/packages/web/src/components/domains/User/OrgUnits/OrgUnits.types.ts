import { Control, UseFormSetValue } from 'react-hook-form';

import { UserFormInput } from '../../../../interfaces/FormInputs/User';

export interface UserOrgUnitsProps {
  control: Control<UserFormInput>;
  readonly?: boolean;
  setValue: UseFormSetValue<UserFormInput>;
}
