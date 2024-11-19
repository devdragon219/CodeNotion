import { Control } from 'react-hook-form';

import { SubjectFormInput } from '../../../../../interfaces/FormInputs/Subject';

export interface TaxStatusesFieldProps {
  control: Control<SubjectFormInput>;
  readonly?: boolean;
}
