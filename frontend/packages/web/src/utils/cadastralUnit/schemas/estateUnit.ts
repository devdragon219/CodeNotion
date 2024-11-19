import { TFunction } from 'i18next';
import { object } from 'yup';

export const getCadastralUnitEstateUnitSchema = (t: TFunction) =>
  object().shape({
    estateUnit: object().required(t('cadastral_unit.error.no_estate_unit')),
  });
