import { SurfaceMode } from '../../enums/SurfaceMode';
import { EstateUnitSurfaceFormInput } from '../../interfaces/FormInputs/EstateUnit';

export const getSurfaceModeFromEstateUnitSurfaceFormInput = (
  estateUnitSurface: EstateUnitSurfaceFormInput,
): SurfaceMode => {
  if (estateUnitSurface.floors.some(({ functionAreas }) => functionAreas.length !== 0)) {
    return SurfaceMode.FunctionArea;
  }
  if (estateUnitSurface.floors.length !== 0) {
    return SurfaceMode.Floor;
  }
  return SurfaceMode.Total;
};
