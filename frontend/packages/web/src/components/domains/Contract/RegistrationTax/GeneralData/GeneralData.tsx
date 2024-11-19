import { Button, Grid2 } from '@mui/material';
import {
  CheckboxField,
  CurrencyField,
  DateField,
  SectionTitle,
  SelectField,
  TextField,
} from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import {
  RegistrationTaxExemption,
  RegistrationTaxIncomeType,
  RegistrationTaxIncomeTypeRli,
  RegistrationTaxPaymentType,
  RegistrationTaxPeriod,
  RegistrationTaxSpecialCase,
} from '@realgimm5/frontend-common/gql/types';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { SubjectFragment } from '../../../../../gql/RealGimm.Web.Subject.fragment';
import { calcRegistrationTaxStampAmount } from '../../../../../utils/contract/calcRegistrationTaxStampAmount';
import { getRegistrationTaxAppliedRate } from '../../../../../utils/contract/getRegistrationTaxAppliedRate';
import { getEmptyContractRegistrationTaxFormInput } from '../../../../../utils/contract/initialValues';
import { ContractRegistrationPaymentsDialog } from '../../../../dialogs/Contract/RegistrationPayments/RegistrationPayments';
import { ContractTakeoversDialog } from '../../../../dialogs/Contract/Takeovers/Takeovers';
import { ContractRegistrationTaxGeneralDataProps } from './GeneralData.types';
import { RegistrationOfficeField } from './RegistrationOfficeField/RegistrationOfficeField';

