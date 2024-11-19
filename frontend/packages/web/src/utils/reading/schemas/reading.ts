import { MAX_DATE, MIN_DATE } from '@realgimm5/frontend-common/configs';
import { getDateMaxTranslation, getDateMinTranslation, getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { array, date, number, object } from 'yup';

export const getReadingSchema = (isReading: boolean, language: string, t: TFunction) =>
  object().shape({
    readingTimestamp: date()
      .required(getRequiredTranslation(`${isReading ? 'reading' : 'usage'}.field.date`, t))
      .min(MIN_DATE, getDateMinTranslation(`${isReading ? 'reading' : 'usage'}.field.date`, language, t))
      .max(MAX_DATE, getDateMaxTranslation(`${isReading ? 'reading' : 'usage'}.field.date`, language, t)),
    values: array().of(
      object()
        .shape({
          value: number().nullable(),
        })
        .test('valid', function ({ value }) {
          if (value !== undefined && value !== null) return true;

          const { index } = this.options as { index: number };
          const { createError, path } = this;
          return createError({
            path: `${path}.value`,
            message: getRequiredTranslation(`${isReading ? 'reading' : 'usage'}.field.value`, t, {
              index,
            }),
          });
        }),
    ),
  });
