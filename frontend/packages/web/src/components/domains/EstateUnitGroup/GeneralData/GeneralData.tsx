import { Grid2 } from '@mui/material';
import { SectionTitle, TextField } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { PersonType } from '@realgimm5/frontend-common/gql/types';
import { useCallback } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { SubjectFieldValue } from '../../../../interfaces/FieldValues/Subject';
import { SubjectField } from '../../../core/Fields/Subject/Subject';
import { EstateUnitGroupGeneralDataProps } from './GeneralData.types';

export const EstateUnitGroupGeneralData = ({
  control,
  errors,
  mode,
  readonly,
  setValue,
}: EstateUnitGroupGeneralDataProps) => {
  const { t } = useTranslation();

  const handleManagementSubjectChange = useCallback(
    (onChange: (value: SubjectFieldValue | null) => void) => (value: SubjectFieldValue | null) => {
      onChange(value);

      setValue('estateUnits', []);
    },
    [setValue],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <SectionTitle value="estate_unit_group.section_title.general_data" />
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="internalCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('estate_unit_group.field.internal_code')}
              error={!!errors.internalCode}
              helperText={errors.internalCode?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('estate_unit_group.field.name')}
              error={!!errors.name}
              helperText={errors.name?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="managementSubject"
          control={control}
          render={({ field }) => (
            <SubjectField
              {...field}
              onChange={handleManagementSubjectChange(field.onChange)}
              label={t('estate_unit_group.field.management_subject')}
              error={!!errors.managementSubject}
              helperText={errors.managementSubject?.message}
              readonly={readonly}
              disabled={mode === FormMode.Edit}
              required
              where={{
                personType: {
                  eq: PersonType.ManagementSubject,
                },
              }}
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
