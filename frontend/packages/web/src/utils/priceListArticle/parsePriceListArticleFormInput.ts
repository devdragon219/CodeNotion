import { FormMode } from '@realgimm5/frontend-common/enums';
import { AddPriceListArticleInput, UpdatePriceListArticleInput } from '@realgimm5/frontend-common/gql/types';
import { parseDateToString } from '@realgimm5/frontend-common/utils';

import { PriceListArticleFormInput } from '../../interfaces/FormInputs/PriceListArticle';

type ReturnType<M> = M extends FormMode.Create ? AddPriceListArticleInput : UpdatePriceListArticleInput;
export const parsePriceListArticleFormInputToPriceListArticleInput = <M extends FormMode>(
  priceListArticle: PriceListArticleFormInput,
  mode: M,
): ReturnType<M> =>
  (mode === FormMode.Create
    ? {
        catalogueTypeIds: priceListArticle.catalogueTypes.map(({ catalogueTypeId }) => catalogueTypeId),
        internalCode: priceListArticle.internalCode,
        measurementUnitId: priceListArticle.measurementUnit!.id,
        name: priceListArticle.name,
        price: priceListArticle.price!,
        priceListId: priceListArticle.priceList!.id,
        since: parseDateToString(priceListArticle.since)!,
      }
    : {
        catalogueTypeIds: priceListArticle.catalogueTypes.map(({ catalogueTypeId }) => catalogueTypeId),
        internalCode: priceListArticle.internalCode,
        measurementUnitId: priceListArticle.measurementUnit!.id,
        name: priceListArticle.name,
        priceListId: priceListArticle.priceList!.id,
        pricePeriods: priceListArticle.pricePeriods.map((pricePeriod) => ({
          price: pricePeriod.price!,
          id: pricePeriod.pricePeriodId,
          since: parseDateToString(pricePeriod.since)!,
          until: parseDateToString(pricePeriod.until),
        })),
      }) as ReturnType<M>;
