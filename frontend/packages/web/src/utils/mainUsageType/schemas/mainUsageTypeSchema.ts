import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { number, object, string } from 'yup';

export const getMainUsageTypeSchema = (canUseInternalCode: boolean, t: TFunction) =>
  object().shape({
    internalCode: string()
      .required(getRequiredTranslation('main_usage_type.field.internal_code', t))
      .valid(canUseInternalCode, t('main_usage_type.error.internal_code')),
    name: string().required(getRequiredTranslation('main_usage_type.field.name', t)),
    ordering: number().required(getRequiredTranslation('main_usage_type.field.ordering', t)),
  });
