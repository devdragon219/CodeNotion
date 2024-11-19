import { TFunction } from 'i18next';
import { array, object } from 'yup';

export const getFacilityContractEstateUnitsSchema = (t: TFunction) =>
  object().shape({
    estateUnits: array().min(1, t('facility_contract.error.no_estate_units_selected')),
  });
