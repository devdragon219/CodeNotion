import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control, FieldErrors } from 'react-hook-form';

import { EstateUnitFormInput } from '../../../../interfaces/FormInputs/EstateUnit';

export interface EstateUnitDocumentsProps {
  control: Control<EstateUnitFormInput>;
  errors: FieldErrors<EstateUnitFormInput>;
  mode: FormMode;
  readonly?: boolean;
}
