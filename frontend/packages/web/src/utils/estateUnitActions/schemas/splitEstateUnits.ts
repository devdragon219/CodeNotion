import { TFunction } from 'i18next';
import { array, object } from 'yup';

export const getEstateUnitSplitEstateUnitsSchema = (t: TFunction) =>
  object().shape({
    toEstateUnits: array().min(2, t('estate_unit_split.error.no_estate_units')),
  });
