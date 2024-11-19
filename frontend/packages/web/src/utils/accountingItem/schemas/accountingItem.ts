import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { object, string } from 'yup';

export const getAccountingItemSchema = (canUseInternalCode: boolean, t: TFunction) =>
  object().shape({
    internalCode: string()
      .required(getRequiredTranslation('accounting_item.field.internal_code', t))
      .valid(canUseInternalCode, t('accounting_item.error.internal_code')),
    description: string().required(getRequiredTranslation('accounting_item.field.description', t)),
    externalCode: string().required(getRequiredTranslation('accounting_item.field.external_code', t)),
  });
