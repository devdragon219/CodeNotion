import { Grid2 } from '@mui/material';
import { CheckboxField, DateField, TextField } from '@realgimm5/frontend-common/components';
import { EstateUnitType } from '@realgimm5/frontend-common/gql/types';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { InspectionFieldProps } from './Field.types';

export const InspectionField = ({ estateUnitType, control, errors, readonly }: InspectionFieldProps) => {
  const { t } = useTranslation();

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {estateUnitType && [EstateUnitType.Building, EstateUnitType.Other].includes(estateUnitType) && (
        <>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="inspection.macroZone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('cadastral_unit.field.inspection_macro_zone')}
                  error={!!errors.inspection?.macroZone}
                  helperText={errors.inspection?.macroZone?.message}
                  readonly={readonly}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="inspection.microZone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('cadastral_unit.field.inspection_micro_zone')}
                  error={!!errors.inspection?.microZone}
                  helperText={errors.inspection?.microZone?.message}
                  readonly={readonly}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="inspection.isHistoricalEstate"
              control={control}
              render={({ field }) => (
                <CheckboxField
                  {...field}
                  label={t('cadastral_unit.field.inspection_historical_estate')}
                  error={!!errors.inspection?.isHistoricalEstate}
                  helperText={errors.inspection?.isHistoricalEstate?.message}
                  readonly={readonly}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="inspection.isDirectRestriction"
              control={control}
              render={({ field }) => (
                <CheckboxField
                  {...field}
                  label={t('cadastral_unit.field.inspection_direct_restriction')}
                  error={!!errors.inspection?.isDirectRestriction}
                  helperText={errors.inspection?.isDirectRestriction?.message}
                  readonly={readonly}
                />
              )}
            />
          </Grid2>
        </>
      )}
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="inspection.protocolDate"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('cadastral_unit.field.inspection_protocol_date')}
              error={!!errors.inspection?.protocolDate}
              helperText={errors.inspection?.protocolDate?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="inspection.protocolNumber"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('cadastral_unit.field.inspection_protocol_number')}
              error={!!errors.inspection?.protocolNumber}
              helperText={errors.inspection?.protocolNumber?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="inspection.date"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('cadastral_unit.field.inspection_date')}
              error={!!errors.inspection?.date}
              helperText={errors.inspection?.date?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="inspection.heading"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('cadastral_unit.field.inspection_heading')}
              error={!!errors.inspection?.heading}
              helperText={errors.inspection?.heading?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
