import { Grid2 } from '@mui/material';
import { DateField, TextField } from '@realgimm5/frontend-common/components';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { UnavailabilityFieldProps } from './Field.types';

export const UnavailabilityField = ({ control, errors, index }: UnavailabilityFieldProps) => {
  const { t } = useTranslation();

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name={`unavailabilities.${index}.since`}
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('cadastral_unit.field.unavailability_since')}
              error={!!errors.unavailabilities?.[index]?.since}
              helperText={errors.unavailabilities?.[index]?.since?.message}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name={`unavailabilities.${index}.until`}
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('cadastral_unit.field.unavailability_until')}
              error={!!errors.unavailabilities?.[index]?.until}
              helperText={errors.unavailabilities?.[index]?.until?.message}
            />
          )}
        />
      </Grid2>
      <Grid2 size={12}>
        <Controller
          name={`unavailabilities.${index}.notes`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              multiline
              label={t(`cadastral_unit.field.notes`)}
              error={!!errors.unavailabilities?.[index]?.notes}
              helperText={errors.unavailabilities?.[index]?.notes?.message}
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
