import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';

import { SubjectFormInput } from '../../../../../interfaces/FormInputs/Subject';

export interface HouseIdCodeFieldProps {
  control: Control<SubjectFormInput>;
  errors: FieldErrors<SubjectFormInput>;
  readonly?: boolean;
  setValue: UseFormSetValue<SubjectFormInput>;
}
