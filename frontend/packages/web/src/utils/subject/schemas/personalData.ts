import { MAX_DATE, MIN_DATE } from '@realgimm5/frontend-common/configs';
import { CompanyGroup, EntryStatus } from '@realgimm5/frontend-common/gql/types';
import {
  getDateMaxTranslation,
  getDateMinTranslation,
  getDateNotAfterTranslation,
  getDateNotBeforeTranslation,
  getRequiredTranslation,
} from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { array, date, object, ref, string } from 'yup';

import { LegalNature } from '../../../enums/LegalNature';
import { SubjectType } from '../../../enums/SubjectType';

export const getSubjectHeirsSchema = (language: string, t: TFunction) =>
  object().shape({
    heirs: array().of(
      object().shape({
        heir: object().required(getRequiredTranslation('subject.field.officer_name', t)),
        since: date()
          .required(getRequiredTranslation('subject.field.officer_since', t))
          .min(MIN_DATE, getDateMinTranslation('subject.field.officer_since', language, t))
          .max(MAX_DATE, getDateMaxTranslation('subject.field.officer_since', language, t)),
      }),
    ),
  });

export const getSubjectOfficersSchema = (entryStatus: EntryStatus | null, language: string, t: TFunction) =>
  object().shape({
    officers: array().of(
      object().shape(
        {
          officerType: string().required(getRequiredTranslation('subject.field.officer_type', t)),
          officer: object().required(getRequiredTranslation('subject.field.officer_name', t)),
          since: date()
            .nullable()
            .requiredIf(
              entryStatus !== EntryStatus.IncompleteDraft,
              getRequiredTranslation('subject.field.officer_since', t),
            )
            .min(MIN_DATE, getDateMinTranslation('subject.field.officer_since', language, t))
            .max(MAX_DATE, getDateMaxTranslation('subject.field.officer_since', language, t))
            .when('until', {
              is: (value: Date | null) => value !== null,
              then: (schema) =>
                schema.max(
                  ref('until'),
                  getDateNotAfterTranslation('subject.field.officer_since', 'subject.field.officer_until', t),
                ),
            }),
          until: date()
            .nullable()
            .min(MIN_DATE, getDateMinTranslation('subject.field.officer_until', language, t))
            .max(MAX_DATE, getDateMaxTranslation('subject.field.officer_until', language, t))
            .when('since', {
              is: (value: Date | null) => value !== null,
              then: (schema) =>
                schema.min(
                  ref('since'),
                  getDateNotBeforeTranslation('subject.field.officer_until', 'subject.field.officer_since', t),
                ),
            }),
        },
        [['since', 'until']],
      ),
    ),
  });

export const getSubjectPersonalDataSchema = (
  canBeGroupLeader: boolean,
  canUseInterGroupSignature: boolean,
  entryStatus: EntryStatus | null,
  isBirthTaxIdCodeValid: boolean,
  language: string,
  legalNature: LegalNature | null,
  subjectType: SubjectType,
  t: TFunction,
) =>
  object()
    .shape(
      legalNature === LegalNature.PhysicalPerson
        ? {
            firstName: string().required(getRequiredTranslation('subject.field.first_name', t)),
            lastName: string().required(getRequiredTranslation('subject.field.last_name', t)),
            birthSex: string()
              .nullable()
              .requiredIf(
                entryStatus !== EntryStatus.IncompleteDraft,
                getRequiredTranslation('subject.field.birth_sex', t),
              ),
            birthDate: date()
              .nullable()
              .requiredIf(
                entryStatus !== EntryStatus.IncompleteDraft,
                getRequiredTranslation('subject.field.birth_date', t),
              )
              .min(MIN_DATE, getDateMinTranslation('subject.field.birth_date', language, t))
              .max(MAX_DATE, getDateMaxTranslation('subject.field.birth_date', language, t)),
            birthLocation: object().shape({
              countryISO: string()
                .nullable()
                .requiredIf(
                  entryStatus !== EntryStatus.IncompleteDraft,
                  getRequiredTranslation('subject.field.address_country', t),
                ),
              city: object().shape({
                name: string().requiredIf(
                  entryStatus !== EntryStatus.IncompleteDraft,
                  getRequiredTranslation('subject.field.address_city', t),
                ),
              }),
            }),
            birthCountryTaxIdCode: string()
              .requiredIf(
                entryStatus !== EntryStatus.IncompleteDraft,
                getRequiredTranslation('subject.field.tax_id_code', t),
              )
              .valid(isBirthTaxIdCodeValid, t('subject.error.tax_id_code')),
          }
        : {
            fullName: string().required(getRequiredTranslation('subject.field.business_name', t)),
            businessStart: date()
              .nullable()
              .min(MIN_DATE, getDateMinTranslation('subject.field.establishment_date', language, t))
              .max(MAX_DATE, getDateMaxTranslation('subject.field.establishment_date', language, t)),
            baseCountryTaxIdCode: string().requiredIf(
              subjectType === SubjectType.ManagementSubject && entryStatus !== EntryStatus.IncompleteDraft,
              getRequiredTranslation('subject.field.vat_number', t),
            ),
            companyGroup: object().shape({
              relation: string().when({
                is: CompanyGroup.Leader,
                then: (schema) => schema.valid(canBeGroupLeader, t('subject.error.company_group_relation')),
              }),
            }),
            interGroupSignature: string()
              .when('companyGroup.companyGroupId', {
                is: (value: number | null) =>
                  entryStatus !== EntryStatus.IncompleteDraft &&
                  (subjectType === SubjectType.ManagementSubject || value !== null),
                then: (schema) => schema.required(getRequiredTranslation('subject.field.signature', t)),
              })
              .valid(canUseInterGroupSignature, t('subject.error.signature')),
          },
    )
    .concat(getSubjectHeirsSchema(language, t))
    .concat(getSubjectOfficersSchema(entryStatus, language, t));
