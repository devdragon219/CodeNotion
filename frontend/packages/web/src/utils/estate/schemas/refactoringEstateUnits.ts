import { TFunction } from 'i18next';
import { array, object } from 'yup';

export const getEstateRefactoringEstateUnitsSchema = (t: TFunction) =>
  object().shape({
    estateUnits: array().min(1, t('estate.error.no_estate_units')),
  });
