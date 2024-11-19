import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control, FieldErrors } from 'react-hook-form';

import { WorkersFieldValues } from '../../../../interfaces/FormInputs/Worker';

export interface WorkerFieldProps {
  control: Control<WorkersFieldValues>;
  errors: FieldErrors<WorkersFieldValues>;
  index: number;
  mode: FormMode;
}
