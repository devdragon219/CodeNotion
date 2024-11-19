import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { number, object, string } from 'yup';

export const getCadastralLandCategorySchema = (canUseInternalCode: boolean, t: TFunction) =>
  object().shape({
    internalCode: string()
      .required(getRequiredTranslation('cadastral_land_category.field.internal_code', t))
      .valid(canUseInternalCode, t('cadastral_land_category.error.internal_code')),
    description: string().required(getRequiredTranslation('cadastral_land_category.field.description', t)),
    countryISO: string().required(getRequiredTranslation('cadastral_land_category.field.country_iso', t)),
    ordering: number().required(getRequiredTranslation('cadastral_land_category.field.ordering', t)),
  });
