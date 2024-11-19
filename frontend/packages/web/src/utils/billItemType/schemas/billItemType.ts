import { TFunction } from 'i18next';

import { getBillItemTypeContractSchema } from './contracts';
import { getBillItemTypeGeneralDataSchema } from './generalData';

export const getBillItemTypeSchema = (canUseInternalCode: boolean, t: TFunction) =>
  getBillItemTypeGeneralDataSchema(canUseInternalCode, t).concat(getBillItemTypeContractSchema(t));
