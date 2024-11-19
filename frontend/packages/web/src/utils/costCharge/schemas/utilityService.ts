import { TFunction } from 'i18next';
import { object } from 'yup';

export const getCostChargeUtilityServiceSchema = (t: TFunction) =>
  object().shape({
    utilityService: object().required(t('cost_charge.error.no_utility_service')),
  });
