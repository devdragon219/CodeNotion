import { Control, FieldErrors } from 'react-hook-form';

import { SubjectFormInput, SubjectOfficerFormInput } from '../../../../../interfaces/FormInputs/Subject';

export interface OfficerFieldProps {
  control: Control<SubjectFormInput>;
  errors: FieldErrors<SubjectFormInput>;
  index: number;
  required?: boolean;
  selectedOfficers: SubjectOfficerFormInput[];
  useOfficerType?: boolean;
}
