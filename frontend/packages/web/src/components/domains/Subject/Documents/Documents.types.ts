import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control, FieldErrors } from 'react-hook-form';

import { SubjectFormInput } from '../../../../interfaces/FormInputs/Subject';

export interface SubjectDocumentsProps {
  control: Control<SubjectFormInput>;
  errors: FieldErrors<SubjectFormInput>;
  mode: FormMode;
  readonly?: boolean;
}
