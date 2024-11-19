import { MAX_DATE, MIN_DATE } from '@realgimm5/frontend-common/configs';
import {
  getDateMaxTranslation,
  getDateMinTranslation,
  getDateNotAfterTranslation,
  getDateNotBeforeTranslation,
  getFormViewerSchema,
  getNumberNotGreaterTranslation,
  getRequiredTranslation,
} from '@realgimm5/frontend-common/utils';
import { intervalToDuration, isEqual } from 'date-fns';
import { TFunction } from 'i18next';
import { array, date, number, object, ref, string } from 'yup';

import { CostChargeFormInput } from '../../../interfaces/FormInputs/CostCharge';
import { ReadingValueFormInput } from '../../../interfaces/FormInputs/Reading';

const getCostChargeConsumptionSchema = (language: string, t: TFunction) =>
  object()
    .nullable()
    .shape(
      {
        since: date()
          .nullable()
          .min(MIN_DATE, getDateMinTranslation('cost_charge.field.since', language, t))
          .max(MAX_DATE, getDateMaxTranslation('cost_charge.field.since', language, t))
          .when(['until', 'values'], ([until, values], schema) => {
            const hasValues = (values as ReadingValueFormInput[]).some(({ value }) => value !== null);
            if (!until && !hasValues) return schema;
            if (until) {
              return schema
                .requiredIf(hasValues || !!until, getRequiredTranslation('cost_charge.field.since', t))
                .max(until, getDateNotAfterTranslation('cost_charge.field.since', 'cost_charge.field.until', t));
            }
            return schema.requiredIf(hasValues, getRequiredTranslation('cost_charge.field.since', t));
          }),
        until: date()
          .nullable()
          .min(MIN_DATE, getDateMinTranslation('cost_charge.field.until', language, t))
          .max(MAX_DATE, getDateMaxTranslation('cost_charge.field.until', language, t))
          .when(['since', 'values'], ([since, values], schema) => {
            const hasValues = (values as ReadingValueFormInput[]).some(({ value }) => value !== null);
            if (!since && !hasValues) return schema;
            if (since) {
              return schema
                .required(getRequiredTranslation('cost_charge.field.until', t))
                .min(since, getDateNotBeforeTranslation('cost_charge.field.until', 'cost_charge.field.since', t));
            }
            return schema.requiredIf(hasValues, getRequiredTranslation('cost_charge.field.until', t));
          }),
        values: array().of(
          object().shape({
            value: number().nullable(),
          }),
        ),
      },
      [['since', 'until']],
    )
    .test('validValues', function (value) {
      const { since, until, values } = value ?? {};
      if ((values ?? []).every(({ value }) => value !== null) || (since === null && until === null)) return true;

      const { createError, path } = this;
      return createError({
        path: `${path}.values.${(values ?? []).findIndex(({ value }) => value === null)}.value`,
        message: getRequiredTranslation('cost_charge.field.usage_value', t),
      });
    });

export const getCostChargeConsumptionsSchema = (language: string, t: TFunction, type?: 'actual' | 'expected') =>
  object()
    .shape({
      consumptions: object().shape({
        actual: getCostChargeConsumptionSchema(language, t),
        expected: getCostChargeConsumptionSchema(language, t),
      }),
      periodStart: date().nullable(),
      periodEnd: date().nullable(),
    })
    .test('valid', function ({ consumptions: { actual, expected }, periodStart, periodEnd }) {
      if (!periodStart || !periodEnd || (!actual && !expected)) return true;
      const { createError, path } = this;

      if (actual && !expected) {
        if (actual.since && !isEqual(actual.since, periodStart)) {
          return createError({
            path: `${path}.consumptions.actual.since`,
            message: t('cost_charge.error.since'),
          });
        } else if (actual.until && !isEqual(actual.until, periodEnd) && type !== 'actual') {
          return createError({
            path: `${path}.consumptions.actual.until`,
            message: t('cost_charge.error.until'),
          });
        }
        return true;
      } else if (!actual && expected) {
        if (expected.since && !isEqual(expected.since, periodStart) && type !== 'expected') {
          return createError({
            path: `${path}.consumptions.expected.since`,
            message: t('cost_charge.error.since'),
          });
        } else if (expected.until && !isEqual(expected.until, periodEnd)) {
          return createError({
            path: `${path}.consumptions.expected.until`,
            message: t('cost_charge.error.until'),
          });
        }
        return true;
      } else if (actual && expected) {
        if (actual.since && !isEqual(actual.since, periodStart) && type !== 'expected') {
          return createError({
            path: `${path}.consumptions.actual.since`,
            message: t('cost_charge.error.since'),
          });
        }
        if (!actual.since && expected.since && !isEqual(expected.since, periodStart) && type !== 'expected') {
          return createError({
            path: `${path}.consumptions.expected.since`,
            message: t('cost_charge.error.since'),
          });
        } else if (
          actual.until &&
          expected.since &&
          (intervalToDuration({ start: actual.until, end: expected.since }).days ?? 0) !== 1 &&
          type === undefined
        ) {
          return createError({
            path: `${path}.consumptions`,
            message: t('cost_charge.error.consumptions'),
          });
        } else if (expected.until && !isEqual(expected.until, periodEnd) && type !== 'actual') {
          return createError({
            path: `${path}.consumptions.expected.until`,
            message: t('cost_charge.error.until'),
          });
        } else if (!expected.until && actual.until && !isEqual(actual.until, periodEnd) && type !== 'actual') {
          return createError({
            path: `${path}.consumptions.actual.until`,
            message: t('cost_charge.error.until'),
          });
        }
      }

      return true;
    });

