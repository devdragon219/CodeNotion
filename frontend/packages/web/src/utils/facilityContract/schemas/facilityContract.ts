import { TFunction } from 'i18next';

import { getFacilityContractBillingSchema } from './billing';
import { getFacilityContractCatalogueTypesSchema } from './catalogueTypes';
import { getFacilityContractDocumentsSchema } from './documents';
import { getFacilityContractEstateUnitsSchema } from './estateUnits';
import { getFacilityContractGeneralDataSchema } from './generalData';
import { getFacilityContractPenaltiesSchema } from './penalties';
import { getFacilityContractPriceListsSchema } from './priceLists';
import { getFacilityContractSlasSchema } from './slas';
import { getFacilityContractTermExtensionsSchema } from './termExtensions';

export const getFacilityContractSchema = (canUseInternalCode: boolean, language: string, t: TFunction) =>
  getFacilityContractGeneralDataSchema(canUseInternalCode, language, t)
    .concat(getFacilityContractEstateUnitsSchema(t))
    .concat(getFacilityContractCatalogueTypesSchema(t))
    .concat(getFacilityContractSlasSchema(t))
    .concat(getFacilityContractPenaltiesSchema(t))
    .concat(getFacilityContractBillingSchema(t))
    .concat(getFacilityContractPriceListsSchema(t))
    .concat(getFacilityContractTermExtensionsSchema(t))
    .concat(getFacilityContractDocumentsSchema(language, t));
