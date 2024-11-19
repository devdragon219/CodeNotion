import { TFunction } from 'i18next';
import { object } from 'yup';

export const getCatalogueEstateSchema = (t: TFunction) =>
  object().shape({
    estate: object().required(t('catalogue.error.no_estate')),
  });
