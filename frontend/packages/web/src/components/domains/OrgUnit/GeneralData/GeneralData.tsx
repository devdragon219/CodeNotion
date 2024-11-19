import { Grid2 } from '@mui/material';
import { DateField, SectionTitle, SelectField, TextField } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { EntryStatus, PersonType } from '@realgimm5/frontend-common/gql/types';
import { useCallback, useEffect, useMemo } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { OrgUnitFormInput } from '../../../../interfaces/FormInputs/OrgUnit';
import { OrgUnitField } from '../../../core/Fields/OrgUnit/OrgUnit';
import { SubjectField } from '../../../core/Fields/Subject/Subject';
import { OrgUnitGeneralDataProps } from './GeneralData.types';

export const OrgUnitGeneralData = ({ control, errors, mode, readonly, setValue, trigger }: OrgUnitGeneralDataProps) => {
  const { t } = useTranslation();
  const entryStatus = useWatch({ control, name: 'entryStatus' });

  useEffect(() => {
    if (entryStatus !== EntryStatus.FrozenClosed) {
      setValue('closureDate', null);
    }
    // eslint-disable-next-line
  }, [entryStatus]);

  const orgUnitId = useWatch({ control, name: 'orgUnitId' });
  const orgUnitType = useWatch({ control, name: 'orgUnitType' });
  const managementSubject = useWatch({ control, name: 'managementSubject' });
  const groupSociety = useWatch({ control, name: 'groupSociety' });
  const fieldColSpan = useMemo(() => ({ xs: 12, ...(mode === FormMode.Edit ? { lg: 6 } : { md: 6 }) }), [mode]);

  const handleGroupSocietyChange = useCallback(
    (onChange: (value: OrgUnitFormInput['groupSociety']) => void) =>
      async (value: OrgUnitFormInput['groupSociety']) => {
        onChange(value);
        setValue('parentOrgUnit', null);
        await trigger('groupSociety');
      },
    [setValue, trigger],
  );

  const handleGroupSocietyEmptied = useCallback(async () => {
    setValue('groupSociety', null);
    setValue('parentOrgUnit', null);
    await trigger('groupSociety');
  }, [setValue, trigger]);

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <SectionTitle value="org_unit.section_title.general_data" />
      <Grid2 {...fieldColSpan}>
        <Controller
          name="managementSubject"
          control={control}
          render={({ field }) => (
            <SubjectField
              {...field}
              label={t('org_unit.field.management_subject')}
              error={!!errors.managementSubject}
              helperText={errors.managementSubject?.message}
              readonly={readonly}
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
      <Grid2 {...fieldColSpan}>
        <Controller
          name="groupSociety"
          control={control}
          render={({ field }) => (
            <SubjectField
              {...field}
              label={t('org_unit.field.group_society')}
              error={!!errors.groupSociety}
              helperText={errors.groupSociety?.message}
              onChange={handleGroupSocietyChange(field.onChange)}
              onEmptied={handleGroupSocietyEmptied}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 {...fieldColSpan}>
        <Controller
          name="internalCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('org_unit.field.internal_code')}
              readonly={readonly}
              error={!!errors.internalCode}
              helperText={errors.internalCode?.message}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 {...fieldColSpan}>
        <Controller
          name="externalCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('org_unit.field.additional_code')}
              readonly={readonly}
              error={!!errors.externalCode}
              helperText={errors.externalCode?.message}
            />
          )}
        />
      </Grid2>
      <Grid2 {...fieldColSpan}>
        <Controller
          name="entryDescription"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('org_unit.field.entry_description')}
              readonly={readonly}
              error={!!errors.entryDescription}
              helperText={errors.entryDescription?.message}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 {...fieldColSpan}>
        <Controller
          name="parentOrgUnit"
          control={control}
          render={({ field }) => (
            <OrgUnitField
              {...field}
              label={t('org_unit.field.parent_org_unit')}
              readonly={readonly}
              error={!!errors.parentOrgUnit}
              helperText={errors.parentOrgUnit?.message}
              entryStatus={EntryStatus.Working}
              parentSubjectId={groupSociety?.id ?? managementSubject?.id}
              orgUnitIdToExclude={orgUnitId}
              orgUnitType={orgUnitType}
            />
          )}
        />
      </Grid2>
      <Grid2 {...fieldColSpan}>
        <Controller
          name="entryStatus"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('org_unit.field.entry_status')}
              getOptionLabel={(type) => t(`common.enum.entry_status.${type as EntryStatus}`)}
              options={mode === FormMode.Edit ? [EntryStatus.Working, EntryStatus.FrozenClosed] : [EntryStatus.Working]}
              readonly={readonly}
              error={!!errors.entryStatus}
              helperText={errors.entryStatus?.message}
              disabled={mode === FormMode.Create}
              required
            />
          )}
        />
      </Grid2>
      {mode === FormMode.Edit && (
        <Grid2 {...fieldColSpan}>
          <Controller
            name="closureDate"
            control={control}
            render={({ field }) => (
              <DateField
                {...field}
                label={t('org_unit.field.closure_date')}
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
    </Grid2>
  );
};