export const ContractRegistrationTaxGeneralData = ({
  control,
  errors,
  isContractActive,
  mode,
  readonly,
  setValue,
}: ContractRegistrationTaxGeneralDataProps) => {
  const { t } = useTranslation();
  const [isRegistrationPaymentsDialogOpen, setRegistrationPaymentsDialogOpen] = useState(false);
  const [isTakeoversDialogOpen, setTakeoversDialogOpen] = useState(false);
  const isRegistrationTaxApplied = useWatch({ control, name: 'registrationTax.isRegistrationTaxApplied' });
  const isRliModeEnabled = useWatch({ control, name: 'registrationTax.isRliModeEnabled' });
  const incomeType = useWatch({ control, name: 'registrationTax.incomeType' });
  const incomeTypeRli = useWatch({ control, name: 'registrationTax.incomeTypeRli' });
  const numberOfPages = useWatch({ control, name: 'registrationTax.numberOfPages' });
  const numberOfCopies = useWatch({ control, name: 'registrationTax.numberOfCopies' });
  const registrationPayments = useWatch({ control, name: 'registrationPayments' });
  const takeovers = useWatch({ control, name: 'takeovers' });

  const appliedRate = useMemo(
    () => getRegistrationTaxAppliedRate(isRliModeEnabled, incomeType, incomeTypeRli),
    [isRliModeEnabled, incomeType, incomeTypeRli],
  );
  const stampAmount = useMemo(
    () => calcRegistrationTaxStampAmount(numberOfPages, numberOfCopies),
    [numberOfPages, numberOfCopies],
  );

  const handleCheckboxChange = useCallback(
    (_: ChangeEvent<HTMLInputElement>, checked: boolean) => {
      setValue('registrationTax', getEmptyContractRegistrationTaxFormInput(checked));
    },
    [setValue],
  );

  const handleTakeoverCheckboxChange = useCallback(
    (onChange: (checked: boolean) => void) => (_: ChangeEvent<HTMLInputElement>, checked: boolean) => {
      onChange(checked);

      setValue('registrationTax.takeoverDate', null);
      setValue('registrationTax.takeoverType', null);
      setValue('registrationTax.takeoverLegalRepresentativeSubject', null);
      setValue('registrationTax.takeoverSubjects', [] as SubjectFragment[]);
    },
    [setValue],
  );

  const handleOpenRegistrationPaymentsDialog = useCallback(() => {
    setRegistrationPaymentsDialogOpen(true);
  }, []);
  const handleCloseRegistrationPaymentsDialog = useCallback(() => {
    setRegistrationPaymentsDialogOpen(false);
  }, []);

  const handleOpenTakeoversDialog = useCallback(() => {
    setTakeoversDialogOpen(true);
  }, []);
  const handleCloseTakeoversDialog = useCallback(() => {
    setTakeoversDialogOpen(false);
  }, []);

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <SectionTitle
        actions={
          mode === FormMode.Edit ? (
            <>
              <Button variant="text" onClick={handleOpenRegistrationPaymentsDialog}>
                {t('contract.action.show_registration_payments')}
              </Button>
              <Button variant="text" onClick={handleOpenTakeoversDialog}>
                {t('contract.action.show_takeovers')}
              </Button>
            </>
          ) : undefined
        }
        value="contract.section_title.registration_tax"
      />
      {isRegistrationPaymentsDialogOpen && (
        <ContractRegistrationPaymentsDialog
          registrationPayments={registrationPayments}
          onClose={handleCloseRegistrationPaymentsDialog}
        />
      )}
      {isTakeoversDialogOpen && <ContractTakeoversDialog takeovers={takeovers} onClose={handleCloseTakeoversDialog} />}
      <Grid2 size={{ xs: 12, sm: isContractActive && mode === FormMode.Create ? 4 : 12 }}>
        <Controller
          name="registrationTax.isRegistrationTaxApplied"
          control={control}
          render={({ field }) => (
            <CheckboxField
              {...field}
              onChange={handleCheckboxChange}
              label={t('contract.field.registration_tax_applied')}
              error={!!errors.registrationTax?.isRegistrationTaxApplied}
              helperText={errors.registrationTax?.isRegistrationTaxApplied?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      {isContractActive && mode === FormMode.Create && (
        <Grid2 size={{ xs: 12, sm: 8 }}>
          <Controller
            name="registrationTax.isTakeoverFromPreviousSubject"
            control={control}
            render={({ field }) => (
              <CheckboxField
                {...field}
                onChange={handleTakeoverCheckboxChange(field.onChange)}
                label={t('contract.field.registration_tax_takeover_subject')}
                error={!!errors.registrationTax?.isTakeoverFromPreviousSubject}
                helperText={errors.registrationTax?.isTakeoverFromPreviousSubject?.message}
                disabled={!isRegistrationTaxApplied}
                readonly={readonly}
              />
            )}
          />
        </Grid2>
      )}
      {isRegistrationTaxApplied && (
        <>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="registrationTax.paymentType"
              control={control}
              render={({ field }) => (
                <SelectField
                  {...field}
                  label={t('contract.field.registration_tax_payment_type')}
                  options={Object.values(RegistrationTaxPaymentType)}
                  getOptionLabel={(option) => t(`common.enum.registration_tax_payment_type.${option}`)}
                  error={!!errors.registrationTax?.paymentType}
                  helperText={errors.registrationTax?.paymentType?.message}
                  readonly={readonly}
                  required
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="registrationTax.isRliModeEnabled"
              control={control}
              render={({ field }) => (
                <CheckboxField
                  {...field}
                  label={t('contract.field.registration_tax_rli_mode')}
                  error={!!errors.registrationTax?.isRliModeEnabled}
                  helperText={errors.registrationTax?.isRliModeEnabled?.message}
                  readonly={readonly}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="registrationTax.isAccountingManaged"
              control={control}
              render={({ field }) => (
                <CheckboxField
                  {...field}
                  label={t('contract.field.registration_tax_accounting_managed')}
                  error={!!errors.registrationTax?.isAccountingManaged}
                  helperText={errors.registrationTax?.isAccountingManaged?.message}
                  readonly={readonly}
                />
              )}
            />
          </Grid2>
          {isRliModeEnabled ? (
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Controller
                name="registrationTax.incomeTypeRli"
                control={control}
                render={({ field }) => (
                  <SelectField
                    {...field}
                    label={t('contract.field.registration_tax_income_type_rli')}
                    options={Object.values(RegistrationTaxIncomeTypeRli)}
                    getOptionLabel={(option) => t(`common.enum.registration_tax_income_type_rli.${option}`)}
                    error={!!errors.registrationTax?.incomeTypeRli}
                    helperText={errors.registrationTax?.incomeTypeRli?.message}
                    readonly={readonly}
                    required
                  />
                )}
              />
            </Grid2>
          ) : (
            <>
              <Grid2 size={{ xs: 12, sm: 4 }}>
                <Controller
                  name="registrationTax.incomeType"
                  control={control}
                  render={({ field }) => (
                    <SelectField
                      {...field}
                      label={t('contract.field.registration_tax_income_type')}
                      options={Object.values(RegistrationTaxIncomeType)}
                      getOptionLabel={(option) => t(`common.enum.registration_tax_income_type.${option}`)}
                      error={!!errors.registrationTax?.incomeType}
                      helperText={errors.registrationTax?.incomeType?.message}
                      readonly={readonly}
                      required
                    />
                  )}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 4 }}>
                <Controller
                  name="registrationTax.registrationSerialNumber"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label={t('contract.field.registration_tax_serial_number')}
                      error={!!errors.registrationTax?.registrationSerialNumber}
                      helperText={errors.registrationTax?.registrationSerialNumber?.message}
                      readonly={readonly}
                    />
                  )}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 4 }}>
                <Controller
                  name="registrationTax.registrationNumber"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label={t('contract.field.registration_tax_number')}
                      error={!!errors.registrationTax?.registrationNumber}
                      helperText={errors.registrationTax?.registrationNumber?.message}
                      readonly={readonly}
                    />
                  )}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 4 }}>
                <Controller
                  name="registrationTax.registrationYear"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="number"
                      maxLength={4}
                      label={t('contract.field.registration_tax_year')}
                      error={!!errors.registrationTax?.registrationYear}
                      helperText={errors.registrationTax?.registrationYear?.message}
                      readonly={readonly}
                    />
                  )}
                />
              </Grid2>
            </>
          )}
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <TextField
              value={appliedRate}
              label={t('contract.field.registration_tax_applied_rate_rli')}
              readonly={readonly}
              disabled
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="registrationTax.contractRegistrationCode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('contract.field.registration_tax_contract_code')}
                  error={!!errors.registrationTax?.contractRegistrationCode}
                  helperText={errors.registrationTax?.contractRegistrationCode?.message}
                  readonly={readonly}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <RegistrationOfficeField control={control} errors={errors} readonly={readonly} />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="registrationTax.registrationOffice"
              control={control}
              render={({ field }) => (
                <TextField
                  value={field.value?.countyName ?? ''}
                  label={t('contract.field.registration_tax_office_county')}
                  readonly={readonly}
                  disabled
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="registrationTax.registrationOffice"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value?.externalCode ?? ''}
                  label={t('contract.field.registration_tax_office_code')}
                  readonly={readonly}
                  disabled
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="registrationTax.taxableRateRatioPercent"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  maxLength={3}
                  label={t('contract.field.registration_tax_taxable_percent')}
                  error={!!errors.registrationTax?.taxableRateRatioPercent}
                  helperText={errors.registrationTax?.taxableRateRatioPercent?.message}
                  readonly={readonly}
                  required
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="registrationTax.tenantTaxSharePercent"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  maxLength={3}
                  label={t('contract.field.registration_tax_tenant_percent')}
                  error={!!errors.registrationTax?.tenantTaxSharePercent}
                  helperText={errors.registrationTax?.tenantTaxSharePercent?.message}
                  readonly={readonly}
                  required
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="registrationTax.firstRegistrationPeriod"
              control={control}
              render={({ field }) => (
                <SelectField
                  {...field}
                  label={t('contract.field.registration_tax_first_registration_period')}
                  options={Object.values(RegistrationTaxPeriod)}
                  getOptionLabel={(option) => t(`common.enum.registration_tax_period.${option}`)}
                  error={!!errors.registrationTax?.firstRegistrationPeriod}
                  helperText={errors.registrationTax?.firstRegistrationPeriod?.message}
                  readonly={readonly}
                  required
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="registrationTax.firstRegistrationDate"
              control={control}
              render={({ field }) => (
                <DateField
                  {...field}
                  label={t('contract.field.registration_tax_first_registration_date')}
                  error={!!errors.registrationTax?.firstRegistrationDate}
                  helperText={errors.registrationTax?.firstRegistrationDate?.message}
                  readonly={readonly}
                  clearable
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="registrationTax.firstOnlineRegistrationDate"
              control={control}
              render={({ field }) => (
                <DateField
                  {...field}
                  label={t('contract.field.registration_tax_first_online_registration_date')}
                  error={!!errors.registrationTax?.firstOnlineRegistrationDate}
                  helperText={errors.registrationTax?.firstOnlineRegistrationDate?.message}
                  readonly={readonly}
                  clearable
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="registrationTax.lastPaymentDate"
              control={control}
              render={({ field }) => (
                <DateField
                  {...field}
                  label={t('contract.field.registration_tax_last_payment_date')}
                  error={!!errors.registrationTax?.lastPaymentDate}
                  helperText={errors.registrationTax?.lastPaymentDate?.message}
                  readonly={readonly}
                  clearable
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="registrationTax.lastOnlinePaymentDate"
              control={control}
              render={({ field }) => (
                <DateField
                  {...field}
                  label={t('contract.field.registration_tax_last_online_payment_date')}
                  error={!!errors.registrationTax?.lastOnlinePaymentDate}
                  helperText={errors.registrationTax?.lastOnlinePaymentDate?.message}
                  readonly={readonly}
                  clearable
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="registrationTax.exemption"
              control={control}
              render={({ field }) => (
                <SelectField
                  {...field}
                  label={t('contract.field.registration_tax_exemption')}
                  options={Object.values(RegistrationTaxExemption)}
                  getOptionLabel={(option) => t(`common.enum.registration_tax_exemption.${option}`)}
                  error={!!errors.registrationTax?.exemption}
                  helperText={errors.registrationTax?.exemption?.message}
                  readonly={readonly}
                  clearable
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="registrationTax.transferResolutionAmount"
              control={control}
              render={({ field }) => (
                <CurrencyField
                  {...field}
                  label={t('contract.field.registration_tax_resolution_amount')}
                  error={!!errors.registrationTax?.transferResolutionAmount}
                  helperText={errors.registrationTax?.transferResolutionAmount?.message}
                  readonly={readonly}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="registrationTax.specialCase"
              control={control}
              render={({ field }) => (
                <SelectField
                  {...field}
                  label={t('contract.field.registration_tax_special_case')}
                  options={Object.values(RegistrationTaxSpecialCase)}
                  getOptionLabel={(option) => t(`common.enum.registration_tax_special_case.${option}`)}
                  error={!!errors.registrationTax?.specialCase}
                  helperText={errors.registrationTax?.specialCase?.message}
                  readonly={readonly}
                  clearable
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="registrationTax.numberOfPages"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label={t('contract.field.registration_tax_number_of_pages')}
                  error={!!errors.registrationTax?.numberOfPages}
                  helperText={errors.registrationTax?.numberOfPages?.message}
                  readonly={readonly}
                  required
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="registrationTax.numberOfCopies"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label={t('contract.field.registration_tax_number_of_copies')}
                  error={!!errors.registrationTax?.numberOfCopies}
                  helperText={errors.registrationTax?.numberOfCopies?.message}
                  readonly={readonly}
                  required
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <CurrencyField
              value={stampAmount}
              label={t('contract.field.registration_tax_stamp_amount')}
              readonly={readonly}
              disabled
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="registrationTax.tenantShareOfStampTaxPercent"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  maxLength={3}
                  label={t('contract.field.registration_tax_stamp_percent')}
                  error={!!errors.registrationTax?.tenantShareOfStampTaxPercent}
                  helperText={errors.registrationTax?.tenantShareOfStampTaxPercent?.message}
                  readonly={readonly}
                  required
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="registrationTax.isVoluntarySanctionApplied"
              control={control}
              render={({ field }) => (
                <CheckboxField
                  {...field}
                  label={t('contract.field.registration_tax_voluntary_sanction_applied')}
                  error={!!errors.registrationTax?.isVoluntarySanctionApplied}
                  helperText={errors.registrationTax?.isVoluntarySanctionApplied?.message}
                  readonly={readonly}
                />
              )}
            />
          </Grid2>
        </>
      )}
    </Grid2>
  );
};
