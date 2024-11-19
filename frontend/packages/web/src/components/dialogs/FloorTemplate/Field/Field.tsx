import { Grid2 } from '@mui/material';
import { TextField } from '@realgimm5/frontend-common/components';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FloorTemplateFieldProps } from './Field.types';

export const FloorTemplateField = ({ control, errors, index, readonly }: FloorTemplateFieldProps) => {
  const { t } = useTranslation();

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name={`floorTemplates.${index}.position`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label={t('floor.field.floor_position')}
              error={!!errors.floorTemplates?.[index]?.position}
              helperText={errors.floorTemplates?.[index]?.position?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name={`floorTemplates.${index}.name`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('floor.field.floor_name')}
              error={!!errors.floorTemplates?.[index]?.name}
              helperText={errors.floorTemplates?.[index]?.name?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
