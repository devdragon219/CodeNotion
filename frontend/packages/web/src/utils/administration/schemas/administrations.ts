import { MAX_DATE, MIN_DATE } from '@realgimm5/frontend-common/configs';
import { AdministrationType, PaymentType } from '@realgimm5/frontend-common/gql/types';
import {
  getDateMaxTranslation,
  getDateMinTranslation,
  getDateNotAfterTranslation,
  getDateNotBeforeTranslation,
  getRequiredTranslation,
  parseStringToDate,
} from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { array, date, number, object, ref, string } from 'yup';

import { AdministrationFragment } from '../../../gql/RealGimm.Web.Administration.fragment';
import { AdministrationFormInput } from '../../../interfaces/FormInputs/Administration';

export const getAdministrationItemSchema = (
  existingAdministrations: AdministrationFragment[],
  language: string,
  t: TFunction,
) =>
  object()
    .shape(
      {
        administrationId: number().nullable(),
        administrationType: string().required(getRequiredTranslation('administration.field.administration_type', t)),
        administratorSubject: object().required(getRequiredTranslation('administration.field.administrator', t)),
        since: date()
          .required(getRequiredTranslation('administration.field.start_date', t))
          .min(MIN_DATE, getDateMinTranslation('administration.field.start_date', language, t))
          .max(MAX_DATE, getDateMaxTranslation('administration.field.start_date', language, t))
          .when('until', {
            is: (value: Date | null) => value !== null,
            then: (schema) =>
              schema.max(
                ref('until'),
                getDateNotAfterTranslation('administration.field.start_date', 'administration.field.end_date', t),
              ),
          }),
        until: date()
          .nullable()
          .min(MIN_DATE, getDateMinTranslation('administration.field.end_date', language, t))
          .max(MAX_DATE, getDateMaxTranslation('administration.field.end_date', language, t))
          .when('since', {
            is: (value: Date | null) => value !== null,
            then: (schema) =>
              schema.min(
                ref('since'),
                getDateNotBeforeTranslation('administration.field.end_date', 'administration.field.start_date', t),
              ),
          }),
        paymentType: string().required(getRequiredTranslation('administration.field.payment_type', t)),
        bankAccount: object()
          .nullable()
          .when('paymentType', {
            is: (value: PaymentType) => [PaymentType.WireTransfer, PaymentType.Rid].includes(value),
            then: (schema) => schema.required(getRequiredTranslation('subject.field.bank_account_number', t)),
          }),
      },
      [['since', 'until']],
    )
    .test('no-same-administration-type-in-same-period', function (value) {
      const { createError, path, options } = this;
      const { index } = options as { index: number };

      const newAdministrations =
        (this.parent as AdministrationFormInput[] | undefined)?.filter(
          (_: AdministrationFormInput, i: number) => i !== index,
        ) ?? [];

      // Filter administrations with the same type
      const filteredAdministrations = [...existingAdministrations, ...newAdministrations].filter(
        (it) => it.administrationType === (value.administrationType as AdministrationType),
      );

      if (filteredAdministrations.length === 0) {
        return true;
      }

      for (const existing of filteredAdministrations) {
        if (!existing.until) {
          // Administration is still active, so it can't be duplicated
          return createError({
            path: `${path}.since`,
            message: t('administration.error.administration_not_expired'),
          });
        }
        const since = typeof existing.since === 'string' ? parseStringToDate(existing.since) : existing.since;
        const until = typeof existing.until === 'string' ? parseStringToDate(existing.until) : existing.until;
        if (!since || !until) continue;
        if (value.until) {
          // Inserting an expired administration, can be duplicated if it doesn't overlap with existing ones
          if (value.since >= since && value.until <= until) {
            // The new administration period is totally inside an existing one
            return createError({
              path: `${path}.since`,
              message: t('administration.error.no_duplicated_administration'),
            });
          }
          if (value.since >= since && value.since < until) {
            // Since date is inside
            return createError({
              path: `${path}.since`,
              message: t('administration.error.no_duplicated_administration'),
            });
          }
          if (value.since < since && value.until >= since) {
            // Until date is inside
            return createError({
              path: `${path}.until`,
              message: t('administration.error.no_duplicated_administration'),
            });
          }
        } else {
          // Inserting an unexpired administration, can be duplicated only if since date is after until of existing ones
          if (value.since <= since || (value.since >= since && value.since <= until)) {
            // Since date is after until date of existing ones
            return createError({
              path: `${path}.since`,
              message: t('administration.error.no_duplicated_administration'),
            });
          }
        }
      }

      // No errors found
      return true;
    });

export const getAdministrationAdministrationsSchema = (
  existingAdministrations: AdministrationFragment[],
  language: string,
  t: TFunction,
) =>
  object().shape({
    administrations: array()
      .min(1, t('administration.error.no_administrations'))
      .of(getAdministrationItemSchema(existingAdministrations, language, t)),
  });
