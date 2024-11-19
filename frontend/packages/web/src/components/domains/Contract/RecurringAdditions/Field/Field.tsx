import { Grid2 } from '@mui/material';
import { CurrencyField, SelectField, TextField } from '@realgimm5/frontend-common/components';
import { Month } from '@realgimm5/frontend-common/enums';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AccountingItemField } from '../../../../core/Fields/AccountingItem/AccountingItem';
import { BillItemTypeField } from '../../../../core/Fields/BillItemType/BillItemType';
import { VatRateField } from '../../../../core/Fields/VatRate/VatRate';
import { RecurringAdditionFieldProps } from './Field.types';

export const RecurringAdditionField = ({ control, errors }: RecurringAdditionFieldProps) => {
  const { t } = useTranslation();

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <Grid2 size={{ xs: 12, sm: 6 }}>
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
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="amountPerInstallment"
          control={control}
          render={({ field }) => (
            <CurrencyField
              {...field}
              label={t('contract.field.recurring_addition_amount_per_installment')}
              error={!!errors.amountPerInstallment}
              helperText={errors.amountPerInstallment?.message}
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
              label={t('contract.field.recurring_addition_vat_rate')}
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
              label={t('contract.field.recurring_addition_vat_rate_percent')}
              disabled
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
              label={t('contract.field.recurring_addition_accounting_item')}
              error={!!errors.accountingItem}
              helperText={errors.accountingItem?.message}
              required
            />
          )}
        />{' '}
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="excludeStartMonth"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('contract.field.recurring_addition_exclude_start_month')}
              options={Object.values(Month)}
              useSortedOptions={false}
              getOptionLabel={(option) => t(`common.enum.month.${option}`)}
              error={!!errors.excludeStartMonth}
              helperText={errors.excludeStartMonth?.message}
              clearable
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="excludeEndMonth"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('contract.field.recurring_addition_exclude_end_month')}
              options={Object.values(Month)}
              useSortedOptions={false}
              getOptionLabel={(option) => t(`common.enum.month.${option}`)}
              error={!!errors.excludeEndMonth}
              helperText={errors.excludeEndMonth?.message}
              clearable
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
