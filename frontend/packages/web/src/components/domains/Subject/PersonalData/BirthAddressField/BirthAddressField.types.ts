import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';

import { SubjectFormInput } from '../../../../../interfaces/FormInputs/Subject';

export interface BirthAddressFieldProps {
  control: Control<SubjectFormInput>;
  errors: FieldErrors<SubjectFormInput>;
  readonly?: boolean;
  required?: boolean;
  setValue: UseFormSetValue<SubjectFormInput>;
}
