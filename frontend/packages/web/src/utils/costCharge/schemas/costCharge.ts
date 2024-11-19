import { TFunction } from 'i18next';

import { getCostChargeGeneralDataSchema } from './generalData';
import { getCostChargeUtilityServiceSchema } from './utilityService';

export const getCostChargeSchema = (utilityServiceActivationDate: Date | null, language: string, t: TFunction) =>
  getCostChargeUtilityServiceSchema(t).concat(
    getCostChargeGeneralDataSchema(utilityServiceActivationDate, language, t),
  );
