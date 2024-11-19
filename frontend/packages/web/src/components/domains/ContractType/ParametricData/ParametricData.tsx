import { Grid2 } from '@mui/material';
import { CheckboxField, SectionTitle, SelectField, TextField } from '@realgimm5/frontend-common/components';
import { Month } from '@realgimm5/frontend-common/enums';
import { RegistrationTaxIncomeTypeRli } from '@realgimm5/frontend-common/gql/types';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ContractTypeParametricDataProps } from './ParametricData.types';

export const ContractTypeParametricData = ({ control, errors, readonly }: ContractTypeParametricDataProps) => {
  const { t } = useTranslation();
  const isRegistrationTax = useWatch({ control, name: 'isRegistrationTax' });
  const isRevaluationApplicable = useWatch({ control, name: 'isRevaluationApplicable' });

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <SectionTitle value="contract_type.section_title.registration_data" />
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="isRegistrationTax"
          control={control}
          render={({ field }) => (
            <CheckboxField
              {...field}
              label={t('contract_type.field.subject_registration_tax')}
              error={!!errors.isRegistrationTax}
              helperText={errors.isRegistrationTax?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="isStampTax"
          control={control}
          render={({ field }) => (
            <CheckboxField
              {...field}
              label={t('contract_type.field.stamp_tax')}
              error={!!errors.isStampTax}
              helperText={errors.isStampTax?.message}
              readonly={readonly}
              disabled={!isRegistrationTax}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="registrationTaxIncomeType"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('contract_type.field.registration_tax_income_type')}
              options={Object.values(RegistrationTaxIncomeTypeRli)}
              getOptionLabel={(option) => t(`common.enum.registration_tax_income_type_rli.${option}`)}
              error={!!errors.registrationTaxIncomeType}
              helperText={errors.registrationTaxIncomeType?.message}
              clearable={!readonly}
              readonly={readonly}
              disabled={!isRegistrationTax}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="registrationTaxPercent"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              maxLength={3}
              label={t('contract_type.field.registration_tax_percent')}
              error={!!errors.registrationTaxPercent}
              helperText={errors.registrationTaxPercent?.message}
              readonly={readonly}
              disabled={!isRegistrationTax}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="registrationTaxTenantPercent"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              maxLength={3}
              label={t('contract_type.field.registration_tax_tenant_percent')}
              error={!!errors.registrationTaxTenantPercent}
              helperText={errors.registrationTaxTenantPercent?.message}
              readonly={readonly}
              disabled={!isRegistrationTax}
            />
          )}
        />
      </Grid2>
      <SectionTitle value="contract_type.section_title.revaluation_data" />
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="isRevaluationApplicable"
          control={control}
          render={({ field }) => (
            <CheckboxField
              {...field}
              label={t('contract_type.field.revaluation')}
              error={!!errors.isRevaluationApplicable}
              helperText={errors.isRevaluationApplicable?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="isAbsoluteRevaluation"
          control={control}
          render={({ field }) => (
            <CheckboxField
              {...field}
              label={t('contract_type.field.is_absolute_revaluation')}
              error={!!errors.isAbsoluteRevaluation}
              helperText={errors.isAbsoluteRevaluation?.message}
              readonly={readonly}
              disabled={!isRevaluationApplicable}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="revaluationRatePercent"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('contract_type.field.revaluation_percent')}
              options={[75, 100]}
              error={!!errors.revaluationRatePercent}
              helperText={errors.revaluationRatePercent?.message}
              readonly={readonly}
              disabled={!isRevaluationApplicable}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="revaluationIndexMonth"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('contract_type.field.revaluation_index_month')}
              options={Object.values(Month)}
              useSortedOptions={false}
              getOptionLabel={(option) => t(`common.enum.month.${option}`)}
              error={!!errors.revaluationIndexMonth}
              helperText={errors.revaluationIndexMonth?.message}
              clearable={!readonly}
              readonly={readonly}
              disabled={!isRevaluationApplicable}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="revaluationCalculationMonth"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('contract_type.field.revaluation_calculation_month')}
              options={Object.values(Month)}
              useSortedOptions={false}
              getOptionLabel={(option) => t(`common.enum.month.${option}`)}
              error={!!errors.revaluationCalculationMonth}
              helperText={errors.revaluationCalculationMonth?.message}
              clearable={!readonly}
              readonly={readonly}
              disabled={!isRevaluationApplicable}
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
