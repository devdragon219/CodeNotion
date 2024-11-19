import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { array, object, string } from 'yup';

export const getCatalogueCategorySubCategoriesSchema = (canUseInternalCodes: Record<string, boolean>, t: TFunction) =>
  object().shape({
    subCategories: array().of(
      object().shape({
        internalCode: string()
          .required(getRequiredTranslation('catalogue_category.field.catalogue_sub_category_code', t))
          .test('validInternalCode', function () {
            const { createError, path } = this;
            const { guid } = this.parent as { guid: string };
            const canUseInternalCode = guid in canUseInternalCodes ? canUseInternalCodes[guid] : true;
            return (
              canUseInternalCode ||
              createError({ path, message: t('catalogue_category.error.sub_category_internal_code') })
            );
          }),
        name: string().required(getRequiredTranslation('catalogue_category.field.catalogue_sub_category_name', t)),
      }),
    ),
  });
