import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';

import { EstateFormInput } from '../../../../interfaces/FormInputs/Estate';
import { FloorFormInput } from '../../../../interfaces/FormInputs/Floor';

export interface EstateGeneralDataProps {
  control: Control<EstateFormInput>;
  errors: FieldErrors<EstateFormInput>;
  initialFloors?: FloorFormInput[];
  mode: FormMode;
  readonly?: boolean;
  onAddFloor: (onComplete: () => void) => void;
  setValue: UseFormSetValue<EstateFormInput>;
}
