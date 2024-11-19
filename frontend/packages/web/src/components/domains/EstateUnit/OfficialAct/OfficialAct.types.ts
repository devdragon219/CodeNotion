import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';

import { EstateUnitFormInput } from '../../../../interfaces/FormInputs/EstateUnit';

export interface EstateUnitOfficialActProps {
  control: Control<EstateUnitFormInput>;
  errors: FieldErrors<EstateUnitFormInput>;
  mode: FormMode;
  readonly?: boolean;
  setValue: UseFormSetValue<EstateUnitFormInput>;
}
