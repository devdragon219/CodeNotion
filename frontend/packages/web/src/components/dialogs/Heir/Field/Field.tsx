import { Grid2 } from '@mui/material';
import { DateField } from '@realgimm5/frontend-common/components';
import { SubjectRelationType } from '@realgimm5/frontend-common/gql/types';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { SubjectField } from '../../../core/Fields/Subject/Subject';
import { HeirFieldProps } from './Field.types';

export const HeirField = ({
  control,
  errors,
  index,
  owningManagementSubjectIds,
  selectedHeirs,
  subjectId,
}: HeirFieldProps) => {
  const { t } = useTranslation();

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name={`heirs.${index}.heir`}
          control={control}
          render={({ field }) => (
            <SubjectField
              {...field}
              label={t('subject.field.heir_name')}
              error={!!errors.heirs?.[index]?.heir}
              helperText={errors.heirs?.[index]?.heir?.message}
              required
              where={{
                categories: {
                  some: {
                    function: {
                      eq: {
                        isHeir: true,
                      },
                    },
                  },
                },
                id: {
                  nin: [
                    ...selectedHeirs.filter(({ heir }) => !!heir).map(({ heir }) => heir!.id),
                    ...(subjectId ? [subjectId] : []),
                  ],
                },
                relationSubordinates: {
                  some: {
                    main: {
                      id: {
                        in: owningManagementSubjectIds,
                      },
                    },
                    relationType: {
                      eq: SubjectRelationType.ManagementEntityOwned,
                    },
                  },
                },
              }}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name={`heirs.${index}.since`}
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('subject.field.officer_since')}
              error={!!errors.heirs?.[index]?.since}
              helperText={errors.heirs?.[index]?.since?.message}
              required
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
