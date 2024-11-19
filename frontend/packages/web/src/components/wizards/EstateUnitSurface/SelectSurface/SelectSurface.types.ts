import { SurfaceMode } from '../../../../enums/SurfaceMode';

export interface EstateUnitSurfaceSelectSurfaceStepProps {
  surfaceMode: SurfaceMode;
  onChange: (surfaceMode: SurfaceMode) => void;
  onNext: () => void;
}
