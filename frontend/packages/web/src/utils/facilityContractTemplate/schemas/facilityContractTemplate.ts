import { TFunction } from 'i18next';

import { getFacilityContractTemplateCatalogueTypesSchema } from './catalogueTypes';
import { getFacilityContractTemplateGeneralDataSchema } from './generalData';

export const getFacilityContractTemplateSchema = (canUseInternalCode: boolean, t: TFunction) =>
  getFacilityContractTemplateGeneralDataSchema(canUseInternalCode, t).concat(
    getFacilityContractTemplateCatalogueTypesSchema(t),
  );
