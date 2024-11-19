import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';

import { UserFormInput } from '../../../../interfaces/FormInputs/User';

export interface UserGeneralDataProps {
  control: Control<UserFormInput>;
  errors: FieldErrors<UserFormInput>;
  mode: FormMode;
  readonly?: boolean;
  setValue: UseFormSetValue<UserFormInput>;
}
