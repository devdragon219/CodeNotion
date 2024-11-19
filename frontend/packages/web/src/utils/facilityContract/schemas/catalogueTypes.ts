import { TFunction } from 'i18next';
import { array, object } from 'yup';

export const getFacilityContractCatalogueTypesSchema = (t: TFunction) =>
  object().shape({
    catalogueTypes: array().min(1, t('facility_contract.error.no_catalogue_types_selected')),
  });
