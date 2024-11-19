import { MAX_DATE, MIN_DATE } from '@realgimm5/frontend-common/configs';
import { TermType } from '@realgimm5/frontend-common/gql/types';
import {
  getDateMaxTranslation,
  getDateMinTranslation,
  getDateNotAfterTranslation,
  getDateNotBeforeTranslation,
  getRequiredTranslation,
  parseStringToDate,
} from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { date, number, object, ref, string } from 'yup';

import { AdministrationTermFragment } from '../../../gql/RealGimm.Web.AdministrationTerm.fragment';
import { AdministrationFormInput } from '../../../interfaces/FormInputs/Administration';
import { AdministrationTermFormInput } from '../../../interfaces/FormInputs/AdministrationTerm';
import { calcTaxAmounts } from '../calcTaxAmounts';

export const getAdministrationTermGeneralDataSchema = (
  existingAdministrationTerms: AdministrationTermFragment[],
  language: string,
  t: TFunction,
  administration?: AdministrationFormInput,
) =>
  object()
    .shape(
      {
        termType: string().required(getRequiredTranslation('administration_term.field.term_type', t)),
        since: date()
          .required(getRequiredTranslation('administration_term.field.since', t))
          .min(
            administration?.since ?? MIN_DATE,
            getDateMinTranslation('administration_term.field.since', language, t, administration?.since ?? MIN_DATE),
          )
          .max(
            administration?.until ?? MAX_DATE,
            getDateMaxTranslation('administration_term.field.since', language, t, administration?.until ?? MAX_DATE),
          )
          .when('until', {
            is: (value: Date | null) => value !== null,
            then: (schema) =>
              schema.max(
                ref('until'),
                getDateNotAfterTranslation('administration_term.field.since', 'administration_term.field.until', t),
              ),
          }),
        until: date()
          .required(getRequiredTranslation('administration_term.field.until', t))
          .min(
            administration?.since ?? MIN_DATE,
            getDateMinTranslation('administration_term.field.until', language, t, administration?.since ?? MIN_DATE),
          )
          .max(
            administration?.until ?? MAX_DATE,
            getDateMaxTranslation('administration_term.field.until', language, t, administration?.until ?? MAX_DATE),
          )
          .when('since', {
            is: (value: Date | null) => value !== null,
            then: (schema) =>
              schema.min(
                ref('since'),
                getDateNotBeforeTranslation('administration_term.field.until', 'administration_term.field.since', t),
              ),
          }),
        expectedAmount: number().required(getRequiredTranslation('administration_term.field.expected_amount', t)),
      },
      [['since', 'until']],
    )
    .test('no-same-administration-term-type-in-same-period', function (value) {
      const { createError, path } = this;

      // Filter administrations with the same type
      const filteredAdministrationTerms = existingAdministrationTerms.filter(
        (it) => it.termType === (value.termType as TermType),
      );

      if (filteredAdministrationTerms.length === 0) {
        return true;
      }

      for (const existing of filteredAdministrationTerms) {
        const since = typeof existing.since === 'string' ? parseStringToDate(existing.since) : existing.since;
        const until = typeof existing.until === 'string' ? parseStringToDate(existing.until) : existing.until;
        if (!since || !until) continue;
        // Inserting an expired administration, can be duplicated if it doesn't overlap with existing ones
        if (value.since >= since && value.until <= until) {
          // The new administration term period is totally inside an existing one
          return createError({
            path: `${path}.since`,
            message: t('administration_term.error.no_duplicated_administration_term'),
          });
        }
        if (value.since >= since && value.since < until) {
          // Since date is inside
          return createError({
            path: `${path}.since`,
            message: t('administration_term.error.no_duplicated_administration_term'),
          });
        }
        if (value.since < since && value.until >= since) {
          // Until date is inside
          return createError({
            path: `${path}.until`,
            message: t('administration_term.error.no_duplicated_administration_term'),
          });
        }
      }

      // No errors found
      return true;
    })
    .test('no_expected_amount_lower_than_installments_amount_total', function (value) {
      const { createError, path } = this;

      const installmentsTotal = (value as AdministrationTermFormInput).installments.reduce(
        (installmentsTotal, currentInstallment) =>
          installmentsTotal +
          calcTaxAmounts(
            currentInstallment.amount ?? 0,
            currentInstallment.billItemType?.administrationVR?.ratePercent ?? 0,
          ).totalAmount,
        0,
      );

      if (installmentsTotal > value.expectedAmount) {
        return createError({
          path: `${path}.expectedAmount`,
          message: t('administration_term.error.no_expected_amount_smaller_than_installments_total'),
        });
      }

      return true;
    });
