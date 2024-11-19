import { Grid2 } from '@mui/material';
import { DateField, SectionTitle, TextField } from '@realgimm5/frontend-common/components';
import { useCallback } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { SubjectFieldValue } from '../../../../interfaces/FieldValues/Subject';
import { SubjectField } from '../../../core/Fields/Subject/Subject';
import { UserField } from '../../../core/Fields/User/User';
import { WorkTeamGeneralDataProps } from './GeneralData.types';

export const WorkTeamGeneralData = ({ control, errors, readonly, setValue }: WorkTeamGeneralDataProps) => {
  const { t } = useTranslation();
  const providerSubject = useWatch({ control, name: 'providerSubject' });

  const handleProviderSubjectChange = useCallback(
    (onChange: (value: SubjectFieldValue | null) => void) => (value: SubjectFieldValue | null) => {
      onChange(value);

      setValue('leaderUser', null);
    },
    [setValue],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <SectionTitle value="work_team.section_title.general_data" />
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="internalCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('work_team.field.internal_code')}
              error={!!errors.internalCode}
              helperText={errors.internalCode?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('work_team.field.description')}
              error={!!errors.description}
              helperText={errors.description?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="providerSubject"
          control={control}
          render={({ field }) => (
            <SubjectField
              {...field}
              onChange={handleProviderSubjectChange(field.onChange)}
              label={t('work_team.field.provider_subject')}
              error={!!errors.providerSubject}
              helperText={errors.providerSubject?.message}
              readonly={readonly}
              required
              where={{
                categories: {
                  some: {
                    function: {
                      eq: {
                        isSupplier: true,
                      },
                    },
                  },
                },
              }}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="leaderUser"
          control={control}
          render={({ field }) => (
            <UserField
              {...field}
              label={t('work_team.field.leader_user')}
              error={!!errors.leaderUser}
              helperText={errors.leaderUser?.message}
              disabled={!providerSubject}
              readonly={readonly}
              required
              where={{
                supplierSubjectId: {
                  eq: providerSubject?.id,
                },
              }}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="insertionDate"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('work_team.field.insertion_date')}
              error={!!errors.insertionDate}
              helperText={errors.insertionDate?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
