import { MAX_DATE, MIN_DATE } from '@realgimm5/frontend-common/configs';
import {
  getDateMaxTranslation,
  getDateMinTranslation,
  getDateNotAfterTranslation,
  getDateNotBeforeTranslation,
  getRequiredTranslation,
} from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { date, number, object, ref } from 'yup';

export const getInterestRateSchema = (language: string, t: TFunction) =>
  object().shape(
    {
      since: date()
        .required(getRequiredTranslation('interest_rate.field.since', t))
        .min(MIN_DATE, getDateMinTranslation('interest_rate.field.since', language, t))
        .max(MAX_DATE, getDateMaxTranslation('interest_rate.field.since', language, t))
        .when('until', {
          is: (value: Date | null) => value !== null,
          then: (schema) =>
            schema.max(
              ref('until'),
              getDateNotAfterTranslation('interest_rate.field.since', 'interest_rate.field.until', t),
            ),
        }),
      until: date()
        .nullable()
        .min(MIN_DATE, getDateMinTranslation('interest_rate.field.until', language, t))
        .max(MAX_DATE, getDateMaxTranslation('interest_rate.field.until', language, t))
        .when('since', {
          is: (value: Date | null) => value !== null,
          then: (schema) =>
            schema.min(
              ref('since'),
              getDateNotBeforeTranslation('interest_rate.field.until', 'interest_rate.field.since', t),
            ),
        }),
      rate: number().required(getRequiredTranslation('interest_rate.field.rate', t)),
    },
    [['since', 'until']],
  );
