import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control, FieldErrors } from 'react-hook-form';

import { UserFormInput } from '../../../../interfaces/FormInputs/User';

export interface UserConfigProps {
  control: Control<UserFormInput>;
  errors: FieldErrors<UserFormInput>;
  mode: FormMode;
  readonly?: boolean;
}
