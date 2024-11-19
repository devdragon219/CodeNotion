import { PriceListInput } from '@realgimm5/frontend-common/gql/types';

import { PriceListFormInput } from '../../interfaces/FormInputs/PriceList';

export const parsePriceListFormInputToPriceListInput = (priceList: PriceListFormInput): PriceListInput => ({
  internalCode: priceList.internalCode,
  isDefault: priceList.isDefault,
  name: priceList.name,
  ordering: priceList.ordering,
});
