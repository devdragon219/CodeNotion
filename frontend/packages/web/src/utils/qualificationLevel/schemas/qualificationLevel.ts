import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { number, object, string } from 'yup';

export const getQualificationLevelSchema = (canUseInternalCode: boolean, t: TFunction) =>
  object().shape({
    internalCode: string()
      .required(getRequiredTranslation('qualification_level.field.internal_code', t))
      .valid(canUseInternalCode, t('qualification_level.error.internal_code')),
    name: string().required(getRequiredTranslation('qualification_level.field.name', t)),
    ordering: number().required(getRequiredTranslation('qualification_level.field.ordering', t)),
  });
