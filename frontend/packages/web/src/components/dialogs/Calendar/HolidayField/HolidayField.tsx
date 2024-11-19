import { Grid2 } from '@mui/material';
import { DateField, SelectField, TextField } from '@realgimm5/frontend-common/components';
import { HolidayPeriodicity } from '@realgimm5/frontend-common/gql/types';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { HolidayFieldProps } from './HolidayField.types';

export const HolidayField = ({ control, errors, index, readonly }: HolidayFieldProps) => {
  const { t } = useTranslation();

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name={`holidays.${index}.name`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('calendar.field.holiday_name')}
              error={!!errors.holidays?.[index]?.name}
              helperText={errors.holidays?.[index]?.name?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name={`holidays.${index}.date`}
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('calendar.field.holiday_date')}
              error={!!errors.holidays?.[index]?.date}
              helperText={errors.holidays?.[index]?.date?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name={`holidays.${index}.periodicity`}
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              options={Object.values(HolidayPeriodicity)}
              getOptionLabel={(option) => t(`common.enum.holiday_periodicity.${option}`)}
              label={t('calendar.field.holiday_periodicity')}
              error={!!errors.holidays?.[index]?.periodicity}
              helperText={errors.holidays?.[index]?.periodicity?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
