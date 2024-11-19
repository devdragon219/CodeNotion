import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { object } from 'yup';

export const getCatalogueGeneralDataSchema = (t: TFunction) =>
  object().shape({
    catalogueType: object().required(getRequiredTranslation('catalogue.field.catalogue_type', t)),
    category: object().required(getRequiredTranslation('catalogue.field.catalogue_category', t)),
  });
