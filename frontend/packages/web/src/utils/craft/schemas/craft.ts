import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { number, object, string } from 'yup';

export const getCraftSchema = (canUseInternalCode: boolean, t: TFunction) =>
  object().shape({
    internalCode: string()
      .required(getRequiredTranslation('craft.field.internal_code', t))
      .valid(canUseInternalCode, t('craft.error.internal_code')),
    name: string().required(getRequiredTranslation('craft.field.name', t)),
    ordering: number().required(getRequiredTranslation('craft.field.ordering', t)),
  });
