import { TFunction } from 'i18next';

import { getCatalogueItemDocumentsSchema } from './documents';
import { getCatalogueItemGeneralDataSchema } from './generalData';

export const getCatalogueItemSchema = (canUseInternalCodes: Record<string, boolean>, language: string, t: TFunction) =>
  getCatalogueItemGeneralDataSchema(canUseInternalCodes, language, t).concat(
    getCatalogueItemDocumentsSchema(language, t),
  );
