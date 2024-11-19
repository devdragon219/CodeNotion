import { Grid2 } from '@mui/material';
import { SectionTitle, TextField } from '@realgimm5/frontend-common/components';
import { EstateUnitType } from '@realgimm5/frontend-common/gql/types';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { TotalSurfaceFieldProps } from './TotalSurfaceField.types';

export const TotalSurfaceField = ({ control, errors, estateUnitType }: TotalSurfaceFieldProps) => {
  const { t } = useTranslation();

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <SectionTitle value="estate_unit.section_title.surface_value" />
      <Grid2 size={{ xs: 12, sm: estateUnitType === EstateUnitType.Ground ? 12 : 4 }}>
        <Controller
          name="surfaceSqMTotal"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label={t('estate_unit.field.surface_total_area')}
              error={!!errors.surfaceSqMTotal}
              helperText={errors.surfaceSqMTotal?.message}
            />
          )}
        />
      </Grid2>
      {estateUnitType !== EstateUnitType.Ground && (
        <>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="surfaceSqMCommonArea"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label={t('estate_unit.field.surface_common_area')}
                  error={!!errors.surfaceSqMCommonArea}
                  helperText={errors.surfaceSqMCommonArea?.message}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="surfaceSqMSideArea"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label={t('estate_unit.field.surface_side_area')}
                  error={!!errors.surfaceSqMSideArea}
                  helperText={errors.surfaceSqMSideArea?.message}
                />
              )}
            />
          </Grid2>
        </>
      )}
    </Grid2>
  );
};
