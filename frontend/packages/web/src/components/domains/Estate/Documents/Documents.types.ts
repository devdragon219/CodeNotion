import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control, FieldErrors } from 'react-hook-form';

import { EstateFormInput } from '../../../../interfaces/FormInputs/Estate';

export interface EstateDocumentsProps {
  control: Control<EstateFormInput>;
  errors: FieldErrors<EstateFormInput>;
  mode: FormMode;
  readonly?: boolean;
}
