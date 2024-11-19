import { MAX_DATE, MIN_DATE } from '@realgimm5/frontend-common/configs';
import {
  getDateMaxTranslation,
  getDateMinTranslation,
  getDateNotAfterTranslation,
  getDateNotBeforeTranslation,
  getRequiredTranslation,
} from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { date, object, ref, string } from 'yup';

export const getContractGeneralDataSchema = (canUseInternalCode: boolean, language: string, t: TFunction) =>
  object().shape(
    {
      internalCode: string()
        .required(getRequiredTranslation('contract.field.contract_code', t))
        .valid(canUseInternalCode, t('contract.error.internal_code')),
      status: string().required(getRequiredTranslation('contract.field.contract_status', t)),
      managementSubject: object().required(getRequiredTranslation('contract.field.management_subject', t)),
      contractType: object().required(getRequiredTranslation('contract.field.contract_type', t)),
      reason: string().required(getRequiredTranslation('contract.field.contract_reason', t)),
      agreementDate: date()
        .required(getRequiredTranslation('contract.field.agreement_date', t))
        .min(MIN_DATE, getDateMinTranslation('contract.field.agreement_date', language, t))
        .max(MAX_DATE, getDateMaxTranslation('contract.field.agreement_date', language, t)),
      effectStartDate: date()
        .required(getRequiredTranslation('contract.field.effect_date', t))
        .min(MIN_DATE, getDateMinTranslation('contract.field.effect_date', language, t))
        .max(MAX_DATE, getDateMaxTranslation('contract.field.effect_date', language, t))
        .when('agreementDate', {
          is: (value: Date | null) => value !== null,
          then: (schema) =>
            schema.min(
              ref('agreementDate'),
              getDateNotBeforeTranslation('contract.field.effect_date', 'contract.field.agreement_date', t),
            ),
        }),
      lastRenewalStartDate: date()
        .required(getRequiredTranslation('contract.field.last_renewal_date', t))
        .min(MIN_DATE, getDateMinTranslation('contract.field.last_renewal_date', language, t))
        .max(MAX_DATE, getDateMaxTranslation('contract.field.last_renewal_date', language, t))
        .when('agreementDate', {
          is: (value: Date | null) => value !== null,
          then: (schema) =>
            schema.min(
              ref('agreementDate'),
              getDateNotBeforeTranslation('contract.field.last_renewal_date', 'contract.field.agreement_date', t),
            ),
        }),
      firstTermExpirationDate: date()
        .nullable()
        .min(MIN_DATE, getDateMinTranslation('contract.field.first_term_expiration', language, t))
        .max(MAX_DATE, getDateMaxTranslation('contract.field.first_term_expiration', language, t))
        .when('secondTermExpirationDate', {
          is: (value: Date | null) => value !== null,
          then: (schema) =>
            schema.max(
              ref('secondTermExpirationDate'),
              getDateNotAfterTranslation(
                'contract.field.first_term_expiration',
                'contract.field.second_term_expiration',
                t,
              ),
            ),
        }),
      secondTermExpirationDate: date()
        .nullable()
        .min(MIN_DATE, getDateMinTranslation('contract.field.second_term_expiration', language, t))
        .max(MAX_DATE, getDateMaxTranslation('contract.field.second_term_expiration', language, t))
        .when('firstTermExpirationDate', {
          is: (value: Date | null) => value !== null,
          then: (schema) =>
            schema.min(
              ref('firstTermExpirationDate'),
              getDateNotBeforeTranslation(
                'contract.field.second_term_expiration',
                'contract.field.first_term_expiration',
                t,
              ),
            ),
        }),
      terminationDate: date()
        .nullable()
        .min(MIN_DATE, getDateMinTranslation('contract.field.termination_date', language, t))
        .max(MAX_DATE, getDateMaxTranslation('contract.field.termination_date', language, t)),
    },
    [['firstTermExpirationDate', 'secondTermExpirationDate']],
  );
