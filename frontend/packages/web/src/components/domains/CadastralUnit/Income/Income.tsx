import { Grid2 } from '@mui/material';
import { CurrencyField, SectionTitle, SelectField, TextField } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { EstateUnitType, IncomeMetric, IncomeType } from '@realgimm5/frontend-common/gql/types';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CadastralCategoryField } from './CadastralCategoryField/CadastralCategoryField';
import { CadastralLandCategoryField } from './CadastralLandCategoryField/CadastralLandCategoryField';
import { CadastralUnitIncomeProps } from './Income.types';

export const CadastralUnitIncome = ({ control, errors, mode, readonly }: CadastralUnitIncomeProps) => {
  const { t } = useTranslation();

  const estateUnit = useWatch({ control, name: 'estateUnit' });

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {mode === FormMode.Create && <SectionTitle value="cadastral_unit.section_title.income" />}
      {estateUnit?.type && [EstateUnitType.Building, EstateUnitType.Other].includes(estateUnit.type) && (
        <Grid2 size={{ xs: 12, sm: 4 }}>
          <CadastralCategoryField control={control} errors={errors} readonly={readonly} />
        </Grid2>
      )}
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="income.microCategory"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('cadastral_unit.field.income_micro_category')}
              error={!!errors.income?.microCategory}
              helperText={errors.income?.microCategory?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="income.registeredSurface"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label={t('cadastral_unit.field.income_registered_surface')}
              error={!!errors.income?.registeredSurface}
              helperText={errors.income?.registeredSurface?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      {estateUnit?.type && [EstateUnitType.Building, EstateUnitType.Other].includes(estateUnit.type) ? (
        <>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="income.incomeType"
              control={control}
              render={({ field }) => (
                <SelectField
                  {...field}
                  label={t('cadastral_unit.field.income_type')}
                  options={Object.values(IncomeType)}
                  getOptionLabel={(option) => t(`common.enum.income_type.${option}`)}
                  error={!!errors.income?.incomeType}
                  helperText={errors.income?.incomeType?.message}
                  readonly={readonly}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="income.cadastralAmount"
              control={control}
              render={({ field }) => (
                <CurrencyField
                  {...field}
                  label={t('cadastral_unit.field.income_cadastral_amount')}
                  error={!!errors.income?.cadastralAmount}
                  helperText={errors.income?.cadastralAmount?.message}
                  readonly={readonly}
                />
              )}
            />
          </Grid2>
        </>
      ) : (
        <>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <CadastralLandCategoryField control={control} errors={errors} readonly={readonly} />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="income.farmAmount"
              control={control}
              render={({ field }) => (
                <CurrencyField
                  {...field}
                  label={t('cadastral_unit.field.income_farm_amount')}
                  error={!!errors.income?.farmAmount}
                  helperText={errors.income?.farmAmount?.message}
                  readonly={readonly}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="income.landAmount"
              control={control}
              render={({ field }) => (
                <CurrencyField
                  {...field}
                  label={t('cadastral_unit.field.income_land_amount')}
                  error={!!errors.income?.landAmount}
                  helperText={errors.income?.landAmount?.message}
                  readonly={readonly}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="income.marketValue"
              control={control}
              render={({ field }) => (
                <CurrencyField
                  {...field}
                  label={t('cadastral_unit.field.income_market_value')}
                  error={!!errors.income?.marketValue}
                  helperText={errors.income?.marketValue?.message}
                  readonly={readonly}
                />
              )}
            />
          </Grid2>
        </>
      )}
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="income.metric"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('cadastral_unit.field.income_metric')}
              options={Object.values(IncomeMetric)}
              getOptionLabel={(option) => t(`common.enum.income_metric.${option}`)}
              error={!!errors.income?.metric}
              helperText={errors.income?.metric?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="income.metricAmount"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label={t('cadastral_unit.field.income_metric_amount')}
              error={!!errors.income?.metricAmount}
              helperText={errors.income?.metricAmount?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="income.metricRentedAmount"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label={t('cadastral_unit.field.income_metric_rented_amount')}
              error={!!errors.income?.metricRentedAmount}
              helperText={errors.income?.metricRentedAmount?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
