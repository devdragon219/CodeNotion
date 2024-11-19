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

export const getFacilityContractFrameworkAgreementsSchema = (t: TFunction) =>
  object().shape({
    frameworkAgreements: array().of(
      object().shape({
        externalCode: string().required(getRequiredTranslation('facility_contract.field.framework_agreement_code', t)),
      }),
    ),
  });

export const getFacilityContractGeneralDataSchema = (canUseInternalCode: boolean, language: string, t: TFunction) =>
  object()
    .shape(
      {
        internalCode: string()
          .required(getRequiredTranslation('facility_contract.field.internal_code', t))
          .valid(canUseInternalCode, t('facility_contract.error.internal_code')),
        description: string().required(getRequiredTranslation('facility_contract.field.description', t)),
        facilityContractType: object().required(getRequiredTranslation('facility_contract.field.contract_type', t)),
        providerSubject: object().required(getRequiredTranslation('facility_contract.field.contract_template', t)),
        agreementDate: date()
          .nullable()
          .min(MIN_DATE, getDateMinTranslation('facility_contract.field.agreement_date', language, t))
          .max(MAX_DATE, getDateMaxTranslation('facility_contract.field.agreement_date', language, t))
          .when('effectiveDate', {
            is: (value: Date | null) => value !== null,
            then: (schema) =>
              schema.max(
                ref('effectiveDate'),
                getDateNotAfterTranslation(
                  'facility_contract.field.agreement_date',
                  'facility_contract.field.effective_date',
                  t,
                ),
              ),
          }),
        effectiveDate: date()
          .required(getRequiredTranslation('facility_contract.field.effective_date', t))
          .min(MIN_DATE, getDateMinTranslation('facility_contract.field.effective_date', language, t))
          .max(MAX_DATE, getDateMaxTranslation('facility_contract.field.effective_date', language, t))
          .when(['agreementDate', 'expirationDate'], ([agreementDate, expirationDate], schema) => {
            if (agreementDate && !expirationDate) {
              return schema.min(
                agreementDate,
                getDateNotBeforeTranslation(
                  'facility_contract.field.effective_date',
                  'facility_contract.field.agreement_date',
                  t,
                ),
              );
            } else if (!agreementDate && expirationDate) {
              return schema.max(
                expirationDate,
                getDateNotAfterTranslation(
                  'facility_contract.field.effective_date',
                  'facility_contract.field.expiration_date',
                  t,
                ),
              );
            } else if (agreementDate && expirationDate) {
              return schema
                .min(
                  agreementDate,
                  getDateNotBeforeTranslation(
                    'facility_contract.field.effective_date',
                    'facility_contract.field.agreement_date',
                    t,
                  ),
                )
                .max(
                  expirationDate,
                  getDateNotAfterTranslation(
                    'facility_contract.field.effective_date',
                    'facility_contract.field.expiration_date',
                    t,
                  ),
                );
            }
            return schema;
          }),
        expirationDate: date()
          .required(getRequiredTranslation('facility_contract.field.expiration_date', t))
          .min(MIN_DATE, getDateMinTranslation('facility_contract.field.expiration_date', language, t))
          .max(MAX_DATE, getDateMaxTranslation('facility_contract.field.expiration_date', language, t))
          .when('effectiveDate', {
            is: (value: Date | null) => value !== null,
            then: (schema) =>
              schema.min(
                ref('effectiveDate'),
                getDateNotBeforeTranslation(
                  'facility_contract.field.expiration_date',
                  'facility_contract.field.effective_date',
                  t,
                ),
              ),
          }),
      },
      [
        ['agreementDate', 'effectiveDate'],
        ['effectiveDate', 'expirationDate'],
      ],
    )
    .concat(getFacilityContractFrameworkAgreementsSchema(t));
