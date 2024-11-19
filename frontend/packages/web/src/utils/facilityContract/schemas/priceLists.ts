import { TFunction } from 'i18next';
import { array, object } from 'yup';

export const getFacilityContractPriceListsSchema = (t: TFunction) =>
  object().shape({
    priceLists: array().min(1, t('facility_contract.error.no_price_lists_selected')),
  });
