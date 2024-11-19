import { MAX_DATE, MIN_DATE } from '@realgimm5/frontend-common/configs';
import { getDateMaxTranslation, getDateMinTranslation, getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { date, object } from 'yup';

export const getContractBillingSchema = (language: string, t: TFunction) =>
  object().shape({
    billing: object().shape({
      startDate: date()
        .required(getRequiredTranslation('contract.field.billing_start_date', t))
        .min(MIN_DATE, getDateMinTranslation('contract.field.billing_start_date', language, t))
        .max(MAX_DATE, getDateMaxTranslation('contract.field.billing_start_date', language, t)),
    }),
  });
