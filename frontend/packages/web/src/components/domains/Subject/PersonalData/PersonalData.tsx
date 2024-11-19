import { AddCircleOutline } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import {
  DateField,
  EmptyText,
  RepeatableField,
  SecondaryTable,
  SectionTitle,
  SelectField,
  TextField,
} from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { BirthSex, EntryStatus, OfficerType } from '@realgimm5/frontend-common/gql/types';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback, useState } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { LegalNature } from '../../../../enums/LegalNature';
import { SubjectType } from '../../../../enums/SubjectType';
import { SubjectHeirFormInput, SubjectOfficerFormInput } from '../../../../interfaces/FormInputs/Subject';
import { getEmptySubjectOfficerFormInput } from '../../../../utils/subject/initialValues';
import { HeirDialog } from '../../../dialogs/Heir/Heir';
import { HeirDialogInput } from '../../../dialogs/Heir/Heir.types';
import { BirthAddressField } from './BirthAddressField/BirthAddressField';
import { CompanyGroupField } from './CompanyGroupField/CompanyGroupField';
import { GovIdCodeField } from './GovIDCodeField/GovIDCodeField';
import { HouseIdCodeField } from './HouseIDCodeField/HouseIDCodeField';
import { OfficerDialog } from './OfficerDialog/OfficerDialog';
import { OfficerDialogInput } from './OfficerDialog/OfficerDialog.types';
import { OfficerField } from './OfficerField/OfficerField';
import { SubjectPersonalDataProps } from './PersonalData.types';
import { TaxStatusesField } from './TaxStatusesField/TaxStatusesField';

