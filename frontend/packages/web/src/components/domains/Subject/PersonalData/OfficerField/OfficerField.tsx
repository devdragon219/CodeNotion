import { Grid2 } from '@mui/material';
import { DateField, SelectField } from '@realgimm5/frontend-common/components';
import { OfficerType } from '@realgimm5/frontend-common/gql/types';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { SubjectField } from '../../../../core/Fields/Subject/Subject';
import { OfficerFieldProps } from './OfficerField.types';

export const OfficerField = ({
  control,
  errors,
  index,
  required,
  selectedOfficers,
  useOfficerType,
}: OfficerFieldProps) => {
  const { t } = useTranslation();

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {useOfficerType && (
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Controller
            name={`officers.${index}.officerType`}
            control={control}
            render={({ field }) => (
              <SelectField
                {...field}
                label={t('subject.field.officer_type')}
                options={Object.values(OfficerType)}
                getOptionLabel={(type) => t(`common.enum.officer_type.${type}`)}
                error={!!errors.officers?.[index]?.officerType}
                helperText={errors.officers?.[index]?.officerType?.message}
                required
              />
            )}
          />
        </Grid2>
      )}
      <Grid2 size={{ xs: 12, sm: useOfficerType ? 6 : 12 }}>
        <Controller
          name={`officers.${index}.officer`}
          control={control}
          render={({ field }) => (
            <SubjectField
              {...field}
              label={t('subject.field.officer_name')}
              error={!!errors.officers?.[index]?.officer}
              helperText={errors.officers?.[index]?.officer?.message}
              required
              where={{
                categories: {
                  some: {
                    function: {
                      eq: {
                        isOfficer: true,
                      },
                    },
                  },
                },
                and: selectedOfficers
                  .filter(({ officer }) => !!officer)
                  .map(({ officer }) => ({
                    id: {
                      neq: officer!.id,
                    },
                  })),
              }}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name={`officers.${index}.since`}
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('subject.field.officer_since')}
              error={!!errors.officers?.[index]?.since}
              helperText={errors.officers?.[index]?.since?.message}
              required={required}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name={`officers.${index}.until`}
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('subject.field.officer_until')}
              error={!!errors.officers?.[index]?.until}
              helperText={errors.officers?.[index]?.until?.message}
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
