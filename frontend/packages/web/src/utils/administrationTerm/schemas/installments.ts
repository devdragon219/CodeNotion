import { MAX_DATE, MIN_DATE } from '@realgimm5/frontend-common/configs';
import {
  getDateMaxTranslation,
  getDateMinTranslation,
  getDateNotAfterTranslation,
  getDateNotBeforeTranslation,
  getRequiredTranslation,
} from '@realgimm5/frontend-common/utils';
import { isAfter } from 'date-fns';
import { TFunction } from 'i18next';
import { array, date, number, object, ref } from 'yup';

import { AdministrationTermInstallmentFormInput } from '../../../interfaces/FormInputs/AdministrationTermInstallment';
import { calcTaxAmounts } from '../calcTaxAmounts';

export const getAdministrationTermInstallmentSchema = (
  termSince: Date | null,
  termUntil: Date | null,
  termExpectedAmount: number,
  existingInstallments: AdministrationTermInstallmentFormInput[],
  language: string,
  t: TFunction,
) =>
  object()
    .shape(
      {
        installmentNumber: number().required(getRequiredTranslation('administration_term.field.installment_number', t)),
        billItemType: object().required(getRequiredTranslation('administration_term.field.expense_reason', t)),
        dueDate: date()
          .required(getRequiredTranslation('administration_term.field.due_date', t))
          .min(
            termSince ?? MIN_DATE,
            getDateMinTranslation('administration_term.field.due_date', language, t, termSince ?? MIN_DATE),
          )
          .max(
            termUntil ?? MAX_DATE,
            getDateMaxTranslation('administration_term.field.due_date', language, t, termUntil ?? MAX_DATE),
          ),
        since: date()
          .required(getRequiredTranslation('administration_term.field.installment_since', t))
          .min(
            termSince ?? MIN_DATE,
            getDateMinTranslation('administration_term.field.installment_since', language, t, termSince ?? MIN_DATE),
          )
          .max(
            termUntil ?? MAX_DATE,
            getDateMaxTranslation('administration_term.field.installment_since', language, t, termUntil ?? MAX_DATE),
          )
          .when('until', {
            is: (value: Date | null) => value !== null,
            then: (schema) =>
              schema.max(
                ref('until'),
                getDateNotAfterTranslation(
                  'administration_term.field.installment_since',
                  'administration_term.field.installment_until',
                  t,
                ),
              ),
          }),
        until: date()
          .required(getRequiredTranslation('administration_term.field.installment_until', t))
          .min(
            termSince ?? MIN_DATE,
            getDateMinTranslation('administration_term.field.installment_until', language, t, termSince ?? MIN_DATE),
          )
          .max(
            termUntil ?? MAX_DATE,
            getDateMaxTranslation('administration_term.field.installment_until', language, t, termUntil ?? MAX_DATE),
          )
          .when('since', {
            is: (value: Date | null) => value !== null,
            then: (schema) =>
              schema.min(
                ref('since'),
                getDateNotBeforeTranslation(
                  'administration_term.field.installment_until',
                  'administration_term.field.installment_since',
                  t,
                ),
              ),
          }),
        amount: number().required(getRequiredTranslation('administration_term.field.taxable_amount', t)),
      },
      [['since', 'until']],
    )
    .test('no_installments_amounts_greater_than_term_expected_amount', function (value) {
      const { createError, path } = this;

      const installmentsTotal =
        existingInstallments
          .filter((administrationTerm) => administrationTerm.installmentNumber !== value.installmentNumber)
          .reduce(
            (installmentsTotal, currentInstallment) =>
              installmentsTotal +
              calcTaxAmounts(
                currentInstallment.amount ?? 0,
                currentInstallment.billItemType?.administrationVR?.ratePercent ?? 0,
              ).totalAmount,
            0,
          ) +
        calcTaxAmounts(
          value.amount,
          (value as AdministrationTermInstallmentFormInput).billItemType?.administrationVR?.ratePercent ?? 0,
        ).totalAmount;

      if (installmentsTotal > termExpectedAmount) {
        return createError({
          path: `${path}.amount`,
          message: t('administration_term.error.installments_total_greater_than_expected'),
        });
      }

      return true;
    })
    .test('no_due_date_of_a_previous_installment_after_due_date_of_a_later_installment', function (value) {
      const { createError, path } = this;

      const currentInstallmentNumber = value.installmentNumber;
      const currentDueDate = value.dueDate;

      const previousInstallments = existingInstallments.filter(
        (installment) => installment.installmentNumber < currentInstallmentNumber,
      );
      if (
        previousInstallments.some((installment) => installment.dueDate && isAfter(installment.dueDate, currentDueDate))
      ) {
        return createError({
          path: `${path}.dueDate`,
          message: t('administration_term.error.due_date_earlier_than_previous_installment_due_date'),
        });
      }

      return true;
    });

export const getAdministrationTermInstallmentsSchema = (
  termSince: Date | null,
  termUntil: Date | null,
  termExpectedAmount: number,
  existingInstallments: AdministrationTermInstallmentFormInput[],
  language: string,
  t: TFunction,
) =>
  object().shape({
    installments: array().of(
      getAdministrationTermInstallmentSchema(
        termSince,
        termUntil,
        termExpectedAmount,
        existingInstallments,
        language,
        t,
      ),
    ),
  });
