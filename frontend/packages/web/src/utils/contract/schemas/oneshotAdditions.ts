import { MAX_DATE, MIN_DATE } from '@realgimm5/frontend-common/configs';
import {
  getDateMaxTranslation,
  getDateMinTranslation,
  getDateNotAfterTranslation,
  getDateNotBeforeTranslation,
  getRequiredTranslation,
} from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { array, date, number, object, ref } from 'yup';

export const getContractOneshotAdditionSchema = (language: string, t: TFunction) =>
  object().shape(
    {
      accountingItem: object().required(getRequiredTranslation('contract.field.oneshot_addition_accounting_item', t)),
      amount: number().required(getRequiredTranslation('contract.field.oneshot_addition_amount', t)),
      billItemType: object().required(getRequiredTranslation('contract.field.oneshot_addition_bill_item', t)),
      startDate: date()
        .required(getRequiredTranslation('contract.field.oneshot_addition_start_date', t))
        .min(MIN_DATE, getDateMinTranslation('contract.field.oneshot_addition_start_date', language, t))
        .max(MAX_DATE, getDateMaxTranslation('contract.field.oneshot_addition_start_date', language, t)),
      termStartDate: date()
        .nullable()
        .min(MIN_DATE, getDateMinTranslation('contract.field.oneshot_addition_term_start_date', language, t))
        .max(MAX_DATE, getDateMaxTranslation('contract.field.oneshot_addition_term_start_date', language, t))
        .when('termEndDate', {
          is: (value: Date | null) => value !== null,
          then: (schema) =>
            schema.max(
              ref('termEndDate'),
              getDateNotAfterTranslation(
                'contract.field.oneshot_addition_term_start_date',
                'contract.field.oneshot_addition_term_end_date',
                t,
              ),
            ),
        }),
      termEndDate: date()
        .nullable()
        .min(MIN_DATE, getDateMinTranslation('contract.field.oneshot_addition_term_end_date', language, t))
        .max(MAX_DATE, getDateMaxTranslation('contract.field.oneshot_addition_term_end_date', language, t))
        .when('termStartDate', {
          is: (value: Date | null) => value !== null,
          then: (schema) =>
            schema.min(
              ref('termStartDate'),
              getDateNotBeforeTranslation(
                'contract.field.oneshot_addition_term_end_date',
                'contract.field.oneshot_addition_term_start_date',
                t,
              ),
            ),
        }),
      vatRate: object().required(getRequiredTranslation('contract.field.oneshot_addition_vat_rate', t)),
    },
    [['termStartDate', 'termEndDate']],
  );

export const getContractOneshotAdditionsSchema = (language: string, t: TFunction) =>
  object().shape({
    oneshotAdditions: array().of(getContractOneshotAdditionSchema(language, t)),
  });
