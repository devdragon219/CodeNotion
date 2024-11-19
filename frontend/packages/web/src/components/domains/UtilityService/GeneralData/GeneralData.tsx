import { Grid2 } from '@mui/material';
import {
  CheckboxField,
  CurrencyField,
  DateField,
  SectionTitle,
  SelectField,
  TextField,
} from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { EntryStatus, MeteringType, PersonType, UtilityCategory } from '@realgimm5/frontend-common/gql/types';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AccountingItemField } from '../../../core/Fields/AccountingItem/AccountingItem';
import { OrgUnitField } from '../../../core/Fields/OrgUnit/OrgUnit';
import { SubjectField } from '../../../core/Fields/Subject/Subject';
import { UtilityServiceGeneralDataProps } from './GeneralData.types';
import { UtilityTypeField } from './UtilityTypeField/UtilityTypeField';

export const UtilityServiceGeneralData = ({
  control,
  disabled,
  errors,
  mode,
  readonly,
  sectionTitle,
}: UtilityServiceGeneralDataProps) => {
  const { t } = useTranslation();
  const utilityType = useWatch({ control, name: 'utilityType' });
  const providerSubject = useWatch({ control, name: 'providerSubject' });
  const referenceSubject = useWatch({ control, name: 'referenceSubject' });

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {(mode === FormMode.Create || sectionTitle) && (
        <SectionTitle value={sectionTitle ?? 'utility_service.section_title.general_data'} />
      )}
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="internalCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('utility_service.field.internal_code')}
              error={!!errors.internalCode}
              helperText={errors.internalCode?.message}
              disabled={disabled}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <UtilityTypeField
          control={control}
          disabled={disabled ?? mode === FormMode.Edit}
          errors={errors}
          readonly={readonly}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <SelectField
          value={utilityType?.category ?? null}
          options={Object.values(UtilityCategory)}
          getOptionLabel={(option) => t(`common.enum.utility_category.${option}`)}
          label={t('utility_service.field.utility_type_category')}
          readonly={readonly}
          disabled
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="referenceSubject"
          control={control}
          render={({ field }) => (
            <SubjectField
              {...field}
              disabled={disabled ?? mode === FormMode.Edit}
              label={t('utility_service.field.reference_subject')}
              error={!!errors.referenceSubject}
              helperText={errors.referenceSubject?.message}
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
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="orgUnit"
          control={control}
          render={({ field }) => (
            <OrgUnitField
              {...field}
              label={t('utility_service.field.org_unit')}
              error={!!errors.orgUnit}
              helperText={errors.orgUnit?.message}
              disabled={disabled ?? !referenceSubject}
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
              label={t('utility_service.field.provider_subject')}
              error={!!errors.providerSubject}
              helperText={errors.providerSubject?.message}
              disabled={disabled}
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
        />{' '}
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <TextField
          value={providerSubject?.internalCode ?? null}
          label={t('utility_service.field.provider_subject_internal_code')}
          readonly={readonly}
          disabled
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <TextField
          value={providerSubject?.vatNumber ?? null}
          label={t('utility_service.field.provider_subject_vat_number')}
          readonly={readonly}
          disabled
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 3 }}>
        <Controller
          name="accountingItem"
          control={control}
          render={({ field }) => (
            <AccountingItemField
              {...field}
              label={t('utility_service.field.accounting_item')}
              error={!!errors.accountingItem}
              helperText={errors.accountingItem?.message}
              disabled={disabled}
              readonly={readonly}
              required
            />
          )}
        />{' '}
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 3 }}>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('utility_service.field.description')}
              error={!!errors.description}
              helperText={errors.description?.message}
              disabled={disabled}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 3 }}>
        <Controller
          name="utilityContractCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('utility_service.field.utility_contract_code')}
              error={!!errors.utilityContractCode}
              helperText={errors.utilityContractCode?.message}
              disabled={disabled}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 3 }}>
        <Controller
          name="utilityUserCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('utility_service.field.utility_user_code')}
              error={!!errors.utilityUserCode}
              helperText={errors.utilityUserCode?.message}
              disabled={disabled}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <SelectField
          value={utilityType?.meteringType ?? null}
          options={Object.values(MeteringType)}
          getOptionLabel={(option) => t(`common.enum.metering_type.${option}`)}
          label={t('utility_service.field.utility_type_metering_type')}
          readonly={readonly}
          disabled
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="isFreeMarket"
          control={control}
          render={({ field }) => (
            <CheckboxField
              {...field}
              label={t('utility_service.field.free_market')}
              error={!!errors.isFreeMarket}
              helperText={errors.isFreeMarket?.message}
              disabled={disabled}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="deposit"
          control={control}
          render={({ field }) => (
            <CurrencyField
              {...field}
              label={t('utility_service.field.deposit')}
              error={!!errors.deposit}
              helperText={errors.deposit?.message}
              disabled={disabled}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: mode === FormMode.Create ? 3 : 4 }}>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              options={[
                EntryStatus.Working,
                EntryStatus.IncompleteDraft,
                ...(mode === FormMode.Edit ? [EntryStatus.FrozenClosed] : []),
              ]}
              getOptionLabel={(option) => t(`common.enum.entry_status.${option}`)}
              label={t('utility_service.field.status')}
              error={!!errors.status}
              helperText={errors.status?.message}
              disabled={disabled}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      {mode === FormMode.Create && (
        <Grid2 size={{ xs: 12, sm: 3 }}>
          <Controller
            name="activationDate"
            control={control}
            render={({ field }) => (
              <DateField
                {...field}
                label={t('utility_service.field.activation_date')}
                error={!!errors.activationDate}
                helperText={errors.activationDate?.message}
                disabled={disabled}
                readonly={readonly}
                required
              />
            )}
          />
        </Grid2>
      )}
      <Grid2 size={{ xs: 12, sm: mode === FormMode.Create ? 3 : 4 }}>
        <Controller
          name="utilityMeterSerial"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('utility_service.field.utility_meter_serial')}
              error={!!errors.utilityMeterSerial}
              helperText={errors.utilityMeterSerial?.message}
              disabled={disabled}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: mode === FormMode.Create ? 3 : 4 }}>
        <Controller
          name="utilityDeliveryPointCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('utility_service.field.utility_delivery_point_code')}
              error={!!errors.utilityDeliveryPointCode}
              helperText={errors.utilityDeliveryPointCode?.message}
              disabled={disabled}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      {mode === FormMode.Edit && (
        <>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="activationDate"
              control={control}
              render={({ field }) => (
                <DateField
                  {...field}
                  label={t('utility_service.field.activation_date')}
                  error={!!errors.activationDate}
                  helperText={errors.activationDate?.message}
                  readonly={readonly}
                  required
                  disabled
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="deactivationDate"
              control={control}
              render={({ field }) => (
                <DateField
                  {...field}
                  label={t('utility_service.field.deactivation_date')}
                  error={!!errors.deactivationDate}
                  helperText={errors.deactivationDate?.message}
                  readonly={readonly}
                  disabled
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="deactivationRequestDate"
              control={control}
              render={({ field }) => (
                <DateField
                  {...field}
                  label={t('utility_service.field.deactivation_request_date')}
                  error={!!errors.deactivationRequestDate}
                  helperText={errors.deactivationRequestDate?.message}
                  readonly={readonly}
                  disabled
                />
              )}
            />
          </Grid2>
        </>
      )}
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="contractPowerNominal"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('utility_service.field.contract_power_nominal')}
              error={!!errors.contractPowerNominal}
              helperText={errors.contractPowerNominal?.message}
              disabled={disabled}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="contractPowerMaximum"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('utility_service.field.contract_power_maximum')}
              error={!!errors.contractPowerMaximum}
              helperText={errors.contractPowerMaximum?.message}
              disabled={disabled}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="contractNominalTension"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('utility_service.field.contract_nominal_tension')}
              error={!!errors.contractNominalTension}
              helperText={errors.contractNominalTension?.message}
              disabled={disabled}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={12}>
        <Controller
          name="notes"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              multiline
              label={t('utility_service.field.notes')}
              error={!!errors.notes}
              helperText={errors.notes?.message}
              disabled={disabled}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
