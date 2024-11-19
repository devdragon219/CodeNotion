import { Grid2 } from '@mui/material';
import { DateField, SelectField } from '@realgimm5/frontend-common/components';
import { useMemo } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { InputFieldProps } from './Field.types';

export const InputField = ({ control, errors, index }: InputFieldProps) => {
  const { t } = useTranslation();
  const managementSubject = useWatch({ control, name: `inputs.${index}.managementSubject` });
  const officers = useMemo(
    () =>
      managementSubject.officers.map(({ subordinate }) => ({
        id: subordinate.id,
        name: subordinate.name,
      })),
    [managementSubject.officers],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name={`inputs.${index}.date`}
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('registry_communication.field.date')}
              error={!!errors.inputs?.[index]?.date}
              helperText={errors.inputs?.[index]?.date?.message}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name={`inputs.${index}.requestingSubjectLegalRepresentative`}
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('registry_communication.field.legal_representative')}
              options={officers}
              getOptionLabel={(option) => option.name}
              getOptionKey={(option) => String(option.id)}
              error={!!errors.inputs?.[index]?.requestingSubjectLegalRepresentative}
              helperText={errors.inputs?.[index]?.requestingSubjectLegalRepresentative?.message}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name={`inputs.${index}.debtBankAccount`}
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('registry_communication.field.bank_account')}
              options={managementSubject.bankAccounts}
              getOptionLabel={(option) => String(option.referenceCode)}
              getOptionKey={(option) => String(option.id)}
              error={!!errors.inputs?.[index]?.debtBankAccount}
              helperText={errors.inputs?.[index]?.debtBankAccount?.message}
              required
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
