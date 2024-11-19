import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';

import { SubjectFormInput } from '../../../../../interfaces/FormInputs/Subject';

export interface GovIdCodeFieldProps {
  control: Control<SubjectFormInput>;
  errors: FieldErrors<SubjectFormInput>;
  readonly?: boolean;
  setValue: UseFormSetValue<SubjectFormInput>;
}
