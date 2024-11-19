import { MAX_DATE, MIN_DATE } from '@realgimm5/frontend-common/configs';
import { EntryStatus } from '@realgimm5/frontend-common/gql/types';
import {
  getDateMaxTranslation,
  getDateMinTranslation,
  getDateNotAfterTranslation,
  getDateNotBeforeTranslation,
  getRequiredTranslation,
} from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { array, date, object, ref, string } from 'yup';

import { SubjectBankAccountFormInput } from '../../../interfaces/FormInputs/Subject';

export const getSubjectAccountingDataSchema = (
  entryStatus: EntryStatus | null,
  language: string,
  t: TFunction,
  existingBankAccounts?: SubjectBankAccountFormInput[],
) =>
  object().shape({
    bankAccounts: array().of(
      object()
        .shape({
          referenceCode: string()
            .iban(t('core.error.iban'))
            .requiredIf(
              entryStatus !== EntryStatus.IncompleteDraft,
              getRequiredTranslation('subject.field.bank_account_number', t),
            ),
          accountHolder: string().requiredIf(
            entryStatus !== EntryStatus.IncompleteDraft,
            getRequiredTranslation('subject.field.bank_account_holder', t),
          ),
        })
        .unique('referenceCode', existingBankAccounts?.map((it) => it.referenceCode) ?? [], t('subject.error.iban')),
    ),
    taxStatusSplitPayment: object()
      .nullable()
      .shape(
        {
          since: date()
            .nullable()
            .min(MIN_DATE, getDateMinTranslation('subject.field.tax_status_split_payment_since', language, t))
            .max(MAX_DATE, getDateMaxTranslation('subject.field.tax_status_split_payment_since', language, t))
            .when('until', {
              is: (value: Date | null) => value !== null,
              then: (schema) =>
                schema.max(
                  ref('until'),
                  getDateNotAfterTranslation(
                    'subject.field.tax_status_split_payment_since',
                    'subject.field.tax_status_split_payment_until',
                    t,
                  ),
                ),
            }),
          until: date()
            .nullable()
            .min(MIN_DATE, getDateMinTranslation('subject.field.tax_status_split_payment_until', language, t))
            .max(MAX_DATE, getDateMaxTranslation('subject.field.tax_status_split_payment_until', language, t))
            .when('since', {
              is: (value: Date | null) => value !== null,
              then: (schema) =>
                schema.min(
                  ref('since'),
                  getDateNotBeforeTranslation(
                    'subject.field.tax_status_split_payment_until',
                    'subject.field.tax_status_split_payment_since',
                    t,
                  ),
                ),
            }),
        },
        [['since', 'until']],
      ),
  });
