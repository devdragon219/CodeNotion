import { TFunction } from 'i18next';
import { array, object } from 'yup';

import { getCatalogueItemSchema } from '../../catalogueItem/schemas/catalogueItem';

export const getCatalogueItemsSchema = (canUseInternalCodes: Record<string, boolean>, language: string, t: TFunction) =>
  object().shape({
    items: array().of(getCatalogueItemSchema(canUseInternalCodes, language, t)),
  });
