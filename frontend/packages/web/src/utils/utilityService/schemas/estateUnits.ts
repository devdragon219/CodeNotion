import { TFunction } from 'i18next';
import { array, object } from 'yup';

export const getUtilityServiceEstateUnitsSchema = (t: TFunction) =>
  object().shape({
    estateUnits: array().min(1, t('utility_service.error.no_estate_units')),
  });
