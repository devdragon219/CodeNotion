import { Control, FieldErrors } from 'react-hook-form';

import { UserFormInput } from '../../../../../interfaces/FormInputs/User';

export interface GroupsFieldProps {
  control: Control<UserFormInput>;
  errors: FieldErrors<UserFormInput>;
  readonly?: boolean;
}
