import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control, FieldErrors } from 'react-hook-form';

import { CadastralUnitFormInput } from '../../../../interfaces/FormInputs/CadastralUnit';

export interface CadastralUnitCoordinatesProps {
  control: Control<CadastralUnitFormInput>;
  errors: FieldErrors<CadastralUnitFormInput>;
  iconPositionAbsolute?: boolean;
  mode: FormMode;
  readonly?: boolean;
  useNotes?: boolean;
}
