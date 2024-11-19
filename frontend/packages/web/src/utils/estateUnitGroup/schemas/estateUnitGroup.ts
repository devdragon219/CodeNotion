import { TFunction } from 'i18next';

import { getEstateUnitGroupEstateUnitsSchema } from './estateUnits';
import { getEstateUnitGroupGeneralDataSchema } from './generalData';

export const getEstateUnitGroupSchema = (canUseInternalCode: boolean, t: TFunction) =>
  getEstateUnitGroupGeneralDataSchema(canUseInternalCode, t).concat(getEstateUnitGroupEstateUnitsSchema(t));
