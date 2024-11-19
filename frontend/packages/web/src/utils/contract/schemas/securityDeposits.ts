import { MAX_DATE, MIN_DATE } from '@realgimm5/frontend-common/configs';
import { SecurityDepositType } from '@realgimm5/frontend-common/gql/types';
import {
  getDateMaxTranslation,
  getDateMinTranslation,
  getDateNotBeforeTranslation,
  getRequiredTranslation,
} from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { array, date, number, object, ref, string } from 'yup';

export const getContractSecurityDepositsSchema = (language: string, t: TFunction) =>
  object().shape({
    securityDeposits: array().of(
      object().shape({
        securityDepositType: string().required(getRequiredTranslation('contract.field.security_deposit_type', t)),
        since: date()
          .required(getRequiredTranslation('contract.field.security_deposit_since', t))
          .min(MIN_DATE, getDateMinTranslation('contract.field.security_deposit_type', language, t))
          .max(MAX_DATE, getDateMaxTranslation('contract.field.security_deposit_type', language, t)),
        baseAmount: number().required(getRequiredTranslation('contract.field.security_deposit_amount', t)),
        interestCalculationStartDate: date()
          .nullable()
          .min(MIN_DATE, getDateMinTranslation('contract.field.security_deposit_interest_start_date', language, t))
          .max(MAX_DATE, getDateMaxTranslation('contract.field.security_deposit_interest_start_date', language, t))
          .when(['isInterestCalculated', 'since'], ([isInterestCalculated, since], schema) => {
            if (!isInterestCalculated || !since) {
              return schema;
            }

            if (!since) {
              return schema.required(getRequiredTranslation('contract.field.security_deposit_interest_start_date', t));
            }

            return schema
              .required(getRequiredTranslation('contract.field.security_deposit_interest_start_date', t))
              .min(
                since,
                getDateNotBeforeTranslation(
                  'contract.field.security_deposit_interest_start_date',
                  'contract.field.security_deposit_since',
                  t,
                ),
              );
          }),
        takeoverDate: date()
          .nullable()
          .min(MIN_DATE, getDateMinTranslation('contract.field.security_deposit_takeover_date', language, t))
          .max(MAX_DATE, getDateMaxTranslation('contract.field.security_deposit_takeover_date', language, t))
          .when('since', {
            is: (value: Date | null) => value !== null,
            then: (schema) =>
              schema.min(
                ref('since'),
                getDateNotBeforeTranslation(
                  'contract.field.security_deposit_takeover_date',
                  'contract.field.security_deposit_since',
                  t,
                ),
              ),
          }),
        subject: object()
          .nullable()
          .when('securityDepositType', {
            is: SecurityDepositType.Cash,
            then: (schema) => schema.required(getRequiredTranslation('contract.field.security_deposit_subject', t)),
          }),
        subjectBankAccount: object()
          .nullable()
          .when('securityDepositType', {
            is: SecurityDepositType.Cash,
            then: (schema) =>
              schema.required(getRequiredTranslation('contract.field.security_deposit_bank_account', t)),
          }),
        until: date()
          .nullable()
          .min(MIN_DATE, getDateMinTranslation('contract.field.security_deposit_until', language, t))
          .max(MAX_DATE, getDateMaxTranslation('contract.field.security_deposit_until', language, t))
          .when(['securityDepositType', 'since'], ([securityDepositType, since], schema) => {
            if (
              ![SecurityDepositType.BankSurety, SecurityDepositType.InsuranceSurety].includes(
                securityDepositType as SecurityDepositType,
              )
            ) {
              return schema;
            }

            if (!since) {
              return schema.required(getRequiredTranslation('contract.field.security_deposit_until', t));
            }

            return schema
              .required(getRequiredTranslation('contract.field.security_deposit_until', t))
              .min(
                since,
                getDateNotBeforeTranslation(
                  'contract.field.security_deposit_until',
                  'contract.field.security_deposit_since',
                  t,
                ),
              );
          }),
        suretySubject: object()
          .nullable()
          .when('securityDepositType', {
            is: (value: SecurityDepositType | null) =>
              value && [SecurityDepositType.BankSurety, SecurityDepositType.InsuranceSurety].includes(value),
            then: (schema) =>
              schema.required(getRequiredTranslation('contract.field.security_deposit_surety_subject', t)),
          }),
      }),
    ),
  });
