import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';

import { SubjectType } from '../../../../enums/SubjectType';
import { SubjectFormInput } from '../../../../interfaces/FormInputs/Subject';

export interface SubjectPersonalDataProps {
  control: Control<SubjectFormInput>;
  errors: FieldErrors<SubjectFormInput>;
  mode: FormMode;
  readonly?: boolean;
  subjectType: SubjectType;
  setValue: UseFormSetValue<SubjectFormInput>;
}
