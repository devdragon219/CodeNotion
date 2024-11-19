import { Box, Grid2 } from '@mui/material';
import { CheckboxField, DateField, SectionTitle, SelectField, TextField } from '@realgimm5/frontend-common/components';
import { DEFAULT_BORDER_RADIUS } from '@realgimm5/frontend-common/configs';
import { FormMode } from '@realgimm5/frontend-common/enums';
import {
  ContractTerminator,
  EntryStatus,
  PersonType,
  Reason,
  ReleaseReason,
} from '@realgimm5/frontend-common/gql/types';
import { addMonths } from 'date-fns';
import { useCallback } from 'react';
import { Controller, FieldPath, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ContractFormInput } from '../../../../interfaces/FormInputs/Contract';
import { SubjectField } from '../../../core/Fields/Subject/Subject';
import { ContractTypeField } from './ContractTypeField/ContractTypeField';
import { ContractGeneralDataProps } from './GeneralData.types';

export const ContractGeneralData = ({
  control,
  errors,
  isContractActive,
  mode,
  readonly,
  setValue,
  trigger,
}: ContractGeneralDataProps) => {
  const { t } = useTranslation();
  const isReleased = useWatch({ control, name: 'isReleased' });
  const effectStartDate = useWatch({ control, name: 'effectStartDate' });
  const firstTermDurationMonths = useWatch({ control, name: 'firstTermDurationMonths' });
  const secondTermDurationMonths = useWatch({ control, name: 'secondTermDurationMonths' });

  const setTrigger = useCallback(
    (names: FieldPath<ContractFormInput>[]) => {
      const executeTrigger = async () => {
        await trigger(names);
      };

      void executeTrigger();
    },
    [trigger],
  );

  const handleEffectStartDateChange = useCallback(
    (onChange: (value: Date | null) => void) => (value: Date | null) => {
      onChange(value);
      setValue('lastRenewalStartDate', value);

      if (!value) {
        setValue('firstTermExpirationDate', null);
        setValue('secondTermExpirationDate', null);
      } else if (firstTermDurationMonths) {
        setValue('firstTermExpirationDate', addMonths(value, firstTermDurationMonths));
        if (secondTermDurationMonths) {
          setValue('secondTermExpirationDate', addMonths(value, firstTermDurationMonths + secondTermDurationMonths));
        }
      } else if (secondTermDurationMonths) {
        setValue('secondTermExpirationDate', addMonths(value, secondTermDurationMonths));
      }

      setTrigger(['firstTermExpirationDate', 'secondTermExpirationDate', 'lastRenewalStartDate']);
    },
    [firstTermDurationMonths, secondTermDurationMonths, setTrigger, setValue],
  );

  const handleFirstTermDurationMonthsChange = useCallback(
    (onChange: (value: number | null) => void) => (value: number | null) => {
      onChange(value);

      if (!value) {
        setValue('firstTermExpirationDate', null);
        if (effectStartDate && secondTermDurationMonths) {
          setValue('secondTermExpirationDate', addMonths(effectStartDate, secondTermDurationMonths));
        } else {
          setValue('secondTermExpirationDate', null);
        }
      } else if (effectStartDate) {
        setValue('firstTermExpirationDate', addMonths(effectStartDate, value));
        if (secondTermDurationMonths) {
          setValue('secondTermExpirationDate', addMonths(effectStartDate, value + secondTermDurationMonths));
        }
      } else {
        setValue('firstTermExpirationDate', null);
      }

      setTrigger(['firstTermExpirationDate', 'secondTermExpirationDate']);
    },
    [effectStartDate, secondTermDurationMonths, setTrigger, setValue],
  );

  const handleSecondTermDurationMonthsChange = useCallback(
    (onChange: (value: number | null) => void) => (value: number | null) => {
      onChange(value);

      if (!value) {
        setValue('secondTermExpirationDate', null);
      } else if (effectStartDate) {
        if (firstTermDurationMonths) {
          setValue('secondTermExpirationDate', addMonths(effectStartDate, value + firstTermDurationMonths));
        } else {
          setValue('secondTermExpirationDate', addMonths(effectStartDate, value));
        }
      } else {
        setValue('secondTermExpirationDate', null);
      }

      setTrigger(['secondTermExpirationDate']);
    },
    [effectStartDate, firstTermDurationMonths, setTrigger, setValue],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {mode === FormMode.Edit && isReleased && (
        <Grid2 size={12}>
          <Box
            sx={(theme) => ({
              p: 3,
              borderRadius: `${DEFAULT_BORDER_RADIUS}px`,
              border: `1px solid ${theme.palette.danger[300]}`,
            })}
          >
            <Grid2 container spacing={{ xs: 2, sm: 3 }}>
              <SectionTitle value="contract.section_title.release_contract" />
              <Grid2 size={{ xs: 12, sm: 4 }}>
                <Controller
                  name="releaseReason"
                  control={control}
                  render={({ field }) => (
                    <SelectField
                      {...field}
                      options={Object.values(ReleaseReason)}
                      getOptionLabel={(option) => t(`common.enum.release_reason.${option}`)}
                      label={t('contract.field.release_reason')}
                      readonly={readonly}
                      disabled
                      required
                    />
                  )}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 4 }}>
                <Controller
                  name="releaseDate"
                  control={control}
                  render={({ field }) => (
                    <DateField
                      {...field}
                      label={t('contract.field.release_date')}
                      readonly={readonly}
                      disabled
                      required
                    />
                  )}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 4 }}>
                <Controller
                  name="isOccupiedWithoutRight"
                  control={control}
                  render={({ field }) => (
                    <CheckboxField
                      {...field}
                      label={t('contract.field.occupied_without_rights')}
                      readonly={readonly}
                      disabled
                    />
                  )}
                />
              </Grid2>
            </Grid2>
          </Box>
        </Grid2>
      )}
      <SectionTitle value="contract.section_title.contract_data" />
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="internalCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('contract.field.contract_code')}
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
          name="previousCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('contract.field.previous_code')}
              error={!!errors.previousCode}
              helperText={errors.previousCode?.message}
              readonly={readonly}
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
              label={t('contract.field.external_code')}
              error={!!errors.externalCode}
              helperText={errors.externalCode?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('contract.field.contract_status')}
              options={[
                EntryStatus.Working,
                EntryStatus.IncompleteDraft,
                ...(mode === FormMode.Edit ? [EntryStatus.FrozenClosed] : []),
              ]}
              getOptionLabel={(option) => t(`common.enum.entry_status.${option}`)}
              error={!!errors.status}
              helperText={errors.status?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="managementSubject"
          control={control}
          render={({ field }) => (
            <SubjectField
              {...field}
              label={t('contract.field.management_subject')}
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
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <ContractTypeField
          control={control}
          errors={errors}
          isContractActive={isContractActive}
          readonly={readonly}
          setValue={setValue}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="reason"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('contract.field.contract_reason')}
              options={Object.values(Reason)}
              getOptionLabel={(option) => t(`common.enum.reason.${option}`)}
              error={!!errors.reason}
              helperText={errors.reason?.message}
              readonly={readonly}
              required
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
              label={t('contract.field.agreement_date')}
              error={!!errors.agreementDate}
              helperText={errors.agreementDate?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="effectStartDate"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              onChange={handleEffectStartDateChange(field.onChange)}
              label={t('contract.field.effect_date')}
              error={!!errors.effectStartDate}
              helperText={errors.effectStartDate?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="lastRenewalStartDate"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('contract.field.last_renewal_date')}
              error={!!errors.lastRenewalStartDate}
              helperText={errors.lastRenewalStartDate?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <SectionTitle value="contract.section_title.expirations" />
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="firstTermDurationMonths"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              onChange={handleFirstTermDurationMonthsChange(field.onChange)}
              type="number"
              label={t('contract.field.first_term_duration')}
              error={!!errors.firstTermDurationMonths}
              helperText={errors.firstTermDurationMonths?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="secondTermDurationMonths"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              onChange={handleSecondTermDurationMonthsChange(field.onChange)}
              type="number"
              label={t('contract.field.second_term_duration')}
              error={!!errors.secondTermDurationMonths}
              helperText={errors.secondTermDurationMonths?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="firstTermExpirationDate"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('contract.field.first_term_expiration')}
              error={!!errors.firstTermExpirationDate}
              helperText={errors.firstTermExpirationDate?.message}
              readonly={readonly}
              clearable
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="secondTermExpirationDate"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('contract.field.second_term_expiration')}
              error={!!errors.secondTermExpirationDate}
              helperText={errors.secondTermExpirationDate?.message}
              readonly={readonly}
              clearable
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="anytimeTerminationWarningMonths"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label={t('contract.field.anytime_termination_months')}
              error={!!errors.anytimeTerminationWarningMonths}
              helperText={errors.anytimeTerminationWarningMonths?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="nonRenewalWarningMonths"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label={t('contract.field.non_renewal_months')}
              error={!!errors.nonRenewalWarningMonths}
              helperText={errors.nonRenewalWarningMonths?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      {mode === FormMode.Edit && (
        <>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="terminationDate"
              control={control}
              render={({ field }) => (
                <DateField
                  {...field}
                  label={t('contract.field.termination_date')}
                  error={!!errors.terminationDate}
                  helperText={errors.terminationDate?.message}
                  readonly={readonly}
                  clearable
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="terminator"
              control={control}
              render={({ field }) => (
                <SelectField
                  {...field}
                  label={t('contract.field.terminator')}
                  options={Object.values(ContractTerminator)}
                  getOptionLabel={(option) => t(`common.enum.contract_terminator.${option}`)}
                  error={!!errors.terminator}
                  helperText={errors.terminator?.message}
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
