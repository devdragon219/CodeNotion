import { TFunction } from 'i18next';
import { object } from 'yup';

export const getEstateUnitEstateSchema = (t: TFunction) =>
  object().shape({
    estate: object().required(t('estate_unit.error.no_estate')),
  });
