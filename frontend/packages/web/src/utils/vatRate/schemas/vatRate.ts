import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { number, object, string } from 'yup';

export const getVatRateSchema = (canUseInternalCode: boolean, t: TFunction) =>
  object().shape({
    internalCode: string()
      .required(getRequiredTranslation('vat_rate.field.internal_code', t))
      .valid(canUseInternalCode, t('vat_rate.error.internal_code')),
    description: string().required(getRequiredTranslation('vat_rate.field.description', t)),
    vatRateType: string().required(getRequiredTranslation('vat_rate.field.type', t)),
    ratePercent: number().required(getRequiredTranslation('vat_rate.field.rate_percent', t)),
  });
