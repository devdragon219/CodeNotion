import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';

import { CadastralUnitFormInput } from '../../../../interfaces/FormInputs/CadastralUnit';

export interface CadastralUnitInspectionProps {
  control: Control<CadastralUnitFormInput>;
  deletable?: boolean;
  errors: FieldErrors<CadastralUnitFormInput>;
  mode: FormMode;
  readonly?: boolean;
  setValue: UseFormSetValue<CadastralUnitFormInput>;
}
