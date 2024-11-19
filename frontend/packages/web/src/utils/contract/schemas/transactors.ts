import { MAX_DATE, MIN_DATE } from '@realgimm5/frontend-common/configs';
import {
  getDateMaxTranslation,
  getDateMinTranslation,
  getPercentMaxTranslation,
  getRequiredTranslation,
} from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { array, date, number, object, string } from 'yup';

export const getContractTransactorsSchema = (validateAll: boolean, language: string, t: TFunction) =>
  object().shape({
    transactors: array()
      .min(1, t('contract.error.no_subjects'))
      .of(
        object().shape({
          transactionSharePercent: number()
            .nullable()
            .max(100, getPercentMaxTranslation('contract.field.transactor_percent', t))
            .requiredIf(validateAll, getRequiredTranslation('contract.field.transactor_percent', t)),
          since: date()
            .nullable()
            .requiredIf(validateAll, getRequiredTranslation('contract.field.transactor_since', t))
            .min(MIN_DATE, getDateMinTranslation('contract.field.transactor_since', language, t))
            .max(MAX_DATE, getDateMaxTranslation('contract.field.transactor_since', language, t)),
          transactorType: string()
            .nullable()
            .requiredIf(validateAll, getRequiredTranslation('contract.field.transactor_type', t)),
          address: object()
            .nullable()
            .requiredIf(validateAll, getRequiredTranslation('contract.field.transactor_address', t)),
          invoiceAddress: object()
            .nullable()
            .requiredIf(validateAll, getRequiredTranslation('contract.field.transactor_invoice_address', t)),
        }),
      )
      .test('validateTransactors', function (value) {
        if (!validateAll) {
          return true;
        }

        const { createError, path } = this;
        const transactionSharePercent = (value ?? []).reduce<number>(
          (acc, counterpart) => acc + (counterpart.transactionSharePercent ?? 0),
          0,
        );
        const message = transactionSharePercent !== 100 ? t('contract.error.invalid_share_percent') : undefined;
        return !message || createError({ path, message });
      }),
  });
