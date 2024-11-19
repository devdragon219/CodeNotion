import { FormMode } from '@realgimm5/frontend-common/enums';
import { TFunction } from 'i18next';

import { getPriceListArticleCatalogueTypesSchema } from './catalogueTypes';
import { getPriceListArticleGeneralDataSchema } from './generalData';

export const getPriceListArticleSchema = (
  canUseInternalCode: boolean,
  language: string,
  mode: FormMode,
  t: TFunction,
) =>
  getPriceListArticleGeneralDataSchema(canUseInternalCode, language, mode, t).concat(
    getPriceListArticleCatalogueTypesSchema(t),
  );
