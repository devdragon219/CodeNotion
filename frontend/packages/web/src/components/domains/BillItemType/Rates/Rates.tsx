import { Grid2 } from '@mui/material';
import { SectionTitle, SelectField } from '@realgimm5/frontend-common/components';
import { VatRateType } from '@realgimm5/frontend-common/gql/types';
import { useCallback } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { VatRateField } from '../../../core/Fields/VatRate/VatRate';
import { BillItemTypeRatesProps } from './Rates.types';

export const BillItemTypeRates = ({ control, errors, readonly, setValue }: BillItemTypeRatesProps) => {
  const { t } = useTranslation();
  const administrationVatRateType = useWatch({ control, name: 'administrationVatRateType' });

  const handleAdministrationVatRateTypeChange = useCallback(
    (onChange: (value: VatRateType | null) => void) => (value: VatRateType | null) => {
      setValue('administrationVR', null);
      onChange(value);
    },
    [setValue],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <SectionTitle value="bill_item_type.section_title.active_contracts" />
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="activeSubjectVR"
          control={control}
          render={({ field }) => (
            <VatRateField
              {...field}
              label={t(`common.enum.vat_rate_type.${VatRateType.Rate}`)}
              error={!!errors.activeSubjectVR}
              helperText={errors.activeSubjectVR?.message}
              readonly={readonly}
              required
              vatRateType={VatRateType.Rate}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="activeExemptVR"
          control={control}
          render={({ field }) => (
            <VatRateField
              {...field}
              label={t(`common.enum.vat_rate_type.${VatRateType.Exempt}`)}
              error={!!errors.activeExemptVR}
              helperText={errors.activeExemptVR?.message}
              readonly={readonly}
              required
              vatRateType={VatRateType.Exempt}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="activeNonTaxableVR"
          control={control}
          render={({ field }) => (
            <VatRateField
              {...field}
              label={t(`common.enum.vat_rate_type.${VatRateType.NonTaxable}`)}
              error={!!errors.activeNonTaxableVR}
              helperText={errors.activeNonTaxableVR?.message}
              readonly={readonly}
              required
              vatRateType={VatRateType.NonTaxable}
            />
          )}
        />
      </Grid2>
      <SectionTitle value="bill_item_type.section_title.passive_contracts" />
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="passiveSubjectVR"
          control={control}
          render={({ field }) => (
            <VatRateField
              {...field}
              label={t(`common.enum.vat_rate_type.${VatRateType.Rate}`)}
              error={!!errors.passiveSubjectVR}
              helperText={errors.passiveSubjectVR?.message}
              readonly={readonly}
              required
              vatRateType={VatRateType.Rate}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="passiveExemptVR"
          control={control}
          render={({ field }) => (
            <VatRateField
              {...field}
              label={t(`common.enum.vat_rate_type.${VatRateType.Exempt}`)}
              error={!!errors.passiveExemptVR}
              helperText={errors.passiveExemptVR?.message}
              readonly={readonly}
              required
              vatRateType={VatRateType.Exempt}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="passiveNonTaxableVR"
          control={control}
          render={({ field }) => (
            <VatRateField
              {...field}
              label={t(`common.enum.vat_rate_type.${VatRateType.NonTaxable}`)}
              error={!!errors.passiveNonTaxableVR}
              helperText={errors.passiveNonTaxableVR?.message}
              readonly={readonly}
              required
              vatRateType={VatRateType.NonTaxable}
            />
          )}
        />
      </Grid2>
      <SectionTitle value="bill_item_type.section_title.administration" />
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="administrationVatRateType"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              onChange={handleAdministrationVatRateTypeChange(field.onChange)}
              label={t('bill_item_type.field.vat_rate_type')}
              options={Object.values(VatRateType)}
              getOptionLabel={(option) => t(`common.enum.vat_rate_type.${option}`)}
              error={!!errors.administrationVatRateType}
              helperText={errors.administrationVatRateType?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="administrationVR"
          control={control}
          render={({ field }) => (
            <VatRateField
              {...field}
              label={t('bill_item_type.field.vat_rate')}
              error={!!errors.administrationVR}
              helperText={errors.administrationVR?.message}
              readonly={readonly}
              required
              vatRateType={administrationVatRateType}
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
