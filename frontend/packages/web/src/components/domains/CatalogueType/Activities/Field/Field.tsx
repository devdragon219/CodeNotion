import { Grid2 } from '@mui/material';
import { CheckboxField, SelectField, TextField } from '@realgimm5/frontend-common/components';
import { CatalogueTypeActivityType } from '@realgimm5/frontend-common/gql/types';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ActivityFieldProps } from './Field.types';

export const ActivityField = ({ control, errors, index, readonly }: ActivityFieldProps) => {
  const { t } = useTranslation();

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name={`activities.${index}.activityType`}
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('catalogue_type.field.activity_type')}
              options={Object.values(CatalogueTypeActivityType)}
              getOptionLabel={(option) => t(`common.enum.catalogue_type_activity_type.${option}`)}
              error={!!errors.activities?.[index]?.activityType}
              helperText={errors.activities?.[index]?.activityType?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name={`activities.${index}.name`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('catalogue_type.field.activity_name')}
              error={!!errors.activities?.[index]?.name}
              helperText={errors.activities?.[index]?.name?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name={`activities.${index}.isMandatoryByLaw`}
          control={control}
          render={({ field }) => (
            <CheckboxField
              {...field}
              label={t('catalogue_type.field.activity_mandatory_by_law')}
              error={!!errors.activities?.[index]?.isMandatoryByLaw}
              helperText={errors.activities?.[index]?.isMandatoryByLaw?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
