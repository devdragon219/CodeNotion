import { Grid2 } from '@mui/material';
import { CheckboxField, DateField, SectionTitle, SelectField } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { TakeoverType } from '@realgimm5/frontend-common/gql/types';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ContractRegistrationTaxTakeoverProps } from './Takeover.types';
import { TakeoverSubjectsField } from './TakeoverSubjectsField/TakeoverSubjectsField';

export const ContractRegistrationTaxTakeover = ({
  control,
  errors,
  mode,
  readonly,
}: ContractRegistrationTaxTakeoverProps) => {
  const { t } = useTranslation();
  const managementSubject = useWatch({ control, name: 'managementSubject' });

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }} sx={{ height: '100%' }}>
      {mode === FormMode.Create && <SectionTitle value="contract.section_title.registration_tax" />}
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="registrationTax.isRegistrationTaxApplied"
          control={control}
          render={({ field }) => (
            <CheckboxField
              {...field}
              label={t('contract.field.registration_tax_applied')}
              error={!!errors.registrationTax?.isRegistrationTaxApplied}
              helperText={errors.registrationTax?.isRegistrationTaxApplied?.message}
              readonly={readonly}
              disabled
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 8 }}>
        <Controller
          name="registrationTax.isTakeoverFromPreviousSubject"
          control={control}
          render={({ field }) => (
            <CheckboxField
              {...field}
              label={t('contract.field.registration_tax_takeover_subject')}
              error={!!errors.registrationTax?.isTakeoverFromPreviousSubject}
              helperText={errors.registrationTax?.isTakeoverFromPreviousSubject?.message}
              readonly={readonly}
              disabled
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="registrationTax.takeoverDate"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('contract.field.registration_tax_takeover_date')}
              error={!!errors.registrationTax?.takeoverDate}
              helperText={errors.registrationTax?.takeoverDate?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="registrationTax.takeoverType"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('contract.field.registration_tax_takeover_type')}
              options={Object.values(TakeoverType)}
              getOptionLabel={(option) => t(`common.enum.takeover_type.${option}`)}
              error={!!errors.registrationTax?.takeoverType}
              helperText={errors.registrationTax?.takeoverType?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="registrationTax.takeoverLegalRepresentativeSubject"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('contract.field.registration_tax_takeover_subject')}
              options={managementSubject?.officers ?? []}
              getOptionKey={(option) => String(option.id)}
              getOptionLabel={(option) => option.name}
              error={!!errors.registrationTax?.takeoverLegalRepresentativeSubject}
              helperText={errors.registrationTax?.takeoverLegalRepresentativeSubject?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={12} sx={{ height: 'calc(100% - 188px)' }}>
        <TakeoverSubjectsField control={control} />
      </Grid2>
    </Grid2>
  );
};
