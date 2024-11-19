import { Grid2 } from '@mui/material';
import { CheckboxField, CurrencyField, DateField, SelectField, TextField } from '@realgimm5/frontend-common/components';
import { PersonType, SecurityDepositType } from '@realgimm5/frontend-common/gql/types';
import { ChangeEvent, useCallback } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { getEmptyContractSecurityDepositFormInput } from '../../../../../utils/contract/initialValues';
import { SubjectField } from '../../../../core/Fields/Subject/Subject';
import { SecurityDepositFieldProps } from './Field.types';

export const SecurityDepositField = ({ control, errors, index, setValue }: SecurityDepositFieldProps) => {
  const { t } = useTranslation();
  const securityDepositType = useWatch({ control, name: `securityDeposits.${index}.securityDepositType` });
  const isInterestCalculated = useWatch({ control, name: `securityDeposits.${index}.isInterestCalculated` });
  const subject = useWatch({ control, name: `securityDeposits.${index}.subject` });

  const handleCheckboxChange = useCallback(
    (onChange: (checked: boolean) => void) => (_: ChangeEvent<HTMLInputElement>, checked: boolean) => {
      onChange(checked);

      setValue(`securityDeposits.${index}.interestCalculationStartDate`, null);
    },
    [index, setValue],
  );

  const handleSelectChange = useCallback(
    (securityDepositType: SecurityDepositType | null) => {
      setValue(`securityDeposits.${index}`, getEmptyContractSecurityDepositFormInput(securityDepositType));
    },
    [index, setValue],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name={`securityDeposits.${index}.securityDepositType`}
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              onChange={handleSelectChange}
              options={Object.values(SecurityDepositType)}
              getOptionLabel={(option) => t(`common.enum.security_deposit_type.${option}`)}
              label={t('contract.field.security_deposit_type')}
              error={!!errors.securityDeposits?.[index]?.securityDepositType}
              helperText={errors.securityDeposits?.[index]?.securityDepositType?.message}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name={`securityDeposits.${index}.since`}
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('contract.field.security_deposit_since')}
              error={!!errors.securityDeposits?.[index]?.since}
              helperText={errors.securityDeposits?.[index]?.since?.message}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name={`securityDeposits.${index}.baseAmount`}
          control={control}
          render={({ field }) => (
            <CurrencyField
              {...field}
              label={t('contract.field.security_deposit_amount')}
              error={!!errors.securityDeposits?.[index]?.baseAmount}
              helperText={errors.securityDeposits?.[index]?.baseAmount?.message}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }} sx={securityDepositType === SecurityDepositType.Cash ? {} : { display: 'none' }}>
        <Controller
          name={`securityDeposits.${index}.isInterestCalculated`}
          control={control}
          render={({ field }) => (
            <CheckboxField
              {...field}
              onChange={handleCheckboxChange(field.onChange)}
              label={t('contract.field.security_deposit_interest_calculated')}
              error={!!errors.securityDeposits?.[index]?.isInterestCalculated}
              helperText={errors.securityDeposits?.[index]?.isInterestCalculated?.message}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }} sx={securityDepositType === SecurityDepositType.Cash ? {} : { display: 'none' }}>
        <Controller
          name={`securityDeposits.${index}.interestCalculationStartDate`}
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('contract.field.security_deposit_interest_start_date')}
              error={!!errors.securityDeposits?.[index]?.interestCalculationStartDate}
              helperText={errors.securityDeposits?.[index]?.interestCalculationStartDate?.message}
              disabled={!isInterestCalculated}
              required={isInterestCalculated}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }} sx={securityDepositType === SecurityDepositType.Cash ? {} : { display: 'none' }}>
        <Controller
          name={`securityDeposits.${index}.takeoverDate`}
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('contract.field.security_deposit_takeover_date')}
              error={!!errors.securityDeposits?.[index]?.takeoverDate}
              helperText={errors.securityDeposits?.[index]?.takeoverDate?.message}
              clearable
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }} sx={securityDepositType === SecurityDepositType.Cash ? {} : { display: 'none' }}>
        <Controller
          name={`securityDeposits.${index}.subject`}
          control={control}
          render={({ field }) => (
            <SubjectField
              {...field}
              label={t('contract.field.security_deposit_subject')}
              error={!!errors.securityDeposits?.[index]?.subject}
              helperText={errors.securityDeposits?.[index]?.subject?.message}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }} sx={securityDepositType === SecurityDepositType.Cash ? {} : { display: 'none' }}>
        <Controller
          name={`securityDeposits.${index}.subjectBankAccount`}
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              options={subject?.bankAccounts ?? []}
              getOptionLabel={(option) => option.referenceCode ?? ''}
              getOptionKey={(option) => String(option.id)}
              label={t('contract.field.security_deposit_bank_account')}
              error={!!errors.securityDeposits?.[index]?.subjectBankAccount}
              helperText={errors.securityDeposits?.[index]?.subjectBankAccount?.message}
              disabled={!subject}
              required
            />
          )}
        />
      </Grid2>
      <Grid2
        size={{ xs: 12, sm: 4 }}
        sx={
          securityDepositType === SecurityDepositType.BankSurety ||
          securityDepositType === SecurityDepositType.InsuranceSurety
            ? {}
            : { display: 'none' }
        }
      >
        <Controller
          name={`securityDeposits.${index}.until`}
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('contract.field.security_deposit_until')}
              error={!!errors.securityDeposits?.[index]?.until}
              helperText={errors.securityDeposits?.[index]?.until?.message}
              required
            />
          )}
        />
      </Grid2>
      <Grid2
        size={{ xs: 12, sm: 4 }}
        sx={
          securityDepositType === SecurityDepositType.BankSurety ||
          securityDepositType === SecurityDepositType.InsuranceSurety
            ? {}
            : { display: 'none' }
        }
      >
        <Controller
          name={`securityDeposits.${index}.suretySubject`}
          control={control}
          render={({ field }) => (
            <SubjectField
              {...field}
              label={t('contract.field.security_deposit_surety_subject')}
              error={!!errors.securityDeposits?.[index]?.suretySubject}
              helperText={errors.securityDeposits?.[index]?.suretySubject?.message}
              required
              where={{
                personType: {
                  eq: PersonType.LegalPerson,
                },
              }}
            />
          )}
        />
      </Grid2>
      <Grid2
        size={{ xs: 12, sm: 4 }}
        sx={
          securityDepositType === SecurityDepositType.BankSurety ||
          securityDepositType === SecurityDepositType.InsuranceSurety
            ? {}
            : { display: 'none' }
        }
      >
        <Controller
          name={`securityDeposits.${index}.isSuretyRenewable`}
          control={control}
          render={({ field }) => (
            <CheckboxField
              {...field}
              label={t('contract.field.security_deposit_surety_renewable')}
              error={!!errors.securityDeposits?.[index]?.isSuretyRenewable}
              helperText={errors.securityDeposits?.[index]?.isSuretyRenewable?.message}
            />
          )}
        />
      </Grid2>
      <Grid2 size={12}>
        <Controller
          name={`securityDeposits.${index}.notes`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              multiline
              label={t('contract.field.notes')}
              error={!!errors.securityDeposits?.[index]?.notes}
              helperText={errors.securityDeposits?.[index]?.notes?.message}
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
