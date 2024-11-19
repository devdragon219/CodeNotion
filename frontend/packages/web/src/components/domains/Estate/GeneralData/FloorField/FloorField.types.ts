import { Control, FieldErrors } from 'react-hook-form';

import { EstateFormInput } from '../../../../../interfaces/FormInputs/Estate';
import { FloorFormInput } from '../../../../../interfaces/FormInputs/Floor';

export interface FloorFieldProps {
  control: Control<EstateFormInput>;
  errors: FieldErrors<EstateFormInput>;
  initialFloors?: FloorFormInput[];
  readonly?: boolean;
  onAddFloor: (onComplete: () => void) => void;
}
