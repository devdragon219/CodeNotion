import { Grid2 } from '@mui/material';
import { CurrencyField, DateField } from '@realgimm5/frontend-common/components';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { BillItemTypeField } from '../../../../core/Fields/BillItemType/BillItemType';
import { VatRateField } from '../../../../core/Fields/VatRate/VatRate';
import { BillRowFieldProps } from './Field.types';

export const BillRowField = ({ control, errors, index }: BillRowFieldProps) => {
  const { t } = useTranslation();

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <Grid2 size={12}>
        <Controller
          name={`billRows.${index}.billItemType`}
          control={control}
          render={({ field }) => (
            <BillItemTypeField
              {...field}
              label={t('bill.field.bill_row_item_type')}
              error={!!errors.billRows?.[index]?.billItemType}
              helperText={errors.billRows?.[index]?.billItemType?.message}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name={`billRows.${index}.since`}
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('bill.field.bill_row_since')}
              error={!!errors.billRows?.[index]?.since}
              helperText={errors.billRows?.[index]?.since?.message}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name={`billRows.${index}.until`}
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('bill.field.bill_row_until')}
              error={!!errors.billRows?.[index]?.until}
              helperText={errors.billRows?.[index]?.until?.message}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name={`billRows.${index}.amount`}
          control={control}
          render={({ field }) => (
            <CurrencyField
              {...field}
              label={t(`bill.field.bill_row_amount`)}
              error={!!errors.billRows?.[index]?.amount}
              helperText={errors.billRows?.[index]?.amount?.message}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name={`billRows.${index}.vatRate`}
          control={control}
          render={({ field }) => (
            <VatRateField
              {...field}
              label={t('bill.field.bill_row_vat_code')}
              error={!!errors.billRows?.[index]?.vatRate}
              helperText={errors.billRows?.[index]?.vatRate?.message}
              required
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
