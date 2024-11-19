import { MAX_DATE, MIN_DATE } from '@realgimm5/frontend-common/configs';
import {
  getDateMaxTranslation,
  getDateMinTranslation,
  getDateNotAfterTranslation,
  getDateNotBeforeTranslation,
  getRequiredTranslation,
} from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { array, date, object, ref, string } from 'yup';

export const getWorkersSchema = (language: string, t: TFunction) =>
  object().shape({
    workers: array().of(
      object().shape(
        {
          firstName: string().required(getRequiredTranslation('component.worker.field.worker_first_name', t)),
          lastName: string().required(getRequiredTranslation('component.worker.field.worker_last_name', t)),
          since: date()
            .required(getRequiredTranslation('component.worker.field.worker_since', t))
            .min(MIN_DATE, getDateMinTranslation('component.worker.field.worker_since', language, t))
            .max(MAX_DATE, getDateMaxTranslation('component.worker.field.worker_since', language, t))
            .when('until', {
              is: (value: Date | null) => value !== null,
              then: (schema) =>
                schema.max(
                  ref('until'),
                  getDateNotAfterTranslation(
                    'component.worker.field.worker_since',
                    'component.worker.field.worker_until',
                    t,
                  ),
                ),
            }),
          until: date()
            .nullable()
            .min(MIN_DATE, getDateMinTranslation('component.worker.field.worker_until', language, t))
            .max(MAX_DATE, getDateMaxTranslation('component.worker.field.worker_until', language, t))
            .when('since', {
              is: (value: Date | null) => value !== null,
              then: (schema) =>
                schema.min(
                  ref('since'),
                  getDateNotBeforeTranslation(
                    'component.worker.field.worker_until',
                    'component.worker.field.worker_since',
                    t,
                  ),
                ),
            }),
          craft: object().required(getRequiredTranslation('component.worker.field.worker_craft', t)),
          qualificationLevel: object().required(getRequiredTranslation('component.worker.field.worker_level', t)),
        },
        [['since', 'until']],
      ),
    ),
  });
