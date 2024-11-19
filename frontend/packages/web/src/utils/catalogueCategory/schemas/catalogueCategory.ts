import { TFunction } from 'i18next';

import { getCatalogueCategoryGeneralDataSchema } from './generalData';
import { getCatalogueCategorySubCategoriesSchema } from './subCategories';

export const getCatalogueCategorySchema = (
  canUseInternalCode: boolean,
  canUseInternalCodes: Record<string, boolean>,
  t: TFunction,
) =>
  getCatalogueCategoryGeneralDataSchema(canUseInternalCode, t).concat(
    getCatalogueCategorySubCategoriesSchema(canUseInternalCodes, t),
  );
