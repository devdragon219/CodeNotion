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
import { EntryStatus } from '@realgimm5/frontend-common/gql/types';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback, useState } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FacilityCatalogueTypeFragment } from '../../../../gql/RealGimm.Web.CatalogueType.fragment';
import { FacilityContractTemplateFieldValue } from '../../../../interfaces/FieldValues/FacilityContractTemplate';
import { FacilityContractTypeFieldValue } from '../../../../interfaces/FieldValues/FacilityContractType';
import { FacilityContractFrameworkAgreementFormInput } from '../../../../interfaces/FormInputs/FacilityContract';
import { PenaltyFormInput } from '../../../../interfaces/FormInputs/Penalty';
import { SlaFormInput } from '../../../../interfaces/FormInputs/SLA';
import { getEmptyFacilityContractFrameworkAgreementFormInput } from '../../../../utils/facilityContract/initialValues';
import { parsePenaltyToPenaltyFormInput } from '../../../../utils/penalty/parsePenaltyFragment';
import { parseSlaToSlaFormInput } from '../../../../utils/sla/parseSLAFragment';
import { FacilityContractTemplateField } from '../../../core/Fields/FacilityContractTemplate/FacilityContractTemplate';
import { FacilityContractTypeField } from '../../../core/Fields/FacilityContractType/FacilityContractType';
import { SubjectField } from '../../../core/Fields/Subject/Subject';
import { FrameworkAgreementDialog } from './Dialog/Dialog';
import { FrameworkAgreementDialogInput } from './Dialog/Dialog.types';
import { FrameworkAgreementField } from './Field/Field';
import { FacilityContractGeneralDataProps } from './GeneralData.types';

