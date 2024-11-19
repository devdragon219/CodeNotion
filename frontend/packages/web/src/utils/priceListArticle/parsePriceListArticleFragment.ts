import { parseStringToDate } from '@realgimm5/frontend-common/utils';

import { PriceListArticleDetailFragment } from '../../gql/RealGimm.Web.PriceListArticle.fragment';
import { PriceListArticleFormInput } from '../../interfaces/FormInputs/PriceListArticle';

export const parsePriceListArticleToPriceListArticleFormInput = (
  priceListArticle: PriceListArticleDetailFragment,
): PriceListArticleFormInput => ({
  catalogueTypes: priceListArticle.catalogueTypes.map((catalogueType) => ({
    catalogueTypeId: catalogueType.id,
    categoryName: catalogueType.category.name,
    name: catalogueType.name,
    subCategoryName: catalogueType.subCategory?.name ?? '',
  })),
  internalCode: priceListArticle.internalCode,
  measurementUnit: priceListArticle.measurementUnit,
  name: priceListArticle.name,
  price: null,
  priceList: priceListArticle.priceList,
  priceListArticleId: priceListArticle.id,
  pricePeriods: priceListArticle.pricePeriods.map((period) => ({
    price: period.price,
    pricePeriodId: period.id,
    since: parseStringToDate(period.since),
    until: parseStringToDate(period.until),
  })),
  since: null,
});
