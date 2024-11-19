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

export const getBillAccountingDataSchema = (language: string, t: TFunction, min = 1) =>
  object().shape({
    billRows: array()
      .min(min)
      .of(
        object().shape(
          {
            amount: number().required(getRequiredTranslation('bill.field.bill_row_amount', t)),
            billItemType: object().required(getRequiredTranslation('bill.field.bill_row_item_type', t)),
            since: date()
              .nullable()
              .min(MIN_DATE, getDateMinTranslation('bill.field.bill_row_since', language, t))
              .max(MAX_DATE, getDateMaxTranslation('bill.field.bill_row_since', language, t))
              .when('until', {
                is: (value: Date | null) => value !== null,
                then: (schema) =>
                  schema.max(
                    ref('until'),
                    getDateNotAfterTranslation('bill.field.bill_row_since', 'bill.field.bill_row_until', t),
                  ),
              }),
            until: date()
              .nullable()
              .min(MIN_DATE, getDateMinTranslation('bill.field.bill_row_until', language, t))
              .max(MAX_DATE, getDateMaxTranslation('bill.field.bill_row_until', language, t))
              .when('since', {
                is: (value: Date | null) => value !== null,
                then: (schema) =>
                  schema.min(
                    ref('since'),
                    getDateNotBeforeTranslation('bill.field.bill_row_until', 'bill.field.bill_row_since', t),
                  ),
              }),
            vatRate: object().required(getRequiredTranslation('bill.field.bill_row_vat_code', t)),
          },
          [['since', 'until']],
        ),
      ),
  });
