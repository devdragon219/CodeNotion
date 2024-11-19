import { MAX_DATE, MIN_DATE } from '@realgimm5/frontend-common/configs';
import { getDateMaxTranslation, getDateMinTranslation, getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { date, object } from 'yup';

export const getContractBillingPauseSchema = (pausedSince: Date | null, language: string, t: TFunction) =>
  object().shape({
    since: date()
      .nullable()
      .requiredIf(!pausedSince, getRequiredTranslation('contract.field.billing_pause_since', t))
      .min(MIN_DATE, getDateMinTranslation('contract.field.billing_pause_since', language, t))
      .max(MAX_DATE, getDateMaxTranslation('contract.field.billing_pause_since', language, t)),
    until: date()
      .nullable()
      .requiredIf(!!pausedSince, getRequiredTranslation('contract.field.billing_pause_until', t))
      .min(
        pausedSince ?? MIN_DATE,
        getDateMinTranslation('contract.field.billing_pause_until', language, t, pausedSince ?? MIN_DATE),
      )
      .max(MAX_DATE, getDateMaxTranslation('contract.field.billing_pause_until', language, t)),
  });
