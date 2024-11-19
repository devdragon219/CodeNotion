import { Control, FieldErrors } from 'react-hook-form';

import { CadastralUnitFormInput } from '../../../../../interfaces/FormInputs/CadastralUnit';

export interface CoordinatesFieldProps {
  control: Control<CadastralUnitFormInput>;
  errors: FieldErrors<CadastralUnitFormInput>;
  index: number;
  readonly?: boolean;
}
