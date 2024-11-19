import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';

import { SubjectFormInput } from '../../../../interfaces/FormInputs/Subject';

export interface SubjectAddressesAndContactsProps {
  control: Control<SubjectFormInput>;
  errors: FieldErrors<SubjectFormInput>;
  mode: FormMode;
  readonly?: boolean;
  setValue: UseFormSetValue<SubjectFormInput>;
}
