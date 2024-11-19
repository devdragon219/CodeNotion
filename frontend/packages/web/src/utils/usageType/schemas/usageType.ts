import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { array, number, object, string } from 'yup';

export const getUsageTypeSchema = (canUseInternalCode: boolean, t: TFunction) =>
  object().shape({
    internalCode: string()
      .required(getRequiredTranslation('usage_type.field.internal_code', t))
      .valid(canUseInternalCode, t('usage_type.error.internal_code')),
    name: string().required(getRequiredTranslation('usage_type.field.name', t)),
    ordering: number().required(getRequiredTranslation('usage_type.field.ordering', t)),
    applicability: array().min(1, getRequiredTranslation('usage_type.field.applicability', t)),
  });
