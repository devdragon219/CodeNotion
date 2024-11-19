import { EstateUnitType } from '@realgimm5/frontend-common/gql/types';

import { SurfaceMode } from '../../../../enums/SurfaceMode';
import {
  EstateUnitFunctionAreaSurfaceFormInput,
  EstateUnitSurfaceFormInput,
} from '../../../../interfaces/FormInputs/EstateUnit';
import { FloorFormInput } from '../../../../interfaces/FormInputs/Floor';

export interface EstateUnitSurfaceEnterSurfaceStepProps {
  estateUnitFloors: FloorFormInput[];
  estateUnitSurface: EstateUnitSurfaceFormInput;
  estateUnitType: EstateUnitType;
  functionAreas: EstateUnitFunctionAreaSurfaceFormInput['functionArea'][];
  surfaceMode: SurfaceMode;
  onBack?: () => void;
  onChange: (estateUnitSurface: EstateUnitSurfaceFormInput) => void;
  onError: () => void;
  onSave: (estateUnitSurface: EstateUnitSurfaceFormInput) => void;
}
