import { PriceListFieldValue } from '../FieldValues/PriceList';
import { PriceListMeasurementUnitFieldValue } from '../FieldValues/PriceListMeasurementUnit';

export interface PriceListArticlePricePeriodFormInput {
  price: number | null;
  pricePeriodId: number | null;
  since: Date | null;
  until: Date | null;
}

export interface PriceListArticleFormInput {
  catalogueTypes: {
    catalogueTypeId: number;
    categoryName: string;
    name: string;
    subCategoryName: string;
  }[];
  internalCode: string;
  measurementUnit: PriceListMeasurementUnitFieldValue | null;
  name: string;
  price: number | null;
  priceList: PriceListFieldValue | null;
  priceListArticleId: number | null;
  pricePeriods: PriceListArticlePricePeriodFormInput[];
  since: Date | null;
}
