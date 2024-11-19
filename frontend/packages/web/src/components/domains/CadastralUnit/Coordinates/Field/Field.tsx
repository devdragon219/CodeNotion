import { Grid2 } from '@mui/material';
import { CheckboxField, TextField } from '@realgimm5/frontend-common/components';
import { CoordinateType } from '@realgimm5/frontend-common/gql/types';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CoordinatesFieldProps } from './Field.types';

export const CoordinatesField = ({ control, errors, index, readonly }: CoordinatesFieldProps) => {
  const { t } = useTranslation();
  const coordinateType = useWatch({ control, name: `coordinates.${index}.coordinateType` });
  const isTableBased = useWatch({ control, name: `coordinates.${index}.hasITTavData` });

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {coordinateType === CoordinateType.ItalianOrdinary ? (
        <>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name={`coordinates.${index}.level1`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('cadastral_unit.field.coordinate_level1')}
                  error={!!errors.coordinates?.[index]?.level1}
                  helperText={errors.coordinates?.[index]?.level1?.message}
                  readonly={readonly}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name={`coordinates.${index}.hasITTavData`}
              control={control}
              render={({ field }) => (
                <CheckboxField
                  {...field}
                  label={t('cadastral_unit.field.coordinate_table_base')}
                  error={!!errors.coordinates?.[index]?.hasITTavData}
                  helperText={errors.coordinates?.[index]?.hasITTavData?.message}
                  readonly={readonly}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name={`coordinates.${index}.level2`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t(`cadastral_unit.field.coordinate_level2`)}
                  error={!!errors.coordinates?.[index]?.level2}
                  helperText={errors.coordinates?.[index]?.level2?.message}
                  readonly={readonly}
                  required
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name={`coordinates.${index}.level3`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t(`cadastral_unit.field.coordinate_level3`)}
                  error={!!errors.coordinates?.[index]?.level3}
                  helperText={errors.coordinates?.[index]?.level3?.message}
                  readonly={readonly}
                  required
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name={`coordinates.${index}.level4`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t(`cadastral_unit.field.coordinate_level4`)}
                  error={!!errors.coordinates?.[index]?.level4}
                  helperText={errors.coordinates?.[index]?.level4?.message}
                  readonly={readonly}
                  required
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name={`coordinates.${index}.itTavPartita`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t(`cadastral_unit.field.coordinate_it_table_match`)}
                  error={!!errors.coordinates?.[index]?.itTavPartita}
                  helperText={errors.coordinates?.[index]?.itTavPartita?.message}
                  readonly={readonly}
                  disabled={!isTableBased}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name={`coordinates.${index}.itTavCorpo`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t(`cadastral_unit.field.coordinate_it_table_body`)}
                  error={!!errors.coordinates?.[index]?.itTavCorpo}
                  helperText={errors.coordinates?.[index]?.itTavCorpo?.message}
                  readonly={readonly}
                  disabled={!isTableBased}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name={`coordinates.${index}.itTavPorzione`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t(`cadastral_unit.field.coordinate_it_table_portion`)}
                  error={!!errors.coordinates?.[index]?.itTavPorzione}
                  helperText={errors.coordinates?.[index]?.itTavPorzione?.message}
                  readonly={readonly}
                  disabled={!isTableBased}
                />
              )}
            />
          </Grid2>
          <Grid2 size={12}>
            <Controller
              name={`coordinates.${index}.notes`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  multiline
                  label={t('cadastral_unit.field.notes')}
                  error={!!errors.coordinates?.[index]?.notes}
                  helperText={errors.coordinates?.[index]?.notes?.message}
                  readonly={readonly}
                />
              )}
            />
          </Grid2>
        </>
      ) : (
        <Grid2 size={12}>
          <Controller
            name={`coordinates.${index}.unmanagedOverride`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={t('cadastral_unit.field.coordinate_unmanaged_override')}
                error={!!errors.coordinates?.[index]?.unmanagedOverride}
                helperText={errors.coordinates?.[index]?.unmanagedOverride?.message}
                readonly={readonly}
              />
            )}
          />
        </Grid2>
      )}
    </Grid2>
  );
};