export const SubjectPersonalData = ({
  control,
  errors,
  mode,
  readonly,
  subjectType,
  setValue,
}: SubjectPersonalDataProps) => {
  const { t } = useTranslation();
  const fullName = useWatch({ control, name: 'fullName' });
  const shorthandDescription = useWatch({ control, name: 'shorthandDescription' });
  const firstName = useWatch({ control, name: 'firstName' });
  const lastName = useWatch({ control, name: 'lastName' });
  const companyGroup = useWatch({ control, name: 'companyGroup' });
  const entryStatus = useWatch({ control, name: 'entryStatus' });
  const {
    fields: heirs,
    append: appendHeir,
    remove: removeHeir,
    update: updateHeir,
  } = useFieldArray({ control, name: 'heirs' });
  const legalNature = useWatch({ control, name: 'legalNature' });
  const subjectId = useWatch({ control, name: 'subjectId' });
  const owningManagementSubjects = useWatch({ control, name: 'owningManagementSubjects' });
  const {
    fields: officers,
    append: appendOfficer,
    remove: removeOfficer,
    update: updateOfficer,
  } = useFieldArray({ control, name: 'officers' });
  const [officerDialogProps, setOfficerDialogProps] = useState<{
    input?: OfficerDialogInput;
    open: boolean;
  }>({ open: false });
  const [heirDialogProps, setHeirDialogProps] = useState<{
    input?: HeirDialogInput;
    open: boolean;
  }>({ open: false });

  const handleCloseOfficerDialog = useCallback(() => {
    setOfficerDialogProps({ open: false });
  }, []);
  const handleEditOfficer = useCallback(
    (index: number) => {
      setOfficerDialogProps({ input: { officer: officers[index], index }, open: true });
    },
    [officers],
  );
  const handleSaveOfficer = useCallback(
    (value: SubjectOfficerFormInput[] | OfficerDialogInput) => {
      if (Array.isArray(value)) {
        appendOfficer(value);
      } else {
        updateOfficer(value.index, value.officer);
      }
      handleCloseOfficerDialog();
    },
    [appendOfficer, updateOfficer, handleCloseOfficerDialog],
  );

  const handleCloseHeirDialog = useCallback(() => {
    setHeirDialogProps({ open: false });
  }, []);
  const handleEditHeir = useCallback(
    (index: number) => {
      setHeirDialogProps({ input: { heir: heirs[index], index }, open: true });
    },
    [heirs],
  );
  const handleSaveHeir = useCallback(
    (value: SubjectHeirFormInput[] | HeirDialogInput) => {
      if (Array.isArray(value)) {
        appendHeir(value);
      } else {
        updateHeir(value.index, value.heir);
      }
      handleCloseHeirDialog();
    },
    [appendHeir, updateHeir, handleCloseHeirDialog],
  );

  const handleAddHeir = useCallback(() => {
    setHeirDialogProps({ open: true });
  }, []);

  const handleAddOfficer = useCallback(() => {
    if (mode === FormMode.Create) {
      appendOfficer(
        getEmptySubjectOfficerFormInput(
          legalNature === LegalNature.PhysicalPerson ? null : OfficerType.LegalRepresentative,
        ),
      );
    } else {
      setOfficerDialogProps({ open: true });
    }
  }, [mode, legalNature, appendOfficer]);

  const handleNameChange = useCallback(
    (key: string, onChange: (value: string) => void) => (value: string) => {
      onChange(value);

      if (legalNature === LegalNature.PhysicalPerson) {
        setValue(
          'name',
          [key === 'lastName' ? value : lastName, key === 'firstName' ? value : firstName]
            .filter((it) => it.length !== 0)
            .join(' '),
        );
      } else if (key === 'shorthandDescription') {
        setValue('name', value.length !== 0 ? value : fullName);
      } else {
        setValue('name', shorthandDescription.length !== 0 ? shorthandDescription : value);
      }
    },
    [firstName, fullName, lastName, legalNature, setValue, shorthandDescription],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {mode === FormMode.Create && <SectionTitle value="subject.section_title.personal_data" />}
      {legalNature === LegalNature.PhysicalPerson ? (
        <>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  onChange={handleNameChange('firstName', field.onChange)}
                  label={t('subject.field.first_name')}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  required
                  readonly={readonly}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  onChange={handleNameChange('lastName', field.onChange)}
                  label={t('subject.field.last_name')}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  required
                  readonly={readonly}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="birthSex"
              control={control}
              render={({ field }) => (
                <SelectField
                  {...field}
                  label={t('subject.field.birth_sex')}
                  options={Object.values(BirthSex)}
                  getOptionLabel={(option) => t(`common.enum.birth_sex.${option}`)}
                  error={!!errors.birthSex}
                  helperText={errors.birthSex?.message}
                  required={entryStatus !== EntryStatus.IncompleteDraft}
                  readonly={readonly}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="birthDate"
              control={control}
              render={({ field }) => (
                <DateField
                  {...field}
                  label={t('subject.field.birth_date')}
                  error={!!errors.birthDate}
                  helperText={errors.birthDate?.message}
                  required={entryStatus !== EntryStatus.IncompleteDraft}
                  readonly={readonly}
                />
              )}
            />
          </Grid2>
          <Grid2 size={12}>
            <BirthAddressField
              control={control}
              errors={errors}
              readonly={readonly}
              required={entryStatus !== EntryStatus.IncompleteDraft}
              setValue={setValue}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="birthCountryTaxIdCode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('subject.field.tax_id_code')}
                  error={!!errors.birthCountryTaxIdCode}
                  helperText={errors.birthCountryTaxIdCode?.message}
                  required={entryStatus !== EntryStatus.IncompleteDraft}
                  readonly={readonly}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="professionalTaxIdCode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('subject.field.vat_number')}
                  error={!!errors.professionalTaxIdCode}
                  helperText={errors.professionalTaxIdCode?.message}
                  readonly={readonly}
                />
              )}
            />
          </Grid2>
        </>
      ) : (
        <>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  onChange={handleNameChange('fullName', field.onChange)}
                  label={t('subject.field.business_name')}
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message}
                  required
                  readonly={readonly}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="shorthandDescription"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  onChange={handleNameChange('shorthandDescription', field.onChange)}
                  label={t('subject.field.subject_name')}
                  error={!!errors.shorthandDescription}
                  helperText={errors.shorthandDescription?.message}
                  readonly={readonly}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="businessStart"
              control={control}
              render={({ field }) => (
                <DateField
                  {...field}
                  label={t('subject.field.establishment_date')}
                  error={!!errors.businessStart}
                  helperText={errors.businessStart?.message}
                  readonly={readonly}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="shareCapital"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label={t('subject.field.share_capital')}
                  error={!!errors.shareCapital}
                  helperText={errors.shareCapital?.message}
                  readonly={readonly}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="baseCountryTaxIdCode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('subject.field.vat_number')}
                  error={!!errors.baseCountryTaxIdCode}
                  helperText={errors.baseCountryTaxIdCode?.message}
                  required={
                    subjectType === SubjectType.ManagementSubject && entryStatus !== EntryStatus.IncompleteDraft
                  }
                  readonly={readonly}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="additionalTaxIdCode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('subject.field.tax_id_code')}
                  error={!!errors.additionalTaxIdCode}
                  helperText={errors.additionalTaxIdCode?.message}
                  readonly={readonly}
                />
              )}
            />
          </Grid2>
          <Grid2 size={12}>
            <HouseIdCodeField control={control} errors={errors} readonly={readonly} setValue={setValue} />
          </Grid2>
          <Grid2 size={12}>
            <GovIdCodeField control={control} errors={errors} readonly={readonly} setValue={setValue} />
          </Grid2>
        </>
      )}
      {legalNature !== LegalNature.PhysicalPerson && (
        <>
          <SectionTitle value="subject.section_title.corporate_data" />
          <Grid2 size={{ xs: 12, sm: subjectType === SubjectType.ManagementSubject ? 4 : 12 }}>
            <CompanyGroupField
              control={control}
              errors={errors}
              readonly={readonly}
              subjectType={subjectType}
              setValue={setValue}
            />
          </Grid2>
          {subjectType === SubjectType.ManagementSubject && (
            <Grid2 size={{ xs: 12, sm: 8 }}>
              <TaxStatusesField control={control} readonly={readonly} />
            </Grid2>
          )}
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="interGroupSignature"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('subject.field.signature')}
                  error={!!errors.interGroupSignature}
                  helperText={errors.interGroupSignature?.message}
                  disabled={subjectType !== SubjectType.ManagementSubject && !companyGroup.companyGroupId}
                  required={
                    entryStatus !== EntryStatus.IncompleteDraft &&
                    (subjectType === SubjectType.ManagementSubject || !!companyGroup.companyGroupId)
                  }
                  readonly={readonly}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="bankingId1"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('subject.field.sia_code')}
                  error={!!errors.bankingId1}
                  helperText={errors.bankingId1?.message}
                  readonly={readonly}
                />
              )}
            />
          </Grid2>
        </>
      )}
      <SectionTitle
        value={`subject.section_title.${
          legalNature === LegalNature.PhysicalPerson ? 'legal_representative_or_other' : 'legal_representative'
        }`}
      />
      {officers.length !== 0 ? (
        <Grid2 size={12}>
          {mode === FormMode.Create ? (
            <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
              {officers.map(({ key }, index) => (
                <RepeatableField key={key} index={index} onDelete={removeOfficer}>
                  <OfficerField
                    control={control}
                    errors={errors}
                    index={index}
                    required={entryStatus !== EntryStatus.IncompleteDraft}
                    selectedOfficers={officers.filter((_, idx) => idx !== index)}
                    useOfficerType={legalNature === LegalNature.PhysicalPerson}
                  />
                </RepeatableField>
              ))}
            </Stack>
          ) : (
            <SecondaryTable
              columns={[
                'subject.field.officer_type',
                'subject.field.officer_name',
                'subject.field.officer_since',
                'subject.field.officer_until',
              ]}
              rows={officers.map((entry) => [
                entry.officerType ? t(`common.enum.officer_type.${entry.officerType}`) : null,
                entry.officer?.name,
                entry.since,
                entry.until,
              ])}
              onRowDelete={readonly ? undefined : removeOfficer}
              onRowEdit={readonly ? undefined : handleEditOfficer}
            />
          )}
        </Grid2>
      ) : mode === FormMode.Edit ? (
        <EmptyText
          value={`subject.text.${
            legalNature === LegalNature.PhysicalPerson
              ? 'no_legal_representatives_or_other'
              : 'no_legal_representatives'
          }`}
        />
      ) : (
        <></>
      )}
      {officerDialogProps.open && (
        <OfficerDialog
          entryStatus={entryStatus!}
          input={officerDialogProps.input}
          required={entryStatus !== EntryStatus.IncompleteDraft}
          selectedOfficers={officers.filter((_, index) => index !== officerDialogProps.input?.index)}
          useOfficerType={legalNature === LegalNature.PhysicalPerson}
          onClose={handleCloseOfficerDialog}
          onSave={handleSaveOfficer}
        />
      )}
      {!readonly && (
        <Grid2 size={12}>
          <Button color="secondary" variant="contained" startIcon={<AddCircleOutline />} onClick={handleAddOfficer}>
            {t('subject.action.add_legal_representative')}
          </Button>
        </Grid2>
      )}
      {entryStatus === EntryStatus.FrozenClosed && legalNature === LegalNature.PhysicalPerson && (
        <>
          <SectionTitle value="subject.section_title.heirs" />
          {heirs.length !== 0 ? (
            <Grid2 size={12}>
              <SecondaryTable
                columns={['subject.field.heir_name', 'subject.field.officer_since']}
                rows={heirs.map((entry) => [entry.heir?.name, entry.since])}
                onRowDelete={readonly ? undefined : removeHeir}
                onRowEdit={readonly ? undefined : handleEditHeir}
              />
            </Grid2>
          ) : mode === FormMode.Edit ? (
            <EmptyText value="subject.text.no_heirs" />
          ) : (
            <></>
          )}
          {heirDialogProps.open && (
            <HeirDialog
              input={heirDialogProps.input}
              owningManagementSubjectIds={owningManagementSubjects.map(({ id }) => id)}
              selectedHeirs={heirs.filter((_, index) => index !== heirDialogProps.input?.index)}
              subjectId={subjectId}
              onClose={handleCloseHeirDialog}
              onSave={handleSaveHeir}
            />
          )}
          {!readonly && (
            <Grid2 size={12}>
              <Button color="secondary" variant="contained" startIcon={<AddCircleOutline />} onClick={handleAddHeir}>
                {t('subject.action.add_heir')}
              </Button>
            </Grid2>
          )}
        </>
      )}
    </Grid2>
  );
};
