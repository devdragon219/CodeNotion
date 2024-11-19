import { TFunction } from 'i18next';
import { array, object } from 'yup';

export const getEstateUnitGroupEstateUnitsSchema = (t: TFunction) =>
  object().shape({
    estateUnits: array().min(1, t('estate_unit_group.error.no_estate_units')),
  });
