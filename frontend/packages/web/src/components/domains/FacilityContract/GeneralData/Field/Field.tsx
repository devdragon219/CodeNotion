import { Grid2 } from '@mui/material';
import { TextField } from '@realgimm5/frontend-common/components';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FrameworkAgreementFieldProps } from './Field.types';

export const FrameworkAgreementField = ({ control, errors, index, readonly }: FrameworkAgreementFieldProps) => {
  const { t } = useTranslation();

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name={`frameworkAgreements.${index}.externalCode`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('facility_contract.field.framework_agreement_code')}
              error={!!errors.frameworkAgreements?.[index]?.externalCode}
              helperText={errors.frameworkAgreements?.[index]?.externalCode?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name={`frameworkAgreements.${index}.notes`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('facility_contract.field.framework_agreement_notes')}
              error={!!errors.frameworkAgreements?.[index]?.notes}
              helperText={errors.frameworkAgreements?.[index]?.notes?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
