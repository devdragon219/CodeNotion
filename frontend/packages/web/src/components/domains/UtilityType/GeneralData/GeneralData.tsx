import { Grid2 } from '@mui/material';
import { CheckboxField, SectionTitle, SelectField, TextField } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { MeteringType, UtilityCategory } from '@realgimm5/frontend-common/gql/types';
import { useEffect, useState } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useUtilityType } from '../../../../hooks/useUtilityType';
import { UtilityTypeGeneralDataProps } from './GeneralData.types';

export const UtilityTypeGeneralData = ({ control, errors, mode, readonly }: UtilityTypeGeneralDataProps) => {
  const { t } = useTranslation();
  const { checkHasUtilityServices } = useUtilityType();
  const utilityTypeId = useWatch({ control, name: 'utilityTypeId' });
  const [hasUtilityServices, setHasUtilityServices] = useState(false);

  useEffect(() => {
    checkHasUtilityServices(utilityTypeId, setHasUtilityServices);

    // eslint-disable-next-line
  }, []);

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {mode === FormMode.Create && <SectionTitle value="utility_type.section_title.utility" />}
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              options={Object.values(UtilityCategory)}
              getOptionLabel={(option) => t(`common.enum.utility_category.${option}`)}
              label={t('utility_type.field.utility_category')}
              error={!!errors.category}
              helperText={errors.category?.message}
              disabled={mode === FormMode.Edit}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="internalCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('utility_type.field.utility_code')}
              error={!!errors.internalCode}
              helperText={errors.internalCode?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('utility_type.field.utility_description')}
              error={!!errors.description}
              helperText={errors.description?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="externalCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('utility_type.field.external_code')}
              error={!!errors.externalCode}
              helperText={errors.externalCode?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="expenseClass"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('utility_type.field.expense_class')}
              error={!!errors.expenseClass}
              helperText={errors.expenseClass?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <SectionTitle value="utility_type.section_title.meter" />
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="measurementUnit"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('utility_type.field.measurement_unit_code')}
              error={!!errors.measurementUnit}
              helperText={errors.measurementUnit?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="measurementUnitDescription"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('utility_type.field.measurement_unit_description')}
              error={!!errors.measurementUnitDescription}
              helperText={errors.measurementUnitDescription?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="timeOfUseRateCount"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label={t('utility_type.field.time_of_use_rate_count')}
              error={!!errors.timeOfUseRateCount}
              helperText={errors.timeOfUseRateCount?.message}
              disabled={hasUtilityServices}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="meteringType"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              options={Object.values(MeteringType)}
              getOptionLabel={(option) => t(`common.enum.metering_type.${option}`)}
              label={t('utility_type.field.metering_type')}
              error={!!errors.meteringType}
              helperText={errors.meteringType?.message}
              disabled={hasUtilityServices}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="hasHeatingAccountingSystem"
          control={control}
          render={({ field }) => (
            <CheckboxField
              {...field}
              label={t('utility_type.field.has_heating_accounting_system')}
              error={!!errors.hasHeatingAccountingSystem}
              helperText={errors.hasHeatingAccountingSystem?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
