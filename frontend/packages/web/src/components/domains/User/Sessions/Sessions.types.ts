import { Control } from 'react-hook-form';

import { UserFormInput } from '../../../../interfaces/FormInputs/User';

export interface UserSessionsProps {
  control: Control<UserFormInput>;
  readonly?: boolean;
}
