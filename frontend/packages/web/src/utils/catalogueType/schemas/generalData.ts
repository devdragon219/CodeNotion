import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { array, object, string } from 'yup';

export const getCatalogueTypeGeneralDataSchema = (canUseInternalCode: boolean, t: TFunction) =>
  object().shape({
    internalCode: string()
      .required(getRequiredTranslation('catalogue_type.field.catalogue_type_code', t))
      .valid(canUseInternalCode, t('catalogue_type.error.internal_code')),
    name: string().required(getRequiredTranslation('catalogue_type.field.catalogue_type', t)),
    category: object().required(getRequiredTranslation('catalogue_type.field.catalogue_type_category', t)),
    usageTypes: array().min(1, getRequiredTranslation('catalogue_type.field.catalogue_type_usage_type', t)),
  });
