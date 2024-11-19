import { Control, FieldErrors } from 'react-hook-form';

import { SubjectFormInput, SubjectHeirFormInput } from '../../../../interfaces/FormInputs/Subject';

export interface HeirFieldProps {
  control: Control<SubjectFormInput>;
  errors: FieldErrors<SubjectFormInput>;
  index: number;
  owningManagementSubjectIds: number[];
  selectedHeirs: SubjectHeirFormInput[];
  subjectId?: number | null;
}
