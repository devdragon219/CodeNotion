import { Grid2 } from '@mui/material';
import { CurrencyField, DateField, SectionTitle, TextField } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { RegistrationPaymentGeneralDataProps } from './GeneralData.types';

export const RegistrationPaymentGeneralData = ({
  control,
  errors,
  mode,
  readonly,
}: RegistrationPaymentGeneralDataProps) => {
  const { t } = useTranslation();

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <SectionTitle
        value={`registration_payment.section_title.${mode === FormMode.Create ? 'general_data' : 'communication_data'}`}
      />
      <Grid2 size={{ xs: 12, sm: mode === FormMode.Create ? 4 : 3 }}>
        <Controller
          name="paymentCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('registration_payment.field.payment_code')}
              error={!!errors.paymentCode}
              helperText={errors.paymentCode?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      {mode === FormMode.Edit && (
        <Grid2 size={{ xs: 12, sm: 3 }}>
          <Controller
            name="contract.managementSubjectName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={t('registration_payment.field.management_subject')}
                error={!!errors.contract?.managementSubjectName}
                helperText={errors.contract?.managementSubjectName?.message}
                readonly
              />
            )}
          />
        </Grid2>
      )}
      <Grid2 size={{ xs: 12, sm: mode === FormMode.Create ? 4 : 3 }}>
        <Controller
          name="valueDate"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('registration_payment.field.payment_date')}
              error={!!errors.valueDate}
              helperText={errors.valueDate?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: mode === FormMode.Create ? 4 : 3 }}>
        <Controller
          name="paymentYear"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              maxLength={4}
              label={t('registration_payment.field.payment_year')}
              error={!!errors.paymentYear}
              helperText={errors.paymentYear?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="taxAmount"
          control={control}
          render={({ field }) => (
            <CurrencyField
              {...field}
              label={t('registration_payment.field.tax_amount')}
              error={!!errors.taxAmount}
              helperText={errors.taxAmount?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="sanctionAmount"
          control={control}
          render={({ field }) => (
            <CurrencyField
              {...field}
              label={t('registration_payment.field.sanction_amount')}
              error={!!errors.sanctionAmount}
              helperText={errors.sanctionAmount?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
