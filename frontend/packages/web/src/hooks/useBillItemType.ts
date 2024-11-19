import { OperationResult, useClient } from 'urql';

import {
  CanUseBillItemTypeInternalCodeDocument,
  CanUseBillItemTypeInternalCodeQuery,
  GetBillItemTypeInternalCodeDocument,
  GetBillItemTypeInternalCodeQuery,
} from '../gql/RealGimm.Web.BillItemType.operation';

export const useBillItemType = () => {
  const client = useClient();

  const checkCanUseInternalCode = (
    internalCode: string,
    currentBillItemTypeId: number | null,
    onComplete: (result: boolean) => void,
  ) => {
    const checkCanUseInternalCode = async () => {
      if (internalCode.length === 0) {
        onComplete(true);
        return;
      }

      const result: OperationResult<CanUseBillItemTypeInternalCodeQuery> = await client.query(
        CanUseBillItemTypeInternalCodeDocument,
        {
          currentBillItemTypeId,
          internalCode,
        },
      );

      onComplete(result.data?.billItemType.canUseInternalCode ?? true);
    };

    void checkCanUseInternalCode();
  };

  const getInternalCode = (onComplete: (result: string) => void) => {
    const getInternalCode = async () => {
      const result: OperationResult<GetBillItemTypeInternalCodeQuery> = await client.query(
        GetBillItemTypeInternalCodeDocument,
        {},
      );

      onComplete(result.data?.billItemType.proposeNewInternalCode ?? '');
    };

    void getInternalCode();
  };

  return {
    checkCanUseInternalCode,
    getInternalCode,
  };
};
