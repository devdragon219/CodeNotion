import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control, FieldErrors } from 'react-hook-form';

import { WorkersFieldValues } from '../../../interfaces/FormInputs/Worker';

export interface WorkersProps {
  control: Control<WorkersFieldValues>;
  errors: FieldErrors<WorkersFieldValues>;
  mode: FormMode;
  readonly?: boolean;
}
