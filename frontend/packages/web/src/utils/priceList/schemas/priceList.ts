import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { number, object, string } from 'yup';

export const getPriceListSchema = (canUseInternalCode: boolean, t: TFunction) =>
  object().shape({
    ordering: number().required(getRequiredTranslation('price_list.field.ordering', t)),
    internalCode: string()
      .required(getRequiredTranslation('price_list.field.internal_code', t))
      .valid(canUseInternalCode, t('price_list.error.internal_code')),
    name: string().required(getRequiredTranslation('price_list.field.name', t)),
  });
