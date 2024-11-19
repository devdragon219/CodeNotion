import { Control, FieldErrors } from 'react-hook-form';

import { EstateUnitFormInput } from '../../../../interfaces/FormInputs/EstateUnit';

export interface EstateUnitCadastralUnitProps {
  control: Control<EstateUnitFormInput>;
  errors: FieldErrors<EstateUnitFormInput>;
  readonly?: boolean;
  onAdd: () => void;
}
