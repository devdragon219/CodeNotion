import { Grid2 } from '@mui/material';
import { CurrencyField, DateField, TextField } from '@realgimm5/frontend-common/components';
import { forwardRef, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { BillItemTypeFieldValue } from '../../../../../interfaces/FieldValues/BillIemType';
import { AdministrationTermInstallmentFormInput } from '../../../../../interfaces/FormInputs/AdministrationTermInstallment';
import { calcTaxAmounts } from '../../../../../utils/administrationTerm/calcTaxAmounts';
import { BillItemTypeField } from '../../../../core/Fields/BillItemType/BillItemType';
import { AdministrationTermInstallmentFieldProps } from './Field.types';

const AdministrationTermInstallmentField = forwardRef<HTMLDivElement, AdministrationTermInstallmentFieldProps>(
  ({ errors, onChange, value, readonly }, ref) => {
    const { t } = useTranslation();

    const handleChange = useCallback(
      (key: keyof AdministrationTermInstallmentFormInput) => (input?: unknown) => {
        onChange({ ...value, [key]: input });
      },
      [onChange, value],
    );

    const handleBillItemTypeChange = useCallback(
      (input: BillItemTypeFieldValue | null) => {
        onChange({ ...value, billItemType: input });
      },
      [onChange, value],
    );

    const { taxAmount, totalAmount } = useMemo(
      () => calcTaxAmounts(value.amount ?? 0, value.billItemType?.administrationVR?.ratePercent ?? 0),
      [value],
    );

    return (
      <Grid2 container spacing={{ xs: 2, sm: 3 }} ref={ref}>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TextField
            type="number"
            label={t('administration_term.field.installment_number')}
            value={value.installmentNumber}
            error={!!errors?.installmentNumber}
            helperText={errors?.installmentNumber?.message}
            readonly={readonly}
            disabled
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <BillItemTypeField
            label={t('administration_term.field.expense_reason')}
            onChange={handleBillItemTypeChange}
            error={!!errors?.billItemType}
            helperText={errors?.billItemType?.message}
            readonly={readonly}
            required
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 3 }}>
          <DateField
            label={t('administration_term.field.due_date')}
            value={value.dueDate}
            onChange={handleChange('dueDate')}
            error={!!errors?.dueDate}
            helperText={errors?.dueDate?.message}
            readonly={readonly}
            required
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 3 }}>
          <CurrencyField
            label={t('administration_term.field.taxable_amount')}
            value={value.amount}
            onChange={handleChange('amount')}
            error={!!errors?.amount}
            helperText={errors?.amount?.message}
            readonly={readonly}
            required
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 3 }}>
          <CurrencyField label={t('administration_term.field.tax')} value={taxAmount} disabled />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 3 }}>
          <CurrencyField label={t('administration_term.field.total_amount')} value={totalAmount} disabled />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <DateField
            label={t('administration_term.field.installment_since')}
            value={value.since}
            onChange={handleChange('since')}
            error={!!errors?.since}
            helperText={errors?.since?.message}
            readonly={readonly}
            required
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <DateField
            label={t('administration_term.field.installment_until')}
            value={value.until}
            onChange={handleChange('until')}
            error={!!errors?.until}
            helperText={errors?.until?.message}
            readonly={readonly}
            required
          />
        </Grid2>
        <Grid2 size={12}>
          <TextField
            label={t('administration_term.field.notes')}
            value={value.notes}
            onChange={handleChange('notes')}
            error={!!errors?.notes}
            helperText={errors?.notes?.message}
            readonly={readonly}
          />
        </Grid2>
      </Grid2>
    );
  },
);

AdministrationTermInstallmentField.displayName = 'AdministrationTermInstallmentField';
export { AdministrationTermInstallmentField };