export const getCostChargeGeneralDataSchema = (
  utilityServiceActivationDate: Date | null,
  language: string,
  t: TFunction,
) =>
  object()
    .concat(getCostChargeConsumptionsSchema(language, t))
    .shape(
      {
        totalAmount: number().required(getRequiredTranslation('cost_charge.field.total_amount', t)),
        periodStart: date()
          .required(getRequiredTranslation('cost_charge.field.period_start', t))
          .min(MIN_DATE, getDateMinTranslation('cost_charge.field.period_start', language, t))
          .max(MAX_DATE, getDateMaxTranslation('cost_charge.field.period_start', language, t))
          .when(['periodEnd'], ([periodEnd], schema) => {
            if (periodEnd && !utilityServiceActivationDate) {
              return schema.max(
                ref('periodEnd'),
                getDateNotAfterTranslation('cost_charge.field.period_start', 'cost_charge.field.period_end', t),
              );
            } else if (!periodEnd && utilityServiceActivationDate) {
              return schema.min(
                utilityServiceActivationDate,
                getDateNotBeforeTranslation('cost_charge.field.period_start', 'cost_charge.field.activation_date', t),
              );
            } else if (periodEnd && utilityServiceActivationDate) {
              return schema
                .min(
                  utilityServiceActivationDate,
                  getDateNotBeforeTranslation('cost_charge.field.period_start', 'cost_charge.field.activation_date', t),
                )
                .max(
                  ref('periodEnd'),
                  getDateNotAfterTranslation('cost_charge.field.period_start', 'cost_charge.field.period_end', t),
                );
            }
            return schema;
          }),
        periodEnd: date()
          .required(getRequiredTranslation('cost_charge.field.period_end', t))
          .min(MIN_DATE, getDateMinTranslation('cost_charge.field.period_end', language, t))
          .max(MAX_DATE, getDateMaxTranslation('cost_charge.field.period_end', language, t))
          .when(['periodStart', 'referenceDate'], ([periodStart, referenceDate], schema) => {
            if (periodStart && !referenceDate) {
              return schema.min(
                periodStart,
                getDateNotBeforeTranslation('cost_charge.field.period_end', 'cost_charge.field.period_start', t),
              );
            } else if (!periodStart && referenceDate) {
              return schema.max(
                referenceDate,
                getDateNotAfterTranslation('cost_charge.field.period_end', 'cost_charge.field.reference_date', t),
              );
            } else if (periodStart && referenceDate) {
              return schema
                .min(
                  periodStart,
                  getDateNotBeforeTranslation('cost_charge.field.period_end', 'cost_charge.field.period_start', t),
                )
                .max(
                  referenceDate,
                  getDateNotAfterTranslation('cost_charge.field.period_end', 'cost_charge.field.reference_date', t),
                );
            }
            return schema;
          }),
        referenceDate: date()
          .required(getRequiredTranslation('cost_charge.field.reference_date', t))
          .min(MIN_DATE, getDateMinTranslation('cost_charge.field.reference_date', language, t))
          .max(MAX_DATE, getDateMaxTranslation('cost_charge.field.reference_date', language, t))
          .when(['dueDate', 'periodEnd'], ([dueDate, periodEnd], schema) => {
            if (dueDate && !periodEnd) {
              return schema.max(
                dueDate,
                getDateNotAfterTranslation('cost_charge.field.reference_date', 'cost_charge.field.due_date', t),
              );
            } else if (!dueDate && periodEnd) {
              return schema.min(
                periodEnd,
                getDateNotBeforeTranslation('cost_charge.field.reference_date', 'cost_charge.field.period_end', t),
              );
            } else if (dueDate && periodEnd) {
              return schema
                .min(
                  periodEnd,
                  getDateNotBeforeTranslation('cost_charge.field.reference_date', 'cost_charge.field.period_end', t),
                )
                .max(
                  dueDate,
                  getDateNotAfterTranslation('cost_charge.field.reference_date', 'cost_charge.field.due_date', t),
                );
            }
            return schema;
          }),
        dueDate: date()
          .required(getRequiredTranslation('cost_charge.field.due_date', t))
          .min(MIN_DATE, getDateMinTranslation('cost_charge.field.due_date', language, t))
          .max(MAX_DATE, getDateMaxTranslation('cost_charge.field.due_date', language, t))
          .when('referenceDate', {
            is: (value: Date | null) => value !== null,
            then: (schema) =>
              schema.min(
                ref('referenceDate'),
                getDateNotBeforeTranslation('cost_charge.field.due_date', 'cost_charge.field.reference_date', t),
              ),
          }),
        invoiceNumber: string().required(getRequiredTranslation('cost_charge.field.invoice_number', t)),
        totalVatAmount: number()
          .required(getRequiredTranslation('cost_charge.field.vat_amount', t))
          .max(
            ref('totalAmount'),
            getNumberNotGreaterTranslation('cost_charge.field.vat_amount', 'cost_charge.field.total_amount', t),
          ),
        invoicedConsumptionAmount: number()
          .required(getRequiredTranslation('cost_charge.field.invoiced_consumption', t))
          .when('consumptions', ([consumptions], schema) => {
            const { actual, expected } = consumptions as CostChargeFormInput['consumptions'];
            if (!actual && !expected) return schema;
            const totalAmount = [...(actual?.values ?? []), ...(expected?.values ?? [])].reduce(
              (acc, { value }) => acc + (value ?? 0),
              0,
            );
            return schema.min(totalAmount, t('cost_charge.error.invoiced_consumption'));
          }),
        fields: getFormViewerSchema(t),
      },
      [
        ['periodStart', 'periodEnd'],
        ['referenceDate', 'dueDate'],
        ['periodEnd', 'referenceDate'],
      ],
    );
