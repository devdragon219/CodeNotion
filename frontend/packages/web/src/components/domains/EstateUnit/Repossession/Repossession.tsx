import { Grid2 } from '@mui/material';
import { CheckboxField, DateField, SelectField, TextField } from '@realgimm5/frontend-common/components';
import { RepossessionReason, RepossessionType, UnitCondition } from '@realgimm5/frontend-common/gql/types';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EstateUnitRepossessionProps } from './Repossession.types';

export const EstateUnitRepossession = ({ control, errors, readonly }: EstateUnitRepossessionProps) => {
  const { t } = useTranslation();

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="repossession.eventType"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('estate_unit.field.repossession_type')}
              options={Object.values(RepossessionType)}
              getOptionLabel={(option) => t(`common.enum.repossession_type.${option}`)}
              error={!!errors.repossession?.eventType}
              helperText={errors.repossession?.eventType?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="repossession.eventReason"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('estate_unit.field.repossession_reason')}
              options={Object.values(RepossessionReason)}
              getOptionLabel={(option) => t(`common.enum.repossession_reason.${option}`)}
              error={!!errors.repossession?.eventReason}
              helperText={errors.repossession?.eventReason?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="repossession.eventDate"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('estate_unit.field.repossession_date')}
              error={!!errors.repossession?.eventDate}
              helperText={errors.repossession?.eventDate?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="repossession.unitStatus"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('estate_unit.field.repossession_status')}
              options={Object.values(UnitCondition)}
              getOptionLabel={(option) => t(`common.enum.unit_condition.${option}`)}
              error={!!errors.repossession?.unitStatus}
              helperText={errors.repossession?.unitStatus?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="repossession.isAssignable"
          control={control}
          render={({ field }) => (
            <CheckboxField
              {...field}
              label={t('estate_unit.field.repossession_assignable')}
              error={!!errors.repossession?.isAssignable}
              helperText={errors.repossession?.isAssignable?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="repossession.isKeysReturned"
          control={control}
          render={({ field }) => (
            <CheckboxField
              {...field}
              label={t('estate_unit.field.repossession_keys_returned')}
              error={!!errors.repossession?.isKeysReturned}
              helperText={errors.repossession?.isKeysReturned?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="repossession.isWithValuables"
          control={control}
          render={({ field }) => (
            <CheckboxField
              {...field}
              label={t('estate_unit.field.repossession_with_values')}
              error={!!errors.repossession?.isWithValuables}
              helperText={errors.repossession?.isWithValuables?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={12}>
        <Controller
          name="repossession.notes"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              multiline
              label={t('estate_unit.field.notes')}
              error={!!errors.repossession?.notes}
              helperText={errors.repossession?.notes?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
