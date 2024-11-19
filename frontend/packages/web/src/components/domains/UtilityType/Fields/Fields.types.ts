import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control, FieldErrors } from 'react-hook-form';

import { UtilityTypeFormInput } from '../../../../interfaces/FormInputs/UtilityType';

export interface UtilityTypeFieldsProps {
  control: Control<UtilityTypeFormInput>;
  errors: FieldErrors<UtilityTypeFormInput>;
  mode: FormMode;
  readonly?: boolean;
}
