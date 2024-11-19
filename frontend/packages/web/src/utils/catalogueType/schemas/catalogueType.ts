import { TFunction } from 'i18next';

import { getCatalogueTypeActivitiesSchema } from './activities';
import { getCatalogueTypeFieldsSchema } from './fields';
import { getCatalogueTypeGeneralDataSchema } from './generalData';

export const getCatalogueTypeSchema = (canUseInternalCode: boolean, t: TFunction) =>
  getCatalogueTypeGeneralDataSchema(canUseInternalCode, t)
    .concat(getCatalogueTypeFieldsSchema(t))
    .concat(getCatalogueTypeActivitiesSchema(t));
