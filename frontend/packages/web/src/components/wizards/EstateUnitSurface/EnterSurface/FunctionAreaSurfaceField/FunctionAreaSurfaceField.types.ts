import { Control, FieldErrors } from 'react-hook-form';

import { EstateUnitSurfaceFormInput } from '../../../../../interfaces/FormInputs/EstateUnit';
import { FloorFormInput } from '../../../../../interfaces/FormInputs/Floor';

export interface FunctionAreaSurfaceFieldProps {
  control: Control<EstateUnitSurfaceFormInput>;
  errors: FieldErrors<EstateUnitSurfaceFormInput>;
  estateUnitFloors: FloorFormInput[];
  index: number;
}