export const FacilityContractGeneralData = ({
  control,
  errors,
  mode,
  readonly,
  setValue,
}: FacilityContractGeneralDataProps) => {
  const { t } = useTranslation();
  const ticketChecklists = useWatch({ control, name: 'ticketChecklists' });
  const facilityContractType = useWatch({ control, name: 'facilityContractType' });
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'frameworkAgreements',
  });

  const handleContractTypeChange = useCallback(
    (onChange: (value: FacilityContractTypeFieldValue | null) => void) =>
      (value: FacilityContractTypeFieldValue | null) => {
        onChange(value);

        setValue('originalTemplate', null);
      },
    [setValue],
  );

  const handleContractTemplateChange = useCallback(
    (onChange: (value: FacilityContractTemplateFieldValue | null) => void) =>
      (value: FacilityContractTemplateFieldValue | null) => {
        onChange(value);

        setValue('catalogueTypes', value?.catalogueTypes ?? ([] as FacilityCatalogueTypeFragment[]));
        setValue('slas', value?.slas.map<SlaFormInput>(parseSlaToSlaFormInput) ?? ([] as SlaFormInput[]));
        setValue(
          'penalties',
          value?.penalties.map<PenaltyFormInput>(parsePenaltyToPenaltyFormInput) ?? ([] as PenaltyFormInput[]),
        );
      },
    [setValue],
  );

  const [frameworkAgreementDialogProps, setFrameworkAgreementDialogProps] = useState<{
    input?: FrameworkAgreementDialogInput;
    open: boolean;
  }>({ open: false });

  const handleCloseFrameworkAgreementDialog = useCallback(() => {
    setFrameworkAgreementDialogProps({ open: false });
  }, []);
  const handleEditFrameworkAgreement = useCallback(
    (index: number) => {
      setFrameworkAgreementDialogProps({
        input: { frameworkAgreement: fields[index], index },
        open: true,
      });
    },
    [fields],
  );
  const handleSaveFrameworkAgreement = useCallback(
    (value: FacilityContractFrameworkAgreementFormInput[] | FrameworkAgreementDialogInput) => {
      if (Array.isArray(value)) {
        append(value);
      } else {
        update(value.index, value.frameworkAgreement);
      }
      handleCloseFrameworkAgreementDialog();
    },
    [append, update, handleCloseFrameworkAgreementDialog],
  );

  const handleAddRow = useCallback(() => {
    if (mode === FormMode.Create) {
      append(getEmptyFacilityContractFrameworkAgreementFormInput());
    } else {
      setFrameworkAgreementDialogProps({ open: true });
    }
  }, [mode, append]);

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <SectionTitle value="facility_contract.section_title.general_data" />
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="internalCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('facility_contract.field.internal_code')}
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
          name="externalCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('facility_contract.field.external_code')}
              error={!!errors.externalCode}
              helperText={errors.externalCode?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('facility_contract.field.description')}
              error={!!errors.description}
              helperText={errors.description?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="facilityContractType"
          control={control}
          render={({ field }) => (
            <FacilityContractTypeField
              {...field}
              onChange={handleContractTypeChange(field.onChange)}
              label={t('facility_contract.field.contract_type')}
              error={!!errors.facilityContractType}
              helperText={errors.facilityContractType?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="originalTemplate"
          control={control}
          render={({ field }) => (
            <FacilityContractTemplateField
              {...field}
              onChange={handleContractTemplateChange(field.onChange)}
              label={t('facility_contract.field.contract_template')}
              error={!!errors.originalTemplate}
              helperText={errors.originalTemplate?.message}
              readonly={readonly}
              disabled={!facilityContractType}
              where={{
                contractType: {
                  id: {
                    eq: facilityContractType?.id,
                  },
                },
              }}
            />
          )}
        />
      </Grid2>
      {mode === FormMode.Edit && (
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Controller
            name="entryStatus"
            control={control}
            render={({ field }) => (
              <SelectField
                {...field}
                label={t('facility_contract.field.contract_status')}
                options={[
                  EntryStatus.FrozenClosed,
                  EntryStatus.IncompleteDraft,
                  ...(ticketChecklists.length === 0 ? [] : [EntryStatus.Working]),
                ]}
                getOptionLabel={(option) => t(`common.enum.entry_status.${option}`)}
                error={!!errors.originalTemplate}
                helperText={errors.originalTemplate?.message}
                readonly={readonly}
                required
              />
            )}
          />
        </Grid2>
      )}
      <Grid2 size={{ xs: 12, sm: mode === FormMode.Create ? 12 : 6 }}>
        <Controller
          name="providerSubject"
          control={control}
          render={({ field }) => (
            <SubjectField
              {...field}
              label={t('facility_contract.field.provider_subject')}
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
          name="agreementDate"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('facility_contract.field.agreement_date')}
              error={!!errors.agreementDate}
              helperText={errors.agreementDate?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="effectiveDate"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('facility_contract.field.effective_date')}
              error={!!errors.effectiveDate}
              helperText={errors.effectiveDate?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="expirationDate"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('facility_contract.field.expiration_date')}
              error={!!errors.expirationDate}
              helperText={errors.expirationDate?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="cancellationNoticeDaysCount"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label={t('facility_contract.field.cancellation_notice')}
              error={!!errors.cancellationNoticeDaysCount}
              helperText={errors.cancellationNoticeDaysCount?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="renewalNoticeDaysCount"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label={t('facility_contract.field.renewal_notice')}
              error={!!errors.renewalNoticeDaysCount}
              helperText={errors.renewalNoticeDaysCount?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="maximumRenewalDaysCount"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label={t('facility_contract.field.maximum_renewal')}
              error={!!errors.maximumRenewalDaysCount}
              helperText={errors.maximumRenewalDaysCount?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <SectionTitle
        actions={
          mode === FormMode.Edit && !readonly ? (
            <Button color="secondary" variant="contained" startIcon={<AddCircleOutline />} onClick={handleAddRow}>
              {t('facility_contract.action.add_framework_agreement')}
            </Button>
          ) : undefined
        }
        value="facility_contract.section_title.framework_agreements"
      />
      {mode === FormMode.Create ? (
        <>
          <Grid2 size={12}>
            <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
              {fields.map(({ key }, index) => (
                <RepeatableField key={key} index={index} onDelete={remove}>
                  <FrameworkAgreementField control={control} errors={errors} index={index} />
                </RepeatableField>
              ))}
            </Stack>
          </Grid2>
          <Grid2 size={12}>
            <Button color="secondary" variant="contained" startIcon={<AddCircleOutline />} onClick={handleAddRow}>
              {t('facility_contract.action.add_framework_agreement')}
            </Button>
          </Grid2>
        </>
      ) : fields.length === 0 && readonly ? (
        <EmptyText value="facility_contract.text.no_framework_agreements" />
      ) : (
        <Grid2 size={12}>
          <SecondaryTable
            columns={[
              'facility_contract.field.framework_agreement_code',
              'facility_contract.field.framework_agreement_notes',
            ]}
            rows={fields.map((entry) => [entry.externalCode, entry.notes])}
            onRowDelete={readonly ? undefined : remove}
            onRowEdit={readonly ? undefined : handleEditFrameworkAgreement}
          />
        </Grid2>
      )}
      {frameworkAgreementDialogProps.open && (
        <FrameworkAgreementDialog
          input={frameworkAgreementDialogProps.input}
          onClose={handleCloseFrameworkAgreementDialog}
          onSave={handleSaveFrameworkAgreement}
        />
      )}
    </Grid2>
  );
};
