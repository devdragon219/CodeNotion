import { TFunction } from 'i18next';

import { getBillAccountingDataSchema } from './accountingData';
import { getBillGeneralDataSchema } from './generalData';

export const getBillSchema = (isBillActive: boolean, language: string, t: TFunction) =>
  getBillGeneralDataSchema(isBillActive, t).concat(getBillAccountingDataSchema(language, t));
