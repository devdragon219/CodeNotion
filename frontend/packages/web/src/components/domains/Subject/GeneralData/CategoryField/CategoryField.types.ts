import { Control, FieldErrors } from 'react-hook-form';

import { SubjectFormInput } from '../../../../../interfaces/FormInputs/Subject';

export interface CategoryFieldProps {
  control: Control<SubjectFormInput>;
  errors: FieldErrors<SubjectFormInput>;
  readonly?: boolean;
  required?: boolean;
  useHeir: boolean;
}
