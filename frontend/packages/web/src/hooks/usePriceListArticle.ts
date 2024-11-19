import { OperationResult, useClient } from 'urql';

import {
  CanUsePriceListArticleInternalCodeDocument,
  CanUsePriceListArticleInternalCodeQuery,
  GetPriceListArticleInternalCodeDocument,
  GetPriceListArticleInternalCodeQuery,
} from '../gql/RealGimm.Web.PriceListArticle.operation';

export const usePriceListArticle = () => {
  const client = useClient();

  const checkCanUseInternalCode = (
    internalCode: string,
    currentPriceListArticleId: number | null,
    onComplete: (result: boolean) => void,
  ) => {
    const checkCanUseInternalCode = async () => {
      if (internalCode.length === 0) {
        onComplete(true);
        return;
      }

      const result: OperationResult<CanUsePriceListArticleInternalCodeQuery> = await client.query(
        CanUsePriceListArticleInternalCodeDocument,
        {
          currentPriceListArticleId,
          internalCode,
        },
      );

      onComplete(result.data?.priceListArticle.canUseInternalCode ?? true);
    };

    void checkCanUseInternalCode();
  };

  const getInternalCode = (onComplete: (result: string) => void) => {
    const getInternalCode = async () => {
      const result: OperationResult<GetPriceListArticleInternalCodeQuery> = await client.query(
        GetPriceListArticleInternalCodeDocument,
        {},
      );

      onComplete(result.data?.priceListArticle.proposeNewInternalCode ?? '');
    };

    void getInternalCode();
  };

  return {
    checkCanUseInternalCode,
    getInternalCode,
  };
};
