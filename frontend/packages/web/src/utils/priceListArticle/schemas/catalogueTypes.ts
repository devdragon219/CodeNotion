import { TFunction } from 'i18next';
import { array, object } from 'yup';

export const getPriceListArticleCatalogueTypesSchema = (t: TFunction) =>
  object().shape({
    catalogueTypes: array().min(1, t('price_list_article.error.no_catalogue_types_selected')),
  });
