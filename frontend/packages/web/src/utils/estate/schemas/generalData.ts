import { MAX_YEAR, MIN_DATE, MIN_YEAR } from '@realgimm5/frontend-common/configs';
import { EstateStatus } from '@realgimm5/frontend-common/gql/types';
import {
  getDateNotFutureTranslation,
  getRequiredTranslation,
  getYearMaxTranslation,
  getYearMinTranslation,
} from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { array, date, number, object, string } from 'yup';

export const getEstateGeneralDataSchema = (canUseInternalCode: boolean, t: TFunction) =>
  object().shape({
    estateType: string().required(getRequiredTranslation('estate.field.estate_type', t)),
    internalCode: string()
      .required(getRequiredTranslation('estate.field.estate_code', t))
      .valid(canUseInternalCode, t('estate.error.internal_code')),
    status: string().required(getRequiredTranslation('estate.field.estate_status', t)),
    decommissioningDate: date()
      .nullable()
      .when('status', {
        is: EstateStatus.Decommissioned,
        then: (schema) => schema.required(getRequiredTranslation('estate.field.disused_date', t)),
      })
      .min(MIN_DATE, getYearMinTranslation('estate.field.disused_date', t))
      .max(Date(), getDateNotFutureTranslation('estate.field.disused_date', t)),
    ownership: string().required(getRequiredTranslation('estate.field.ownership', t)),
    mainUsageType: object().required(getRequiredTranslation('estate.field.main_usage_type', t)),
    usageType: object().required(getRequiredTranslation('estate.field.usage_type', t)),
    buildYear: number()
      .nullable()
      .min(MIN_YEAR, getYearMinTranslation('estate.field.build_year', t))
      .max(MAX_YEAR, getYearMaxTranslation('estate.field.asset_value_year', t)),
    managementSubject: object().required(getRequiredTranslation('estate.field.management_subject', t)),
    floors: array().min(1, getRequiredTranslation('estate.field.floors', t)),
  });
