import { TFunction } from 'i18next';
import { array, object } from 'yup';

export const getUtilityServiceEstatesSchema = (t: TFunction) =>
  object().shape({
    estates: array().min(1, t('utility_service.error.no_estates')),
  });
