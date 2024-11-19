import { Grid2 } from '@mui/material';
import { CheckboxField, CurrencyField, DateField, TextField } from '@realgimm5/frontend-common/components';
import { useMemo } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AccountingItemField } from '../../../../core/Fields/AccountingItem/AccountingItem';
import { BillItemTypeField } from '../../../../core/Fields/BillItemType/BillItemType';
import { VatRateField } from '../../../../core/Fields/VatRate/VatRate';
import { OneshotAdditionFieldProps } from './Field.types';

export const OneshotAdditionField = ({ control, errors }: OneshotAdditionFieldProps) => {
  const { t } = useTranslation();
  const amount = useWatch({ control, name: 'amount' });
  const installments = useWatch({ control, name: 'installments' });

  const amountPerInstallment = useMemo(
    () => (amount && installments ? amount / installments : null),
    [amount, installments],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="billItemType"
          control={control}
          render={({ field }) => (
            <BillItemTypeField
              {...field}
              label={t('contract.field.recurring_addition_bill_item')}
              error={!!errors.billItemType}
              helperText={errors.billItemType?.message}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('contract.field.oneshot_addition_start_date')}
              error={!!errors.startDate}
              helperText={errors.startDate?.message}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="accountingItem"
          control={control}
          render={({ field }) => (
            <AccountingItemField
              {...field}
              label={t('contract.field.oneshot_addition_accounting_item')}
              error={!!errors.accountingItem}
              helperText={errors.accountingItem?.message}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="vatRate"
          control={control}
          render={({ field }) => (
            <VatRateField
              {...field}
              label={t('contract.field.oneshot_addition_vat_rate')}
              error={!!errors.vatRate}
              helperText={errors.vatRate?.message}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="vatRate"
          control={control}
          render={({ field }) => (
            <TextField
              value={field.value?.ratePercent}
              label={t('contract.field.oneshot_addition_vat_rate_percent')}
              disabled
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="isRentalRateVariation"
          control={control}
          render={({ field }) => (
            <CheckboxField
              {...field}
              label={t('contract.field.oneshot_addition_rate_variation')}
              error={!!errors.isRentalRateVariation}
              helperText={errors.isRentalRateVariation?.message}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <CurrencyField
              {...field}
              label={t('contract.field.oneshot_addition_amount')}
              error={!!errors.amount}
              helperText={errors.amount?.message}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="installments"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label={t('contract.field.oneshot_addition_installments')}
              error={!!errors.installments}
              helperText={errors.installments?.message}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <CurrencyField
          value={amountPerInstallment}
          label={t('contract.field.oneshot_addition_amount_per_installment')}
          disabled
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="isBoundToTermDay"
          control={control}
          render={({ field }) => (
            <CheckboxField
              {...field}
              label={t('contract.field.oneshot_addition_bound_to_term_day')}
              error={!!errors.isBoundToTermDay}
              helperText={errors.isBoundToTermDay?.message}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="termStartDate"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('contract.field.oneshot_addition_term_start_date')}
              error={!!errors.termStartDate}
              helperText={errors.termStartDate?.message}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="termEndDate"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('contract.field.oneshot_addition_term_end_date')}
              error={!!errors.termEndDate}
              helperText={errors.termEndDate?.message}
            />
          )}
        />
      </Grid2>
      <Grid2 size={12}>
        <Controller
          name="notes"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              multiline
              label={t('contract.field.notes')}
              error={!!errors.notes}
              helperText={errors.notes?.message}
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
