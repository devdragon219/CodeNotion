import { TFunction } from 'i18next';
import { array, object } from 'yup';

export const getContractCounterpartAddVariationNewCounterpartsSchema = (t: TFunction) =>
  object().shape({
    newCounterparts: array().min(1, t('contract.error.no_subjects')),
  });
