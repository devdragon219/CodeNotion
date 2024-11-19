import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';

import { EstateUnitGroupFormInput } from '../../../../interfaces/FormInputs/EstateUnitGroup';

export interface EstateUnitGroupGeneralDataProps {
  control: Control<EstateUnitGroupFormInput>;
  errors: FieldErrors<EstateUnitGroupFormInput>;
  mode: FormMode;
  readonly?: boolean;
  setValue: UseFormSetValue<EstateUnitGroupFormInput>;
}
