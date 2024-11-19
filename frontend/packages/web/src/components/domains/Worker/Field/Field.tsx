import { Grid2 } from '@mui/material';
import { DateField, TextField } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CraftField } from '../../../core/Fields/Craft/Craft';
import { QualificationLevelField } from '../../../core/Fields/QualificationLevel/QualificationLevel';
import { WorkerFieldProps } from './Field.types';

export const WorkerField = ({ control, errors, index, mode }: WorkerFieldProps) => {
  const { t } = useTranslation();

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name={`workers.${index}.firstName`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('component.worker.field.worker_first_name')}
              error={!!errors.workers?.[index]?.firstName}
              helperText={errors.workers?.[index]?.firstName?.message}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name={`workers.${index}.lastName`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('component.worker.field.worker_last_name')}
              error={!!errors.workers?.[index]?.lastName}
              helperText={errors.workers?.[index]?.lastName?.message}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: mode === FormMode.Create ? 4 : 3 }}>
        <Controller
          name={`workers.${index}.since`}
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('component.worker.field.worker_since')}
              error={!!errors.workers?.[index]?.since}
              helperText={errors.workers?.[index]?.since?.message}
              required
            />
          )}
        />
      </Grid2>
      {mode === FormMode.Edit && (
        <Grid2 size={{ xs: 12, sm: 3 }}>
          <Controller
            name={`workers.${index}.until`}
            control={control}
            render={({ field }) => (
              <DateField
                {...field}
                label={t('component.worker.field.worker_until')}
                error={!!errors.workers?.[index]?.until}
                helperText={errors.workers?.[index]?.until?.message}
              />
            )}
          />
        </Grid2>
      )}
      <Grid2 size={{ xs: 12, sm: mode === FormMode.Create ? 4 : 3 }}>
        <Controller
          name={`workers.${index}.craft`}
          control={control}
          render={({ field }) => (
            <CraftField
              {...field}
              label={t('component.worker.field.worker_craft')}
              error={!!errors.workers?.[index]?.craft}
              helperText={errors.workers?.[index]?.craft?.message}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: mode === FormMode.Create ? 4 : 3 }}>
        <Controller
          name={`workers.${index}.qualificationLevel`}
          control={control}
          render={({ field }) => (
            <QualificationLevelField
              {...field}
              label={t('component.worker.field.worker_level')}
              error={!!errors.workers?.[index]?.qualificationLevel}
              helperText={errors.workers?.[index]?.qualificationLevel?.message}
              required
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
