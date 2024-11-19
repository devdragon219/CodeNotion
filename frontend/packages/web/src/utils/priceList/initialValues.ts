import { PriceListFormInput } from '../../interfaces/FormInputs/PriceList';

export const getEmptyPriceListFormInput = (): PriceListFormInput => ({
  internalCode: '',
  isDefault: false,
  name: '',
  ordering: 0,
  priceListId: null,
});
