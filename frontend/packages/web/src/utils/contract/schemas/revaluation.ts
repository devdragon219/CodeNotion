import { MAX_DATE, MIN_DATE } from '@realgimm5/frontend-common/configs';
import {
  getDateMaxTranslation,
  getDateMinTranslation,
  getDateNotAfterTranslation,
  getDateNotBeforeTranslation,
  getRequiredTranslation,
} from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { date, number, object, ref, string } from 'yup';

export const getContractRevaluationSchema = (language: string, t: TFunction) =>
  object().shape({
    revaluation: object().shape(
      {
        revaluationPeriodMonths: number()
          .nullable()
          .when('isRevaluationApplied', {
            is: true,
            then: (schema) => schema.required(getRequiredTranslation('contract.field.revaluation_period_months', t)),
          }),
        referencePeriodStart: date()
          .nullable()
          .when('isRevaluationApplied', {
            is: true,
            then: (schema) =>
              schema
                .required(getRequiredTranslation('contract.field.revaluation_period_start', t))
                .min(MIN_DATE, getDateMinTranslation('contract.field.revaluation_period_start', language, t))
                .max(MAX_DATE, getDateMaxTranslation('contract.field.revaluation_period_start', language, t))
                .when('referencePeriodEnd', {
                  is: (value: Date | null) => value !== null,
                  then: (schema) =>
                    schema.max(
                      ref('referencePeriodEnd'),
                      getDateNotAfterTranslation(
                        'contract.field.revaluation_period_start',
                        'contract.field.revaluation_period_end',
                        t,
                      ),
                    ),
                }),
          }),
        referencePeriodEnd: date()
          .nullable()
          .when('isRevaluationApplied', {
            is: true,
            then: (schema) =>
              schema
                .required(getRequiredTranslation('contract.field.revaluation_period_end', t))
                .min(MIN_DATE, getDateMinTranslation('contract.field.revaluation_period_end', language, t))
                .max(MAX_DATE, getDateMaxTranslation('contract.field.revaluation_period_end', language, t))
                .when('referencePeriodStart', {
                  is: (value: Date | null) => value !== null,
                  then: (schema) =>
                    schema.min(
                      ref('referencePeriodStart'),
                      getDateNotBeforeTranslation(
                        'contract.field.revaluation_period_end',
                        'contract.field.revaluation_period_start',
                        t,
                      ),
                    ),
                }),
          }),
        revaluationSharePercent: number()
          .nullable()
          .when('isRevaluationApplied', {
            is: true,
            then: (schema) => schema.required(getRequiredTranslation('contract.field.revaluation_share_percent', t)),
          }),
        rateType: string()
          .nullable()
          .when('isRevaluationApplied', {
            is: true,
            then: (schema) => schema.required(getRequiredTranslation('contract.field.revaluation_rate_type', t)),
          }),
        nextApplicationDate: date()
          .nullable()
          .when('isRevaluationApplied', {
            is: true,
            then: (schema) =>
              schema
                .required(getRequiredTranslation('contract.field.revaluation_next_application_date', t))
                .min(MIN_DATE, getDateMinTranslation('contract.field.revaluation_next_application_date', language, t))
                .max(MAX_DATE, getDateMaxTranslation('contract.field.revaluation_next_application_date', language, t))
                .when('referencePeriodStart', {
                  is: (value: Date | null) => value !== null,
                  then: (schema) =>
                    schema.min(
                      ref('referencePeriodStart'),
                      getDateNotBeforeTranslation(
                        'contract.field.revaluation_next_application_date',
                        'contract.field.revaluation_period_start',
                        t,
                      ),
                    ),
                }),
          }),
      },
      [['referencePeriodStart', 'referencePeriodEnd']],
    ),
  });
