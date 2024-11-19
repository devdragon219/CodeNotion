import { MAX_DATE, MIN_DATE } from '@realgimm5/frontend-common/configs';
import { getDateMaxTranslation, getDateMinTranslation, getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { array, date, number, object } from 'yup';

export const getContractRatePlanSchema = (language: string, t: TFunction) =>
  object().shape({
    newYearlyRate: number().required(getRequiredTranslation('contract.field.rate_plan_yearly_rate', t)),
    since: date()
      .required(getRequiredTranslation('contract.field.rate_plan_since', t))
      .min(MIN_DATE, getDateMinTranslation('contract.field.rate_plan_since', language, t))
      .max(MAX_DATE, getDateMaxTranslation('contract.field.rate_plan_since', language, t)),
  });

export const getContractRatePlansSchema = (language: string, t: TFunction) =>
  object().shape({
    ratePlans: array().of(getContractRatePlanSchema(language, t)),
  });
