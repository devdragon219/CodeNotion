import { PriceListDetailFragment } from '../../gql/RealGimm.Web.PriceList.fragment';
import { PriceListFormInput } from '../../interfaces/FormInputs/PriceList';

export const parsePriceListToPriceListFormInput = (priceList: PriceListDetailFragment): PriceListFormInput => ({
  internalCode: priceList.internalCode,
  isDefault: priceList.isDefault,
  name: priceList.name,
  ordering: priceList.ordering,
  priceListId: priceList.id,
});
