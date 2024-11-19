import { TFunction } from 'i18next';
import { array, object } from 'yup';

export const getFacilityContractTemplateCatalogueTypesSchema = (t: TFunction) =>
  object().shape({
    catalogueTypes: array().min(1, t('facility_contract_template.error.no_catalogue_types_selected')),
  });
