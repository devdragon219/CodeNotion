import { MAX_DATE, MIN_DATE } from '@realgimm5/frontend-common/configs';
import { DayOfWeek } from '@realgimm5/frontend-common/gql/types';
import {
  getDateMaxTranslation,
  getDateMinTranslation,
  getDateNotAfterTranslation,
  getDateNotBeforeTranslation,
  getRequiredTranslation,
} from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { array, boolean, date, object, ref, string } from 'yup';

import { CalendarDayTimeRangeFormInput } from '../../../interfaces/FormInputs/Calendar';

const getCalendarDaySchema = (language: string, t: TFunction) =>
  object().shape({
    enabled: boolean(),
    timeRanges: array()
      .of(
        object().shape(
          {
            enabled: boolean(),
            since: date()
              .nullable()
              .min(MIN_DATE, getDateMinTranslation('calendar.field.day_since', language, t))
              .max(MAX_DATE, getDateMaxTranslation('calendar.field.day_since', language, t))
              .when(['enabled', 'until'], ([enabled, until], schema) => {
                const baseSchema = schema.requiredIf(enabled, getRequiredTranslation('calendar.field.day_since', t));
                if (until === null) return baseSchema;

                return baseSchema.max(
                  ref('until'),
                  getDateNotAfterTranslation('calendar.field.day_since', 'calendar.field.day_until', t),
                );
              }),
            until: date()
              .nullable()
              .min(MIN_DATE, getDateMinTranslation('calendar.field.day_until', language, t))
              .max(MAX_DATE, getDateMaxTranslation('calendar.field.day_until', language, t))
              .when(['enabled', 'since'], ([enabled, since], schema) => {
                const baseSchema = schema.requiredIf(enabled, getRequiredTranslation('calendar.field.day_until', t));
                if (since === null) return baseSchema;

                return baseSchema.min(
                  ref('since'),
                  getDateNotBeforeTranslation('calendar.field.day_until', 'calendar.field.day_since', t),
                );
              }),
          },
          [['since', 'until']],
        ),
      )
      .test('valid', function (value) {
        const { enabled } = this.parent as { enabled: boolean };
        const timeRanges = value as CalendarDayTimeRangeFormInput[];
        if (!enabled || timeRanges.length < 2) return true;

        let overlappingIndex = 0;
        let overlappingRange = 'since';
        const hasOverlappingRanges = timeRanges.some((timeRange, index) => {
          const { since, until } = timeRange;
          if (!since || !until) return false;

          const ranges = timeRanges.filter((_, idx) => idx !== index);
          const hasOverlappingRanges = ranges.some((range) => {
            if (!range.since || !range.until) return false;

            if (since > range.since && since < range.until) {
              overlappingRange = 'until';
              return true;
            }

            if (until > range.since && until < range.until) {
              overlappingRange = 'since';
              return true;
            }

            return false;
          });

          if (hasOverlappingRanges) {
            overlappingIndex = index + 1;
          }

          return hasOverlappingRanges;
        });

        const { createError, path } = this;
        return (
          !hasOverlappingRanges ||
          createError({
            path: `${path}.${overlappingIndex}.${overlappingRange}`,
            message: t('calendar.error.overlapping_time_range'),
          })
        );
      }),
  });

export const getCalendarSchema = (language: string, t: TFunction) =>
  object().shape({
    name: string().required(getRequiredTranslation('calendar.field.name', t)),
    timeZone: string().required(getRequiredTranslation('calendar.field.timezone', t)),
    ...Object.values(DayOfWeek).reduce(
      (acc, dayOfWeek) => ({
        ...acc,
        [dayOfWeek]: getCalendarDaySchema(language, t),
      }),
      {},
    ),
    holidays: array().of(
      object().shape({
        name: string().required(getRequiredTranslation('calendar.field.holiday_name', t)),
        date: date()
          .required(getRequiredTranslation('calendar.field.holiday_date', t))
          .min(MIN_DATE, getDateMinTranslation('calendar.field.holiday_date', language, t))
          .max(MAX_DATE, getDateMaxTranslation('calendar.field.holiday_date', language, t)),
        periodicity: string().required(getRequiredTranslation('calendar.field.holiday_periodicity', t)),
      }),
    ),
  });
