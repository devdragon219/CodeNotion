import { TFunction } from 'i18next';
import { object } from 'yup';

export const getEstateUnitSplitEstateUnitSchema = (t: TFunction) =>
  object().shape({
    fromEstateUnit: object().required(t('estate_unit_split.error.no_estate_unit')),
  });
