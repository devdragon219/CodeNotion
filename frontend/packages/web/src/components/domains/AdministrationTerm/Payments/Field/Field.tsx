import { Grid2 } from '@mui/material';
import { CurrencyField, DateField, TextField } from '@realgimm5/frontend-common/components';
import { forwardRef, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { AdministrationTermPaymentFormInput } from '../../../../../interfaces/FormInputs/AdministrationTermPayment';
import { calcGroupedInstallmentsTaxAmounts } from '../../../../../utils/administrationTerm/calcTaxAmounts';
import { getGroupedInstallmentsExpenseReasons } from '../../../../../utils/administrationTerm/getGroupedInstallmentsExpenseReasons';
import { AdministrationTermPaymentFieldProps } from './Field.types';
import { AdministrationTermPaymentInstallmentsField } from './InstallmentsField/InstallmentsField';

const AdministrationTermPaymentField = forwardRef<HTMLDivElement, AdministrationTermPaymentFieldProps>(
  ({ errors, readonly, value, onChange, installments, existingPayments }, ref) => {
    const { t } = useTranslation();

    const handleChange = useCallback(
      (key: keyof AdministrationTermPaymentFormInput) => (input?: unknown) => {
        onChange({ ...value, [key]: input });
      },
      [onChange, value],
    );

    const expenseReasonValue = useMemo(
      () => getGroupedInstallmentsExpenseReasons(value.installments, installments),
      [installments, value.installments],
    );

    const { taxableAmount, taxAmount, totalAmount } = useMemo(
      () => calcGroupedInstallmentsTaxAmounts(value.installments, installments),
      [installments, value.installments],
    );

    return (
      <Grid2 container spacing={{ xs: 2, sm: 3 }} ref={ref}>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <AdministrationTermPaymentInstallmentsField
            errors={errors}
            value={value}
            onChange={handleChange('installments')}
            readonly={readonly}
            installments={installments}
            existingPayments={existingPayments}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TextField label={t('administration_term.field.expense_reason')} value={expenseReasonValue} disabled />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 3 }}>
          <DateField
            label={t('administration_term.field.payment_date')}
            value={value.paymentDate}
            onChange={handleChange('paymentDate')}
            error={!!errors?.paymentDate}
            helperText={errors?.paymentDate?.message}
            readonly={readonly}
            required
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 3 }}>
          <CurrencyField label={t('administration_term.field.taxable_amount')} value={taxableAmount} disabled />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 3 }}>
          <CurrencyField label={t('administration_term.field.tax')} value={taxAmount} disabled />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 3 }}>
          <CurrencyField label={t('administration_term.field.total_amount')} value={totalAmount} disabled />
        </Grid2>
      </Grid2>
    );
  },
);

AdministrationTermPaymentField.displayName = 'AdministrationTermPaymentField';
export { AdministrationTermPaymentField };
