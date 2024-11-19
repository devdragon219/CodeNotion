import { PriceListFieldValue } from '../../interfaces/FieldValues/PriceList';
import {
  PriceListArticleFormInput,
  PriceListArticlePricePeriodFormInput,
} from '../../interfaces/FormInputs/PriceListArticle';

export const getEmptyPriceListArticlePricePeriodFormInput = (): PriceListArticlePricePeriodFormInput => ({
  price: null,
  pricePeriodId: null,
  since: null,
  until: null,
});

export const getEmptyPriceListArticleFormInput = (
  priceList: PriceListFieldValue | null = null,
): PriceListArticleFormInput => ({
  catalogueTypes: [],
  internalCode: '',
  measurementUnit: null,
  name: '',
  price: null,
  priceList,
  priceListArticleId: null,
  pricePeriods: [],
  since: new Date(),
});
