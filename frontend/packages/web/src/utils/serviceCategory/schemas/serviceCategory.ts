import { TFunction } from 'i18next';

import { getServiceCategoryGeneralDataSchema } from './generalData';
import { getServiceCategorySubCategoriesSchema } from './subCategories';

export const getServiceCategorySchema = (
  canUseInternalCode: boolean,
  canUseInternalCodes: Record<string, boolean>,
  t: TFunction,
) =>
  getServiceCategoryGeneralDataSchema(canUseInternalCode, t).concat(
    getServiceCategorySubCategoriesSchema(canUseInternalCodes, t),
  );
