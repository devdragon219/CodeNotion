import { OperationResult, useClient } from 'urql';

import {
  CanUseVatRateInternalCodeDocument,
  CanUseVatRateInternalCodeQuery,
  GetVatRateInternalCodeDocument,
  GetVatRateInternalCodeQuery,
} from '../gql/RealGimm.Web.VatRate.operation';

export const useVatRate = () => {
  const client = useClient();

  const checkCanUseInternalCode = (
    internalCode: string,
    currentVatRateId: number | null,
    onComplete: (result: boolean) => void,
  ) => {
    const checkCanUseInternalCode = async () => {
      if (internalCode.length === 0) {
        onComplete(true);
        return;
      }

      const result: OperationResult<CanUseVatRateInternalCodeQuery> = await client.query(
        CanUseVatRateInternalCodeDocument,
        {
          currentVatRateId,
          internalCode,
        },
      );

      onComplete(result.data?.vatRate.canUseInternalCode ?? true);
    };

    void checkCanUseInternalCode();
  };

  const getInternalCode = (onComplete: (result: string) => void) => {
    const getInternalCode = async () => {
      const result: OperationResult<GetVatRateInternalCodeQuery> = await client.query(
        GetVatRateInternalCodeDocument,
        {},
      );

      onComplete(result.data?.vatRate.proposeNewInternalCode ?? '');
    };

    void getInternalCode();
  };

  return {
    checkCanUseInternalCode,
    getInternalCode,
  };
};
