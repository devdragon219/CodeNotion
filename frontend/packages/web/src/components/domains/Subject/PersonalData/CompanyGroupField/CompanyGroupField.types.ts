import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';

import { SubjectType } from '../../../../../enums/SubjectType';
import { SubjectFormInput } from '../../../../../interfaces/FormInputs/Subject';

export interface CompanyGroupFieldProps {
  control: Control<SubjectFormInput>;
  errors: FieldErrors<SubjectFormInput>;
  readonly?: boolean;
  subjectType: SubjectType;
  setValue: UseFormSetValue<SubjectFormInput>;
}
