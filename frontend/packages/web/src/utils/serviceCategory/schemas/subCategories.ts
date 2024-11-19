import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { array, object, string } from 'yup';

export const getServiceCategorySubCategoriesSchema = (canUseInternalCodes: Record<string, boolean>, t: TFunction) =>
  object().shape({
    subCategories: array().of(
      object().shape({
        internalCode: string()
          .required(getRequiredTranslation('service_category.field.internal_code', t))
          .test('validInternalCode', function () {
            const { createError, path } = this;
            const { guid } = this.parent as { guid: string };
            const canUseInternalCode = guid in canUseInternalCodes ? canUseInternalCodes[guid] : true;
            return (
              canUseInternalCode ||
              createError({ path, message: t('service_category.error.service_sub_category_code') })
            );
          }),
        name: string().required(getRequiredTranslation('service_category.field.name', t)),
      }),
    ),
  });
