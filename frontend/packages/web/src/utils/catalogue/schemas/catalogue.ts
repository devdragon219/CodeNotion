import { TFunction } from 'i18next';

import { getCatalogueDocumentsSchema } from './documents';
import { getCatalogueEstateSchema } from './estate';
import { getCatalogueGeneralDataSchema } from './generalData';
import { getCatalogueItemsSchema } from './items';

export const getCatalogueSchema = (canUseInternalCodes: Record<string, boolean>, language: string, t: TFunction) =>
  getCatalogueEstateSchema(t)
    .concat(getCatalogueGeneralDataSchema(t))
    .concat(getCatalogueItemsSchema(canUseInternalCodes, language, t))
    .concat(getCatalogueDocumentsSchema(language, t));
