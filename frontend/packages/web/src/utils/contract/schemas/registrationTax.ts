import { MAX_DATE, MIN_DATE } from '@realgimm5/frontend-common/configs';
import {
  getDateMaxTranslation,
  getDateMinTranslation,
  getDateNotAfterTranslation,
  getDateNotBeforeTranslation,
  getPercentMaxTranslation,
  getRequiredTranslation,
} from '@realgimm5/frontend-common/utils';
import { isAfter, isBefore } from 'date-fns';
import { TFunction } from 'i18next';
import { array, date, number, object, string } from 'yup';

export const getContractRegistrationTaxSchema = (validateAll: boolean, language: string, t: TFunction) =>
  object().shape({
    registrationTax: object().shape(
      {
        paymentType: string()
          .nullable()
          .when('isRegistrationTaxApplied', {
            is: true,
            then: (schema) =>
              schema.required(getRequiredTranslation('contract.field.registration_tax_payment_type', t)),
          }),
        incomeTypeRli: string()
          .nullable()
          .when('isRegistrationTaxApplied', {
            is: true,
            then: (schema) =>
              schema.when('isRliModeEnabled', {
                is: true,
                then: (schema) =>
                  schema.required(getRequiredTranslation('contract.field.registration_tax_income_type_rli', t)),
              }),
          }),
        incomeType: string()
          .nullable()
          .when('isRegistrationTaxApplied', {
            is: true,
            then: (schema) =>
              schema.when('isRliModeEnabled', {
                is: false,
                then: (schema) =>
                  schema.required(getRequiredTranslation('contract.field.registration_tax_income_type', t)),
              }),
          }),
        registrationOffice: object()
          .nullable()
          .when('isRegistrationTaxApplied', {
            is: true,
            then: (schema) => schema.required(getRequiredTranslation('contract.field.registration_tax_office_city', t)),
          }),
        taxableRateRatioPercent: number()
          .nullable()
          .max(100, getPercentMaxTranslation('contract.field.registration_tax_taxable_percent', t))
          .when('isRegistrationTaxApplied', {
            is: true,
            then: (schema) =>
              schema.required(getRequiredTranslation('contract.field.registration_tax_taxable_percent', t)),
          }),
        tenantTaxSharePercent: number()
          .nullable()
          .max(100, getPercentMaxTranslation('contract.field.registration_tax_tenant_percent', t))
          .when('isRegistrationTaxApplied', {
            is: true,
            then: (schema) =>
              schema.required(getRequiredTranslation('contract.field.registration_tax_tenant_percent', t)),
          }),
        firstRegistrationPeriod: string()
          .nullable()
          .when('isRegistrationTaxApplied', {
            is: true,
            then: (schema) =>
              schema.required(getRequiredTranslation('contract.field.registration_tax_first_registration_period', t)),
          }),
        firstRegistrationDate: date()
          .nullable()
          .when('isRegistrationTaxApplied', {
            is: true,
            then: (schema) =>
              schema
                .min(
                  MIN_DATE,
                  getDateMinTranslation('contract.field.registration_tax_first_registration_date', language, t),
                )
                .max(
                  MAX_DATE,
                  getDateMaxTranslation('contract.field.registration_tax_first_registration_date', language, t),
                )
                .when(
                  ['lastPaymentDate', 'lastOnlinePaymentDate'],
                  ([lastPaymentDate, lastOnlinePaymentDate], schema) => {
                    if (!lastPaymentDate && !lastOnlinePaymentDate) {
                      return schema;
                    } else if (
                      !lastPaymentDate ||
                      (lastOnlinePaymentDate && isBefore(lastPaymentDate, lastOnlinePaymentDate))
                    ) {
                      return schema.max(
                        lastOnlinePaymentDate,
                        getDateNotAfterTranslation(
                          'contract.field.registration_tax_first_registration_date',
                          'contract.field.registration_tax_last_online_payment_date',
                          t,
                        ),
                      );
                    } else {
                      return schema.max(
                        lastPaymentDate,
                        getDateNotAfterTranslation(
                          'contract.field.registration_tax_first_registration_date',
                          'contract.field.registration_tax_last_payment_date',
                          t,
                        ),
                      );
                    }
                  },
                ),
          }),
        firstOnlineRegistrationDate: date()
          .nullable()
          .when('isRegistrationTaxApplied', {
            is: true,
            then: (schema) =>
              schema
                .min(
                  MIN_DATE,
                  getDateMinTranslation('contract.field.registration_tax_first_online_registration_date', language, t),
                )
                .max(
                  MAX_DATE,
                  getDateMaxTranslation('contract.field.registration_tax_first_online_registration_date', language, t),
                )
                .when(
                  ['lastPaymentDate', 'lastOnlinePaymentDate'],
                  ([lastPaymentDate, lastOnlinePaymentDate], schema) => {
                    if (!lastPaymentDate && !lastOnlinePaymentDate) {
                      return schema;
                    } else if (
                      !lastPaymentDate ||
                      (lastOnlinePaymentDate && isAfter(lastPaymentDate, lastOnlinePaymentDate))
                    ) {
                      return schema.max(
                        lastOnlinePaymentDate,
                        getDateNotAfterTranslation(
                          'contract.field.registration_tax_first_online_registration_date',
                          'contract.field.registration_tax_last_online_payment_date',
                          t,
                        ),
                      );
                    } else {
                      return schema.max(
                        lastPaymentDate,
                        getDateNotAfterTranslation(
                          'contract.field.registration_tax_first_online_registration_date',
                          'contract.field.registration_tax_last_payment_date',
                          t,
                        ),
                      );
                    }
                  },
                ),
          }),
        lastPaymentDate: date()
          .nullable()
          .when('isRegistrationTaxApplied', {
            is: true,
            then: (schema) =>
              schema
                .min(MIN_DATE, getDateMinTranslation('contract.field.registration_tax_last_payment_date', language, t))
                .max(MAX_DATE, getDateMaxTranslation('contract.field.registration_tax_last_payment_date', language, t))
                .when(
                  ['firstRegistrationDate', 'firstOnlineRegistrationDate'],
                  ([firstRegistrationDate, firstOnlineRegistrationDate], schema) => {
                    if (!firstRegistrationDate && !firstOnlineRegistrationDate) {
                      return schema;
                    } else if (
                      !firstRegistrationDate ||
                      (firstOnlineRegistrationDate && isBefore(firstRegistrationDate, firstOnlineRegistrationDate))
                    ) {
                      return schema.min(
                        firstOnlineRegistrationDate,
                        getDateNotBeforeTranslation(
                          'contract.field.registration_tax_last_payment_date',
                          'contract.field.registration_tax_first_online_registration_date',
                          t,
                        ),
                      );
                    } else {
                      return schema.min(
                        firstRegistrationDate,
                        getDateNotBeforeTranslation(
                          'contract.field.registration_tax_last_payment_date',
                          'contract.field.registration_tax_first_registration_date',
                          t,
                        ),
                      );
                    }
                  },
                ),
          }),
        lastOnlinePaymentDate: date()
          .nullable()
          .when('isRegistrationTaxApplied', {
            is: true,
            then: (schema) =>
              schema
                .min(
                  MIN_DATE,
                  getDateMinTranslation('contract.field.registration_tax_last_online_payment_date', language, t),
                )
                .max(
                  MAX_DATE,
                  getDateMaxTranslation('contract.field.registration_tax_last_online_payment_date', language, t),
                )
                .when(
                  ['firstRegistrationDate', 'firstOnlineRegistrationDate'],
                  ([firstRegistrationDate, firstOnlineRegistrationDate], schema) => {
                    if (!firstRegistrationDate && !firstOnlineRegistrationDate) {
                      return schema;
                    } else if (
                      !firstRegistrationDate ||
                      (firstOnlineRegistrationDate && isBefore(firstRegistrationDate, firstOnlineRegistrationDate))
                    ) {
                      return schema.min(
                        firstOnlineRegistrationDate,
                        getDateNotBeforeTranslation(
                          'contract.field.registration_tax_last_online_payment_date',
                          'contract.field.registration_tax_first_online_registration_date',
                          t,
                        ),
                      );
                    } else {
                      return schema.min(
                        firstRegistrationDate,
                        getDateNotBeforeTranslation(
                          'contract.field.registration_tax_last_online_payment_date',
                          'contract.field.registration_tax_first_registration_date',
                          t,
                        ),
                      );
                    }
                  },
                ),
          }),
        numberOfPages: number()
          .nullable()
          .when('isRegistrationTaxApplied', {
            is: true,
            then: (schema) =>
              schema.required(getRequiredTranslation('contract.field.registration_tax_number_of_pages', t)),
          }),
        numberOfCopies: number()
          .nullable()
          .when('isRegistrationTaxApplied', {
            is: true,
            then: (schema) =>
              schema.required(getRequiredTranslation('contract.field.registration_tax_number_of_copies', t)),
          }),
        tenantShareOfStampTaxPercent: number()
          .required(getRequiredTranslation('contract.field.registration_tax_stamp_percent', t))
          .max(100, getPercentMaxTranslation('contract.field.registration_tax_stamp_percent', t)),
        takeoverDate: date()
          .nullable()
          .when('isTakeoverFromPreviousSubject', {
            is: (value: boolean) => value && validateAll,
            then: (schema) =>
              schema
                .required(getRequiredTranslation('contract.field.registration_tax_takeover_date', t))
                .min(MIN_DATE, getDateMinTranslation('contract.field.registration_tax_takeover_date', language, t))
                .max(MAX_DATE, getDateMaxTranslation('contract.field.registration_tax_takeover_date', language, t)),
          }),
        takeoverType: string()
          .nullable()
          .when('isTakeoverFromPreviousSubject', {
            is: (value: boolean) => value && validateAll,
            then: (schema) =>
              schema.required(getRequiredTranslation('contract.field.registration_tax_takeover_type', t)),
          }),
        takeoverLegalRepresentativeSubject: object()
          .nullable()
          .when('isTakeoverFromPreviousSubject', {
            is: (value: boolean) => value && validateAll,
            then: (schema) =>
              schema.required(getRequiredTranslation('contract.field.registration_tax_legal_representative', t)),
          }),
        takeoverSubjects: array().when('isTakeoverFromPreviousSubject', {
          is: (value: boolean) => value && validateAll,
          then: (schema) => schema.min(1, t('contract.error.no_subjects')),
        }),
      },
      [
        ['firstRegistrationDate', 'lastPaymentDate'],
        ['firstRegistrationDate', 'lastOnlinePaymentDate'],
        ['firstOnlineRegistrationDate', 'lastPaymentDate'],
        ['firstOnlineRegistrationDate', 'lastOnlinePaymentDate'],
      ],
    ),
  });
