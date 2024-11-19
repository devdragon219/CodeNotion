import { TFunction } from 'i18next';

import { getAddressesSchema } from '../../components/addressesField/schemas/addresses';
import { getEstateAssetValuesSchema } from './assetValues';
import { getEstateDocumentsSchema } from './documents';
import { getEstateGeneralDataSchema } from './generalData';
import { getEstateRefactoringsSchema } from './refactoring';
import { getEstateTotalMarketValueSchema } from './totalMarketValue';

export const getEstateSchema = (canUseInternalCode: boolean, language: string, t: TFunction) =>
  getEstateGeneralDataSchema(canUseInternalCode, t)
    .concat(getAddressesSchema(true, t))
    .concat(getEstateAssetValuesSchema(t))
    .concat(getEstateTotalMarketValueSchema(t))
    .concat(getEstateRefactoringsSchema(t))
    .concat(getEstateDocumentsSchema(language, t));
