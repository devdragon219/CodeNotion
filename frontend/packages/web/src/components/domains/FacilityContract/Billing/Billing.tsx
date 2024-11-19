import { Grid2 } from '@mui/material';
import { CurrencyField, SectionTitle, SelectField, TextField } from '@realgimm5/frontend-common/components';
import { BillingPeriod, CostBaseFactor, EntryStatus } from '@realgimm5/frontend-common/gql/types';
import { useMemo } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FacilityContractBillingProps } from './Billing.types';

export const FacilityContractBilling = ({ control, errors, readonly }: FacilityContractBillingProps) => {
  const { t } = useTranslation();
  const entryStatus = useWatch({ control, name: 'entryStatus' });
  const ticketChecklists = useWatch({ control, name: 'ticketChecklists' });
  const vatPercentage = useWatch({ control, name: 'billing.vatPercentage' });
  const estimatedFeeWithoutVat = useMemo(
    () =>
      ticketChecklists.length !== 0
        ? ticketChecklists.reduce((acc, it) => {
            if (it.costBaseFactor === CostBaseFactor.Forfait) return acc + it.rawWorkCost;

            return acc + it.rawWorkCost * (it.estateUnit.netSurface ?? 0);
          }, 0)
        : null,
    [ticketChecklists],
  );
  const estimatedFeeWithVat = useMemo(() => {
    if (vatPercentage === null || estimatedFeeWithoutVat === null) return null;

    return estimatedFeeWithoutVat + estimatedFeeWithoutVat * (vatPercentage / 100);
  }, [estimatedFeeWithoutVat, vatPercentage]);
  const estimatedWorkSafetyFee = useMemo(
    () =>
      ticketChecklists.length !== 0
        ? ticketChecklists.reduce((acc, it) => {
            if (it.costBaseFactor === CostBaseFactor.Forfait) return acc + it.safetyCost;

            return acc + it.safetyCost * (it.estateUnit.netSurface ?? 0);
          }, 0)
        : null,
    [ticketChecklists],
  );
  const purchaseFeeWithoutVat = useWatch({ control, name: 'billing.purchaseFeeWithoutVat' });
  const purchaseFeeWithVat = useMemo(() => {
    if (vatPercentage === null || purchaseFeeWithoutVat === null) return null;

    return purchaseFeeWithoutVat + purchaseFeeWithoutVat * (vatPercentage / 100);
  }, [purchaseFeeWithoutVat, vatPercentage]);
  const fixedRateFee = useWatch({ control, name: 'billing.fixedRateFee' });
  const contractAmount = useMemo(() => {
    if (purchaseFeeWithoutVat === null || fixedRateFee === null) return null;

    return purchaseFeeWithoutVat + fixedRateFee;
  }, [fixedRateFee, purchaseFeeWithoutVat]);

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <SectionTitle value="facility_contract.section_title.billing" />
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="billing.billingPeriod"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              options={Object.values(BillingPeriod)}
              getOptionLabel={(option) => t(`common.enum.billing_period.${option}`)}
              label={t('facility_contract.field.billing_period')}
              error={!!errors.billing?.billingPeriod}
              helperText={errors.billing?.billingPeriod?.message}
              readonly={readonly}
              required={entryStatus !== EntryStatus.IncompleteDraft}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="billing.vatPercentage"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              maxLength={3}
              label={t('facility_contract.field.billing_vat_percentage')}
              error={!!errors.billing?.vatPercentage}
              helperText={errors.billing?.vatPercentage?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <CurrencyField
          value={estimatedFeeWithoutVat}
          label={t('facility_contract.field.billing_estimated_fee_without_vat')}
          readonly={readonly}
          disabled
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <CurrencyField
          value={estimatedFeeWithVat}
          label={t('facility_contract.field.billing_estimated_fee_with_vat')}
          readonly={readonly}
          disabled
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <CurrencyField
          value={estimatedWorkSafetyFee}
          label={t('facility_contract.field.billing_estimated_work_safety_fee')}
          readonly={readonly}
          disabled
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="billing.purchaseFeeWithoutVat"
          control={control}
          render={({ field }) => (
            <CurrencyField
              {...field}
              label={t('facility_contract.field.billing_purchase_fee_without_vat')}
              error={!!errors.billing?.purchaseFeeWithoutVat}
              helperText={errors.billing?.purchaseFeeWithoutVat?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <CurrencyField
          value={purchaseFeeWithVat}
          label={t('facility_contract.field.billing_purchase_fee_with_vat')}
          readonly={readonly}
          disabled
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="billing.fixedRateFee"
          control={control}
          render={({ field }) => (
            <CurrencyField
              {...field}
              label={t('facility_contract.field.billing_fixed_rate_fee')}
              error={!!errors.billing?.fixedRateFee}
              helperText={errors.billing?.fixedRateFee?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <CurrencyField
          value={contractAmount}
          label={t('facility_contract.field.billing_contract_amount')}
          readonly={readonly}
          disabled
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="billing.discountPercentage"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              maxLength={3}
              label={t('facility_contract.field.billing_discount_percentage')}
              error={!!errors.billing?.discountPercentage}
              helperText={errors.billing?.discountPercentage?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
