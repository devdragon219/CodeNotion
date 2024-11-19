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

export const getEstateSubUnitSchema = (language: string, t: TFunction) =>
  object().shape(
    {
      internalCode: string().required(getRequiredTranslation('estate_sub_unit.field.internal_code', t)),
      occupantType: string().required(getRequiredTranslation('estate_sub_unit.field.occupant_type', t)),
      since: date()
        .nullable()
        .min(MIN_DATE, getDateMinTranslation('estate_sub_unit.field.since', language, t))
        .max(MAX_DATE, getDateMaxTranslation('estate_sub_unit.field.since', language, t))
        .when('until', {
          is: (value: Date | null) => value !== null,
          then: (schema) =>
            schema.max(
              ref('until'),
              getDateNotAfterTranslation('estate_sub_unit.field.since', 'estate_sub_unit.field.until', t),
            ),
        }),
      until: date()
        .nullable()
        .min(MIN_DATE, getDateMinTranslation('estate_sub_unit.field.until', language, t))
        .max(MAX_DATE, getDateMaxTranslation('estate_sub_unit.field.until', language, t))
        .when('since', {
          is: (value: Date | null) => value !== null,
          then: (schema) =>
            schema.min(
              ref('since'),
              getDateNotBeforeTranslation('estate_sub_unit.field.until', 'estate_sub_unit.field.since', t),
            ),
        }),
    },
    [['since', 'until']],
  );
