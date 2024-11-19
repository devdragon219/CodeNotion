import { Grid2 } from '@mui/material';
import { AutocompleteField, CheckboxField } from '@realgimm5/frontend-common/components';
import { CompanyGroup } from '@realgimm5/frontend-common/gql/types';
import { ChangeEvent, useCallback } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { SubjectType } from '../../../../../enums/SubjectType';
import { CompanyGroupFieldProps } from './CompanyGroupField.types';

export const CompanyGroupField = ({ control, errors, readonly, subjectType, setValue }: CompanyGroupFieldProps) => {
  const { t } = useTranslation();
  const companyGroupId = useWatch({ control, name: 'companyGroup.companyGroupId' });
  const owningManagementSubjects = useWatch({ control, name: 'owningManagementSubjects' });

  const getCompanyGroupIdOptionLabel = useCallback(
    (id: number) => {
      const companyGroup = owningManagementSubjects.find((officer) => officer.id === id);
      return companyGroup?.name ?? '';
    },
    [owningManagementSubjects],
  );

  const handleCompanyGroupIdChange = useCallback(
    (onChange: (value: number | null) => void) => (value: number | null) => {
      onChange(value);

      const companyGroup = owningManagementSubjects.find(({ id }) => id === value);
      setValue('companyGroup.name', companyGroup?.name ?? '');
      if (!value) {
        setValue('companyGroup.relation', CompanyGroup.Member);
        setValue('interGroupSignature', '');
      }
    },
    [owningManagementSubjects, setValue],
  );

  const handleCheckboxChange = useCallback(
    (onChange: (value: string | null) => void) => (_: ChangeEvent<HTMLInputElement>, checked: boolean) => {
      onChange(checked ? CompanyGroup.Leader : CompanyGroup.Member);
    },
    [],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {subjectType === SubjectType.Other && (
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Controller
            name="companyGroup.companyGroupId"
            control={control}
            render={({ field }) => (
              <AutocompleteField
                {...field}
                onChange={handleCompanyGroupIdChange(field.onChange)}
                label={t('subject.field.company_group_parent')}
                options={owningManagementSubjects.sort((a, b) => (a.name > b.name ? 1 : -1)).map(({ id }) => id)}
                error={!!errors.companyGroup?.companyGroupId}
                helperText={errors.companyGroup?.companyGroupId?.message}
                getOptionLabel={getCompanyGroupIdOptionLabel}
                readonly={readonly}
              />
            )}
          />
        </Grid2>
      )}
      <Grid2 size={{ xs: 12, sm: subjectType === SubjectType.Other ? 6 : 12 }}>
        <Controller
          name="companyGroup.relation"
          control={control}
          render={({ field }) => (
            <CheckboxField
              label={t('subject.field.group_leader')}
              error={!!errors.companyGroup?.relation}
              helperText={errors.companyGroup?.relation?.message}
              checked={field.value === CompanyGroup.Leader}
              onChange={handleCheckboxChange(field.onChange)}
              disabled={subjectType === SubjectType.Other && !companyGroupId}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
