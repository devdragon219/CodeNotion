import { Grid2 } from '@mui/material';
import { DateField, SecondaryTable, TextField } from '@realgimm5/frontend-common/components';
import { ParseKeys } from 'i18next';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CostChargeConsumptionFieldProps } from './Field.types';

export const CostChargeConsumptionField = ({
  control,
  errors,
  measurementUnit,
  type,
}: CostChargeConsumptionFieldProps) => {
  const { t } = useTranslation();
  const since = useWatch({ control, name: `consumptions.${type}.since` });
  const until = useWatch({ control, name: `consumptions.${type}.until` });
  const values = useWatch({ control, name: `consumptions.${type}.values` });

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name={`consumptions.${type}.since`}
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('cost_charge.field.since')}
              error={!!errors.consumptions?.[type]?.since}
              helperText={errors.consumptions?.[type]?.since?.message}
              required={until !== null}
              clearable
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name={`consumptions.${type}.until`}
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('cost_charge.field.until')}
              error={!!errors.consumptions?.[type]?.until}
              helperText={errors.consumptions?.[type]?.until?.message}
              required={since !== null}
              clearable
            />
          )}
        />
      </Grid2>
      <Grid2 size={12}>
        <SecondaryTable
          columns={[
            'cost_charge.field.reading',
            t('cost_charge.field.usage_value_with_unit', { measurementUnit }) as unknown as ParseKeys,
          ]}
          rows={values.map((_, index) => [
            t('cost_charge.field.reading_value', { index: index + 1 }),
            <Controller
              key={index}
              name={`consumptions.${type}.values.${index}.value`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  size="medium"
                  placeholder={t('cost_charge.field.usage_value_with_unit', { measurementUnit })}
                  error={!!errors.consumptions?.[type]?.values?.[index]?.value}
                  helperText={errors.consumptions?.[type]?.values?.[index]?.value?.message}
                  required={since !== null || until !== null}
                />
              )}
            />,
          ])}
          sx={{ tableLayout: 'fixed' }}
        />
      </Grid2>
    </Grid2>
  );
};
