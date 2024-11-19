import { MAX_DATE, MIN_DATE } from '@realgimm5/frontend-common/configs';
import { getDateMaxTranslation, getDateMinTranslation, getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { date, object, string } from 'yup';

export const getContractReleaseSchema = (language: string, t: TFunction) =>
  object().shape(
    {
      date: date()
        .nullable()
        .min(MIN_DATE, getDateMinTranslation('contract.field.release_date', language, t))
        .max(MAX_DATE, getDateMaxTranslation('contract.field.release_date', language, t))
        .when(['isOccupiedWithoutRight', 'reason'], ([isOccupiedWithoutRight, reason], schema) => {
          return schema.requiredIf(
            !isOccupiedWithoutRight || !reason,
            getRequiredTranslation('contract.field.release_date', t),
          );
        }),
      reason: string()
        .nullable()
        .when(['isOccupiedWithoutRight', 'date'], ([isOccupiedWithoutRight, date], schema) => {
          return schema.requiredIf(
            !isOccupiedWithoutRight || !date,
            getRequiredTranslation('contract.field.release_reason', t),
          );
        }),
    },
    [['date', 'reason']],
  );
