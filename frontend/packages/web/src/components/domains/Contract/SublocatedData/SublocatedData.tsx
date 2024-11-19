import { Grid2 } from '@mui/material';
import { DateField, SectionTitle, SelectField, TextField } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { ContractTerminator, EntryStatus, Reason } from '@realgimm5/frontend-common/gql/types';
import { addMonths } from 'date-fns';
import { useCallback } from 'react';
import { Controller, FieldPath, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ContractFormInput } from '../../../../interfaces/FormInputs/Contract';
import { ContractSublocatedDataProps } from './SublocatedData.types';

export const ContractSublocatedData = ({
  control,
  errors,
  mode,
  readonly,
  setValue,
  trigger,
}: ContractSublocatedDataProps) => {
  const { t } = useTranslation();
  const effectStartDate = useWatch({ control, name: 'sublocatedContract.effectStartDate' });
  const firstTermDurationMonths = useWatch({ control, name: 'sublocatedContract.firstTermDurationMonths' });
  const secondTermDurationMonths = useWatch({ control, name: 'sublocatedContract.secondTermDurationMonths' });

  const setTrigger = useCallback(
    (names: FieldPath<ContractFormInput>[]) => {
      const executeTrigger = async () => {
        await trigger(names);
      };

      void executeTrigger();
    },
    [trigger],
  );

  const handleFirstTermDurationMonthsChange = useCallback(
    (onChange: (value: number | null) => void) => (value: number | null) => {
      onChange(value);

      if (!value) {
        setValue('sublocatedContract.firstTermExpirationDate', null);
        if (effectStartDate && secondTermDurationMonths) {
          setValue('sublocatedContract.secondTermExpirationDate', addMonths(effectStartDate, secondTermDurationMonths));
        } else {
          setValue('sublocatedContract.secondTermExpirationDate', null);
        }
      } else if (effectStartDate) {
        setValue('sublocatedContract.firstTermExpirationDate', addMonths(effectStartDate, value));
        if (secondTermDurationMonths) {
          setValue(
            'sublocatedContract.secondTermExpirationDate',
            addMonths(effectStartDate, value + secondTermDurationMonths),
          );
        }
      } else {
        setValue('sublocatedContract.firstTermExpirationDate', null);
      }

      setTrigger(['sublocatedContract.firstTermExpirationDate', 'sublocatedContract.secondTermExpirationDate']);
    },
    [effectStartDate, secondTermDurationMonths, setTrigger, setValue],
  );

  const handleSecondTermDurationMonthsChange = useCallback(
    (onChange: (value: number | null) => void) => (value: number | null) => {
      onChange(value);

      if (!value) {
        setValue('sublocatedContract.secondTermExpirationDate', null);
      } else if (effectStartDate) {
        if (firstTermDurationMonths) {
          setValue(
            'sublocatedContract.secondTermExpirationDate',
            addMonths(effectStartDate, value + firstTermDurationMonths),
          );
        } else {
          setValue('sublocatedContract.secondTermExpirationDate', addMonths(effectStartDate, value));
        }
      } else {
        setValue('sublocatedContract.secondTermExpirationDate', null);
      }

      setTrigger(['sublocatedContract.secondTermExpirationDate']);
    },
    [effectStartDate, firstTermDurationMonths, setTrigger, setValue],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <SectionTitle value="contract.section_title.sublocated_data" />
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="sublocatedContract.internalCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('contract.field.contract_code')}
              error={!!errors.sublocatedContract?.internalCode}
              helperText={errors.sublocatedContract?.internalCode?.message}
              readonly={readonly}
              disabled
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="sublocatedContract.externalCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('contract.field.external_code')}
              error={!!errors.sublocatedContract?.externalCode}
              helperText={errors.sublocatedContract?.externalCode?.message}
              readonly={readonly}
              disabled
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="sublocatedContract.status"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('contract.field.contract_status')}
              options={Object.values(EntryStatus)}
              getOptionLabel={(option) => t(`common.enum.entry_status.${option}`)}
              error={!!errors.sublocatedContract?.status}
              helperText={errors.sublocatedContract?.status?.message}
              readonly={readonly}
              disabled
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="sublocatedContract.managementSubjectName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('contract.field.management_subject')}
              error={!!errors.sublocatedContract?.managementSubjectName}
              helperText={errors.sublocatedContract?.managementSubjectName?.message}
              readonly={readonly}
              disabled
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="sublocatedContract.contractTypeDescription"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('contract.field.contract_type')}
              error={!!errors.sublocatedContract?.contractTypeDescription}
              helperText={errors.sublocatedContract?.contractTypeDescription?.message}
              readonly={readonly}
              disabled
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="sublocatedContract.reason"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('contract.field.contract_reason')}
              options={Object.values(Reason)}
              getOptionLabel={(option) => t(`common.enum.reason.${option}`)}
              error={!!errors.sublocatedContract?.reason}
              helperText={errors.sublocatedContract?.reason?.message}
              readonly={readonly}
              disabled
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="sublocatedContract.agreementDate"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('contract.field.agreement_date')}
              error={!!errors.sublocatedContract?.agreementDate}
              helperText={errors.sublocatedContract?.agreementDate?.message}
              readonly={readonly}
              disabled
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="sublocatedContract.effectStartDate"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('contract.field.effect_date')}
              error={!!errors.sublocatedContract?.effectStartDate}
              helperText={errors.sublocatedContract?.effectStartDate?.message}
              readonly={readonly}
              disabled
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="sublocatedContract.lastRenewalStartDate"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('contract.field.last_renewal_date')}
              error={!!errors.sublocatedContract?.lastRenewalStartDate}
              helperText={errors.sublocatedContract?.lastRenewalStartDate?.message}
              readonly={readonly}
              disabled
              required
            />
          )}
        />
      </Grid2>
      <SectionTitle value="contract.section_title.expirations" />
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="sublocatedContract.firstTermDurationMonths"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              onChange={handleFirstTermDurationMonthsChange(field.onChange)}
              type="number"
              label={t('contract.field.first_term_duration')}
              error={!!errors.sublocatedContract?.firstTermDurationMonths}
              helperText={errors.sublocatedContract?.firstTermDurationMonths?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="sublocatedContract.secondTermDurationMonths"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              onChange={handleSecondTermDurationMonthsChange(field.onChange)}
              type="number"
              label={t('contract.field.second_term_duration')}
              error={!!errors.sublocatedContract?.secondTermDurationMonths}
              helperText={errors.sublocatedContract?.secondTermDurationMonths?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="sublocatedContract.firstTermExpirationDate"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('contract.field.first_term_expiration')}
              error={!!errors.sublocatedContract?.firstTermExpirationDate}
              helperText={errors.sublocatedContract?.firstTermExpirationDate?.message}
              readonly={readonly}
              clearable
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="sublocatedContract.secondTermExpirationDate"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('contract.field.second_term_expiration')}
              error={!!errors.sublocatedContract?.secondTermExpirationDate}
              helperText={errors.sublocatedContract?.secondTermExpirationDate?.message}
              readonly={readonly}
              clearable
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="sublocatedContract.anytimeTerminationWarningMonths"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label={t('contract.field.anytime_termination_months')}
              error={!!errors.sublocatedContract?.anytimeTerminationWarningMonths}
              helperText={errors.sublocatedContract?.anytimeTerminationWarningMonths?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="sublocatedContract.nonRenewalWarningMonths"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label={t('contract.field.non_renewal_months')}
              error={!!errors.sublocatedContract?.nonRenewalWarningMonths}
              helperText={errors.sublocatedContract?.nonRenewalWarningMonths?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      {mode === FormMode.Edit && (
        <>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="sublocatedContract.terminationDate"
              control={control}
              render={({ field }) => (
                <DateField
                  {...field}
                  label={t('contract.field.termination_date')}
                  error={!!errors.sublocatedContract?.terminationDate}
                  helperText={errors.sublocatedContract?.terminationDate?.message}
                  readonly={readonly}
                  clearable
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="sublocatedContract.terminator"
              control={control}
              render={({ field }) => (
                <SelectField
                  {...field}
                  label={t('contract.field.terminator')}
                  options={Object.values(ContractTerminator)}
                  getOptionLabel={(option) => t(`common.enum.contract_terminator.${option}`)}
                  error={!!errors.sublocatedContract?.terminator}
                  helperText={errors.sublocatedContract?.terminator?.message}
                  readonly={readonly}
                  clearable
                />
              )}
            />
          </Grid2>
        </>
      )}
    </Grid2>
  );
};
