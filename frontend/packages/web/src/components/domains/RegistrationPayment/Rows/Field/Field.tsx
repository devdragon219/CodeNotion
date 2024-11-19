import { Grid2 } from '@mui/material';
import { CurrencyField, TextField } from '@realgimm5/frontend-common/components';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { RegistrationPaymentRowFieldProps } from './Field.types';

export const RegistrationPaymentRowField = ({ control, errors, index }: RegistrationPaymentRowFieldProps) => {
  const { t } = useTranslation();

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name={`rows.${index}.paymentRowReceivingEntity`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('registration_payment.field.row_entity')}
              error={!!errors.rows?.[index]?.paymentRowReceivingEntity}
              helperText={errors.rows?.[index]?.paymentRowReceivingEntity?.message}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name={`rows.${index}.paymentRowCode`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('registration_payment.field.row_code')}
              error={!!errors.rows?.[index]?.paymentRowCode}
              helperText={errors.rows?.[index]?.paymentRowCode?.message}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name={`rows.${index}.paymentRowSection`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('registration_payment.field.row_description')}
              error={!!errors.rows?.[index]?.paymentRowSection}
              helperText={errors.rows?.[index]?.paymentRowSection?.message}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 3 }}>
        <Controller
          name={`rows.${index}.referencePeriod`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              maxLength={4}
              label={t('registration_payment.field.row_period')}
              error={!!errors.rows?.[index]?.referencePeriod}
              helperText={errors.rows?.[index]?.referencePeriod?.message}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 3 }}>
        <Controller
          name={`rows.${index}.referenceYear`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              maxLength={4}
              label={t('registration_payment.field.row_year')}
              error={!!errors.rows?.[index]?.referenceYear}
              helperText={errors.rows?.[index]?.referenceYear?.message}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 3 }}>
        <Controller
          name={`rows.${index}.amountDue`}
          control={control}
          render={({ field }) => (
            <CurrencyField
              {...field}
              label={t('registration_payment.field.row_amount_due')}
              error={!!errors.rows?.[index]?.amountDue}
              helperText={errors.rows?.[index]?.amountDue?.message}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 3 }}>
        <Controller
          name={`rows.${index}.amountCleared`}
          control={control}
          render={({ field }) => (
            <CurrencyField
              {...field}
              label={t('registration_payment.field.row_amount_cleared')}
              error={!!errors.rows?.[index]?.amountCleared}
              helperText={errors.rows?.[index]?.amountCleared?.message}
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
