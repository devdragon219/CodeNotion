import { OperationResult, useClient } from 'urql';

import {
  CanUseAccountingItemInternalCodeDocument,
  CanUseAccountingItemInternalCodeQuery,
  GetAccountingItemInternalCodeDocument,
  GetAccountingItemInternalCodeQuery,
} from '../gql/RealGimm.Web.AccountingItem.operation';

export const useAccountingItem = () => {
  const client = useClient();

  const checkCanUseInternalCode = (
    internalCode: string,
    currentAccountingItemId: number | null,
    onComplete: (result: boolean) => void,
  ) => {
    const checkCanUseInternalCode = async () => {
      if (internalCode.length === 0) {
        onComplete(true);
        return;
      }

      const result: OperationResult<CanUseAccountingItemInternalCodeQuery> = await client.query(
        CanUseAccountingItemInternalCodeDocument,
        {
          currentAccountingItemId,
          internalCode,
        },
      );

      onComplete(result.data?.accountingItem.canUseInternalCode ?? true);
    };

    void checkCanUseInternalCode();
  };

  const getInternalCode = (onComplete: (result: string) => void) => {
    const getInternalCode = async () => {
      const result: OperationResult<GetAccountingItemInternalCodeQuery> = await client.query(
        GetAccountingItemInternalCodeDocument,
        {},
      );

      onComplete(result.data?.accountingItem.proposeNewInternalCode ?? '');
    };

    void getInternalCode();
  };

  return {
    checkCanUseInternalCode,
    getInternalCode,
  };
};
