import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { object, string } from 'yup';

export const getServiceCategoryGeneralDataSchema = (canUseInternalCode: boolean, t: TFunction) =>
  object().shape({
    internalCode: string()
      .required(getRequiredTranslation('service_category.field.service_category_code', t))
      .valid(canUseInternalCode, t('service_category.error.service_category_code')),
    name: string().required(getRequiredTranslation('service_category.field.name', t)),
  });
