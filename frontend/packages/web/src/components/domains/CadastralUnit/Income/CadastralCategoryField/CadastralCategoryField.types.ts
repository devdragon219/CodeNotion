import { Control, FieldErrors } from 'react-hook-form';

import { CadastralUnitFormInput } from '../../../../../interfaces/FormInputs/CadastralUnit';

export interface CadastralCategoryFieldProps {
  control: Control<CadastralUnitFormInput>;
  errors: FieldErrors<CadastralUnitFormInput>;
  readonly?: boolean;
}
