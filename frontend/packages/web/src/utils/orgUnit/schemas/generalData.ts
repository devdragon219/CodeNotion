import { MIN_DATE } from '@realgimm5/frontend-common/configs';
import { EntryStatus } from '@realgimm5/frontend-common/gql/types';
import {
  getDateMinTranslation,
  getDateNotFutureTranslation,
  getRequiredTranslation,
} from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { date, object, string } from 'yup';

export const getOrgUnitGeneralDataSchema = (
  canUseInternalCode: boolean,
  entryStatus: EntryStatus | null,
  language: string,
  t: TFunction,
) =>
  object().shape({
    managementSubject: object().required(getRequiredTranslation('org_unit.field.management_subject', t)),
    internalCode: string()
      .required(getRequiredTranslation('org_unit.field.internal_code', t))
      .valid(canUseInternalCode, t('org_unit.error.internal_code')),
    entryDescription: string().required(getRequiredTranslation('org_unit.field.entry_description', t)),
    entryStatus: string().required(getRequiredTranslation('org_unit.field.entry_status', t)),
    closureDate: date()
      .nullable()
      .requiredIf(entryStatus === EntryStatus.FrozenClosed, getRequiredTranslation('org_unit.field.closure_date', t))
      .min(MIN_DATE, getDateMinTranslation('org_unit.field.closure_date', language, t))
      .max(Date(), getDateNotFutureTranslation('org_unit.field.closure_date', t)),
  });
