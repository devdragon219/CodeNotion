import { TFunction } from 'i18next';

import { getContractTypeGeneralDataSchema } from './generalData';

export const getContractTypeSchema = (canUseInternalCode: boolean, t: TFunction) =>
  getContractTypeGeneralDataSchema(canUseInternalCode, t);
