import { MAX_DATE, MIN_DATE } from '@realgimm5/frontend-common/configs';
import {
  getDateMaxTranslation,
  getDateMinTranslation,
  getDateNotAfterTranslation,
  getDateNotBeforeTranslation,
} from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { date, object, ref } from 'yup';

export const getContractSublocatedDataSchema = (isContractSublocated: boolean, language: string, t: TFunction) =>
  object().shape({
    sublocatedContract: object()
      .nullable()
      .requiredIf(isContractSublocated, t('contract.error.no_sublocated_contract'))
      .shape(
        {
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
      ),
  });
