import { TFunction } from 'i18next';
import { array, object } from 'yup';

export const getContractCounterpartDeceaseVariationOriginalCounterpartSchema = (
  isContractActive: boolean,
  t: TFunction,
) =>
  object().shape({
    originalCounterpart: object().required(
      t(`contract.error.no_counterparts_${isContractActive ? 'tenant' : 'landlord'}`),
    ),
  });

export const getContractCounterpartDeceaseVariationTakeoverCounterpartsSchema = (t: TFunction) =>
  object().shape({
    takeoverCounterparts: array().min(1, t('contract.error.no_heirs')),
  });
