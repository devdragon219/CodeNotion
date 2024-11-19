import { TFunction } from 'i18next';

import { getUtilityTypeFieldsSchema } from './fields';
import { getUtilityTypeGeneralDataSchema } from './generalData';

export const getUtilityTypeSchema = (canUseInternalCode: boolean, t: TFunction) =>
  getUtilityTypeGeneralDataSchema(canUseInternalCode, t).concat(getUtilityTypeFieldsSchema(t));
