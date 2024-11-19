import { OperationResult, useClient } from 'urql';

import {
  CanUsePriceListInternalCodeDocument,
  CanUsePriceListInternalCodeQuery,
  GetPriceListInternalCodeDocument,
  GetPriceListInternalCodeQuery,
} from '../gql/RealGimm.Web.PriceList.operation';

export const usePriceList = () => {
  const client = useClient();

  const checkCanUseInternalCode = (
    internalCode: string,
    currentPriceListId: number | null,
    onComplete: (result: boolean) => void,
  ) => {
    const checkCanUseInternalCode = async () => {
      if (internalCode.length === 0) {
        onComplete(true);
        return;
      }

      const result: OperationResult<CanUsePriceListInternalCodeQuery> = await client.query(
        CanUsePriceListInternalCodeDocument,
        {
          currentPriceListId,
          internalCode,
        },
      );

      onComplete(result.data?.priceList.canUseInternalCode ?? true);
    };

    void checkCanUseInternalCode();
  };

  const getInternalCode = (onComplete: (result: string) => void) => {
    const getInternalCode = async () => {
      const result: OperationResult<GetPriceListInternalCodeQuery> = await client.query(
        GetPriceListInternalCodeDocument,
        {},
      );

      onComplete(result.data?.priceList.proposeNewInternalCode ?? '');
    };

    void getInternalCode();
  };

  return {
    checkCanUseInternalCode,
    getInternalCode,
  };
};
