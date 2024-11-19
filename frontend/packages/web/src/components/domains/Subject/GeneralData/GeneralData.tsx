import { Grid2 } from '@mui/material';
import { DateField, SectionTitle, SelectField, TextField } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { EntryStatus, PersonType } from '@realgimm5/frontend-common/gql/types';
import { useCallback, useEffect } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { LegalNature } from '../../../../enums/LegalNature';
import { SubjectType } from '../../../../enums/SubjectType';
import { SubjectFieldValue } from '../../../../interfaces/FieldValues/Subject';
import { getEmptySubjectCompanyGroupFormInput } from '../../../../utils/subject/initialValues';
import { SubjectField } from '../../../core/Fields/Subject/Subject';
import { CategoryField } from './CategoryField/CategoryField';
import { SubjectGeneralDataProps } from './GeneralData.types';

export const SubjectGeneralData = ({
  control,
  errors,
  isLegalNatureDisabled,
  mode,
  readonly,
  subjectType,
  setValue,
}: SubjectGeneralDataProps) => {
  const { t } = useTranslation();
  const entryStatus = useWatch({ control, name: 'entryStatus' });
  const legalNature = useWatch({ control, name: 'legalNature' });
  const companyGroupId = useWatch({ control, name: 'companyGroup.companyGroupId' });

  useEffect(() => {
    if (entryStatus !== EntryStatus.FrozenClosed) {
      setValue('closureDate', null);
    }
    // eslint-disable-next-line
  }, [entryStatus]);

  const handleOwningManagementSubjectsChange = useCallback(
    (onChange: (value: readonly SubjectFieldValue[]) => void) => (value: readonly SubjectFieldValue[]) => {
      onChange(value);

      if (companyGroupId && !value.map(({ id }) => id).includes(companyGroupId)) {
        setValue('companyGroup', getEmptySubjectCompanyGroupFormInput());
        setValue('interGroupSignature', '');
      }
    },
    [companyGroupId, setValue],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {mode === FormMode.Create && <SectionTitle value="subject.section_title.general_data" />}
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="legalNature"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('subject.field.legal_nature')}
              options={Object.values(LegalNature)}
              getOptionLabel={(option) => t(`core.enum.legal_nature.${option}`)}
              error={!!errors.legalNature}
              helperText={errors.legalNature?.message}
              disabled={subjectType === SubjectType.ManagementSubject || isLegalNatureDisabled}
              required={subjectType !== SubjectType.ManagementSubject}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      {subjectType === SubjectType.ManagementSubject ? (
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Controller
            name="managementCode"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={t('subject.field.management_code')}
                error={!!errors.managementCode}
                helperText={errors.managementCode?.message}
                required={entryStatus !== EntryStatus.IncompleteDraft}
                readonly={readonly}
              />
            )}
          />
        </Grid2>
      ) : (
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <CategoryField
            control={control}
            errors={errors}
            readonly={readonly}
            required={entryStatus !== EntryStatus.IncompleteDraft}
            useHeir={legalNature === LegalNature.PhysicalPerson}
          />
        </Grid2>
      )}
      <Grid2 size={{ xs: 12, sm: mode === FormMode.Create && subjectType === SubjectType.ManagementSubject ? 4 : 6 }}>
        <Controller
          name="internalCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('subject.field.subject_code')}
              error={!!errors.internalCode}
              helperText={errors.internalCode?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: mode === FormMode.Create && subjectType === SubjectType.ManagementSubject ? 4 : 6 }}>
        <Controller
          name="externalSourceCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('subject.field.external_subject_code')}
              error={!!errors.externalSourceCode}
              helperText={errors.externalSourceCode?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2
        size={{
          xs: 12,
          sm:
            subjectType === SubjectType.ManagementSubject
              ? mode === FormMode.Create
                ? 4
                : 6
              : mode === FormMode.Create
                ? 6
                : 4,
        }}
      >
        <Controller
          name="entryStatus"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('subject.field.subject_status')}
              options={[
                EntryStatus.Working,
                EntryStatus.IncompleteDraft,
                ...(mode === FormMode.Edit ? [EntryStatus.FrozenClosed] : []),
              ]}
              getOptionLabel={(status) => t(`common.enum.entry_status.${status}`)}
              error={!!errors.entryStatus}
              helperText={errors.entryStatus?.message}
              required
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      {mode === FormMode.Edit && (
        <Grid2 size={{ xs: 12, sm: subjectType === SubjectType.ManagementSubject ? 6 : 4 }}>
          <Controller
            name="closureDate"
            control={control}
            render={({ field }) => (
              <DateField
                {...field}
                label={t('subject.field.closure_date')}
                error={!!errors.closureDate}
                helperText={errors.closureDate?.message}
                disabled={entryStatus !== EntryStatus.FrozenClosed}
                required={entryStatus === EntryStatus.FrozenClosed}
                readonly={readonly}
              />
            )}
          />
        </Grid2>
      )}
      {subjectType === SubjectType.Other && (
        <Grid2 size={{ xs: 12, sm: mode === FormMode.Create ? 6 : 4 }}>
          <Controller
            name="owningManagementSubjects"
            control={control}
            render={({ field }) => (
              <SubjectField
                {...field}
                label={t('subject.field.owning_management_subjects')}
                error={!!errors.owningManagementSubjects}
                helperText={errors.owningManagementSubjects?.message}
                onChange={handleOwningManagementSubjectsChange(field.onChange)}
                readonly={readonly}
                multiple
                required
                where={{
                  personType: {
                    eq: PersonType.ManagementSubject,
                  },
                }}
              />
            )}
          />{' '}
        </Grid2>
      )}
    </Grid2>
  );
};
