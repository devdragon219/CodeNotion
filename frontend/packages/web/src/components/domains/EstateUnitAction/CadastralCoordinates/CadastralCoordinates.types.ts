import { Control, FieldErrors } from 'react-hook-form';

import { EstateUnitCadastralUnitFormInput } from '../../../../interfaces/FormInputs/EstateUnit';

export interface EstateUnitActionCadastralCoordinatesProps {
  control: Control<EstateUnitCadastralUnitFormInput>;
  errors: FieldErrors<EstateUnitCadastralUnitFormInput>;
  iconPositionAbsolute?: boolean;
}
