import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';

import { EstateUnitCadastralUnitFormInput } from '../../../../interfaces/FormInputs/EstateUnit';

export interface EstateUnitActionCadastralUnitProps {
  control: Control<EstateUnitCadastralUnitFormInput>;
  errors: FieldErrors<EstateUnitCadastralUnitFormInput>;
  estateUnitInternalCode: string;
  setValue: UseFormSetValue<EstateUnitCadastralUnitFormInput>;
}
