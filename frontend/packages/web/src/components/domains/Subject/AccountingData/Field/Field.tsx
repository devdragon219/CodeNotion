import { Grid2 } from '@mui/material';
import { TextField } from '@realgimm5/frontend-common/components';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { BankAccountFieldProps } from './Field.types';

export const BankAccountField = ({ control, errors, index, required }: BankAccountFieldProps) => {
  const { t } = useTranslation();

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name={`bankAccounts.${index}.referenceCode`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('subject.field.bank_account_number')}
              error={!!errors.bankAccounts?.[index]?.referenceCode}
              helperText={errors.bankAccounts?.[index]?.referenceCode?.message}
              required={required}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name={`bankAccounts.${index}.accountHolder`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('subject.field.bank_account_holder')}
              error={!!errors.bankAccounts?.[index]?.accountHolder}
              helperText={errors.bankAccounts?.[index]?.accountHolder?.message}
              required={required}
            />
          )}
        />
      </Grid2>
      <Grid2 size={12}>
        <Controller
          name={`bankAccounts.${index}.notes`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('subject.field.bank_account_notes')}
              error={!!errors.bankAccounts?.[index]?.notes}
              helperText={errors.bankAccounts?.[index]?.notes?.message}
              multiline
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
