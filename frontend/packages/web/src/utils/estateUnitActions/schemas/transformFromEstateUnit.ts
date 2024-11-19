import { TFunction } from 'i18next';
import { object } from 'yup';

export const getEstateUnitTransformFromEstateUnitSchema = (t: TFunction) =>
  object().shape({
    fromEstateUnit: object().required(t('estate_unit_transform.error.no_estate_unit')),
  });
