import { TFunction } from 'i18next';

import { getUtilityServiceEstateUnitsSchema } from './estateUnits';
import { getUtilityServiceEstatesSchema } from './estates';
import { getUtilityServiceGeneralDataSchema } from './generalData';

export const getUtilityServiceSchema = (canUseInternalCode: boolean, language: string, t: TFunction) =>
  getUtilityServiceGeneralDataSchema(canUseInternalCode, language, t)
    .concat(getUtilityServiceEstatesSchema(t))
    .concat(getUtilityServiceEstateUnitsSchema(t));
