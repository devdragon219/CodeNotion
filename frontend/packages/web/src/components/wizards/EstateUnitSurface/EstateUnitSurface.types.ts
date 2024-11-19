import { EstateUnitType } from '@realgimm5/frontend-common/gql/types';

import { EstateUnitSurfaceFormInput } from '../../../interfaces/FormInputs/EstateUnit';
import { FloorFormInput } from '../../../interfaces/FormInputs/Floor';

export interface EstateUnitSurfaceDialogProps {
  estateUnitFloors: FloorFormInput[];
  estateUnitSurface: EstateUnitSurfaceFormInput;
  estateUnitType: EstateUnitType;
  onClose: () => void;
  onSave: (estateUnitSurface: EstateUnitSurfaceFormInput) => void;
}
