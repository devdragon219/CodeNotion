import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { object, string } from 'yup';

export const getCatalogueCategoryGeneralDataSchema = (canUseInternalCode: boolean, t: TFunction) =>
  object().shape({
    internalCode: string()
      .required(getRequiredTranslation('catalogue_category.field.catalogue_category_code', t))
      .valid(canUseInternalCode, t('catalogue_category.error.category_internal_code')),
    name: string().required(getRequiredTranslation('catalogue_category.field.catalogue_category_name', t)),
  });
