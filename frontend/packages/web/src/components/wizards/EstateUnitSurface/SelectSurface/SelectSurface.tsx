import { Grid2 } from '@mui/material';
import { RadioGroupField, SectionTitle, StepForm } from '@realgimm5/frontend-common/components';
import { useTranslation } from 'react-i18next';

import { SurfaceMode } from '../../../../enums/SurfaceMode';
import { EstateUnitSurfaceSelectSurfaceStepProps } from './SelectSurface.types';

export const EstateUnitSurfaceSelectSurfaceStep = ({
  surfaceMode,
  onChange,
  onNext,
}: EstateUnitSurfaceSelectSurfaceStepProps) => {
  const { t } = useTranslation();

  return (
    <StepForm onNext={onNext}>
      <Grid2 container spacing={{ xs: 2, sm: 3 }}>
        <SectionTitle value="estate_unit.section_title.surface_mode" />
        <Grid2 size={12}>
          <RadioGroupField
            options={Object.values(SurfaceMode).map((mode) => ({
              label: t(`core.enum.surface_mode.${mode}`),
              value: mode,
            }))}
            value={surfaceMode}
            onChange={onChange}
          />
        </Grid2>
      </Grid2>
    </StepForm>
  );
};
