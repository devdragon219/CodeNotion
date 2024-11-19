import { Grid2 } from '@mui/material';
import { CheckboxField, CurrencyField, DateField, SelectField } from '@realgimm5/frontend-common/components';
import { useMemo } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { RatePlanStatus } from '../../../../../enums/RatePlanStatus';
import { getRatePlanStatus } from '../../../../../utils/contract/getRatePlanStatus';
import { RatePlanFieldProps } from './Field.types';

export const RatePlanField = ({ control, errors }: RatePlanFieldProps) => {
  const { t } = useTranslation();
  const isDeclarationExpected = useWatch({ control, name: 'isDeclarationExpected' });
  const isDeclared = useWatch({ control, name: 'isDeclared' });
  const status = useMemo(
    () => getRatePlanStatus(isDeclarationExpected, isDeclared),
    [isDeclarationExpected, isDeclared],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="since"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('contract.field.rate_plan_since')}
              error={!!errors.since}
              helperText={errors.since?.message}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="newYearlyRate"
          control={control}
          render={({ field }) => (
            <CurrencyField
              {...field}
              label={t('contract.field.rate_plan_yearly_rate')}
              error={!!errors.newYearlyRate}
              helperText={errors.newYearlyRate?.message}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="isDeclarationExpected"
          control={control}
          render={({ field }) => (
            <CheckboxField
              {...field}
              label={t('contract.field.rate_plan_declaration_expected')}
              error={!!errors.isDeclarationExpected}
              helperText={errors.isDeclarationExpected?.message}
              disabled={isDeclared}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <SelectField
          label={t('contract.field.rate_plan_status')}
          value={status}
          options={Object.values(RatePlanStatus)}
          getOptionLabel={(option) => t(`core.enum.rate_plan_status.${option}`)}
          error={!!errors.isDeclarationExpected}
          helperText={errors.isDeclarationExpected?.message}
          disabled
        />
      </Grid2>
    </Grid2>
  );
};
