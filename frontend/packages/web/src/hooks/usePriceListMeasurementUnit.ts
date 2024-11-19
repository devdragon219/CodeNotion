import { OperationResult, useClient } from 'urql';

import {
  CanUsePriceListMeasurementUnitInternalCodeDocument,
  CanUsePriceListMeasurementUnitInternalCodeQuery,
  GetPriceListMeasurementUnitInternalCodeDocument,
  GetPriceListMeasurementUnitInternalCodeQuery,
} from '../gql/RealGimm.Web.PriceListMeasurementUnit.operation';

export const usePriceListMeasurementUnit = () => {
  const client = useClient();

  const checkCanUseInternalCode = (
    internalCode: string,
    currentPriceListMeasurementUnitId: number | null,
    onComplete: (result: boolean) => void,
  ) => {
    const checkCanUseInternalCode = async () => {
      if (internalCode.length === 0) {
        onComplete(true);
        return;
      }

      const result: OperationResult<CanUsePriceListMeasurementUnitInternalCodeQuery> = await client.query(
        CanUsePriceListMeasurementUnitInternalCodeDocument,
        {
          internalCode,
          currentPriceListMeasurementUnitId,
        },
      );

      onComplete(result.data?.priceListMeasurementUnit.canUseInternalCode ?? true);
    };

    void checkCanUseInternalCode();
  };

  const getInternalCode = (onComplete: (result: string) => void) => {
    const getInternalCode = async () => {
      const result: OperationResult<GetPriceListMeasurementUnitInternalCodeQuery> = await client.query(
        GetPriceListMeasurementUnitInternalCodeDocument,
        {},
      );

      onComplete(result.data?.priceListMeasurementUnit.proposeNewInternalCode ?? '');
    };

    void getInternalCode();
  };

  return {
    checkCanUseInternalCode,
    getInternalCode,
  };
};
