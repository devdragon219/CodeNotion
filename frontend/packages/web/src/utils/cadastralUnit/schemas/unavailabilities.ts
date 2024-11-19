import { MAX_DATE, MIN_DATE } from '@realgimm5/frontend-common/configs';
import {
  getDateMaxTranslation,
  getDateMinTranslation,
  getDateNotAfterTranslation,
  getDateNotBeforeTranslation,
} from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { array, date, object, ref } from 'yup';

export const getCadastralUnitUnavailabilitiesSchema = (language: string, t: TFunction) =>
  object().shape({
    unavailabilities: array().of(
      object().shape(
        {
          since: date()
            .nullable()
            .min(MIN_DATE, getDateMinTranslation('cadastral_unit.field.unavailability_since', language, t))
            .max(MAX_DATE, getDateMaxTranslation('cadastral_unit.field.unavailability_since', language, t))
            .when('until', {
              is: (value: Date | null) => value !== null,
              then: (schema) =>
                schema.max(
                  ref('until'),
                  getDateNotAfterTranslation(
                    'cadastral_unit.field.unavailability_since',
                    'cadastral_unit.field.unavailability_until',
                    t,
                  ),
                ),
            }),
          until: date()
            .nullable()
            .min(MIN_DATE, getDateMinTranslation('cadastral_unit.field.unavailability_until', language, t))
            .max(MAX_DATE, getDateMaxTranslation('cadastral_unit.field.unavailability_until', language, t))
            .when('since', {
              is: (value: Date | null) => value !== null,
              then: (schema) =>
                schema.min(
                  ref('since'),
                  getDateNotBeforeTranslation(
                    'cadastral_unit.field.unavailability_until',
                    'cadastral_unit.field.unavailability_since',
                    t,
                  ),
                ),
            }),
        },
        [['since', 'until']],
      ),
    ),
  });
