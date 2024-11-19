import { Grid2 } from '@mui/material';
import { TextField } from '@realgimm5/frontend-common/components';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AssetValueFieldProps } from './Field.types';

export const AssetValueField = ({ control, errors, index }: AssetValueFieldProps) => {
  const { t } = useTranslation();

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name={`assetValues.${index}.year`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              maxLength={4}
              label={t('estate.field.asset_value_year')}
              error={!!errors.assetValues?.[index]?.year}
              helperText={errors.assetValues?.[index]?.year?.message}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name={`assetValues.${index}.rba`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label={t('estate.field.asset_value_rba')}
              error={!!errors.assetValues?.[index]?.rba}
              helperText={errors.assetValues?.[index]?.rba?.message}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name={`assetValues.${index}.ias`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label={t('estate.field.asset_value_ias')}
              error={!!errors.assetValues?.[index]?.ias}
              helperText={errors.assetValues?.[index]?.ias?.message}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name={`assetValues.${index}.depreciation`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label={t('estate.field.asset_value_depreciation')}
              error={!!errors.assetValues?.[index]?.depreciation}
              helperText={errors.assetValues?.[index]?.depreciation?.message}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name={`assetValues.${index}.transferYear`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              maxLength={4}
              label={t('estate.field.asset_value_transfer_in')}
              error={!!errors.assetValues?.[index]?.transferYear}
              helperText={errors.assetValues?.[index]?.transferYear?.message}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name={`assetValues.${index}.reclamationInterventions`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label={t('estate.field.asset_value_reclamation_interventions')}
              error={!!errors.assetValues?.[index]?.reclamationInterventions}
              helperText={errors.assetValues?.[index]?.reclamationInterventions?.message}
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
