import { OperationResult, useClient } from 'urql';

import {
  CanUseCraftInternalCodeDocument,
  CanUseCraftInternalCodeQuery,
  GetCraftInternalCodeDocument,
  GetCraftInternalCodeQuery,
} from '../gql/RealGimm.Web.Craft.operation';

export const useCraft = () => {
  const client = useClient();

  const checkCanUseInternalCode = (
    internalCode: string,
    currentCraftId: number | null,
    onComplete: (result: boolean) => void,
  ) => {
    const checkCanUseInternalCode = async () => {
      if (internalCode.length === 0) {
        onComplete(true);
        return;
      }

      const result: OperationResult<CanUseCraftInternalCodeQuery> = await client.query(
        CanUseCraftInternalCodeDocument,
        {
          internalCode,
          currentCraftId,
        },
      );

      onComplete(result.data?.craft.canUseInternalCode ?? true);
    };

    void checkCanUseInternalCode();
  };

  const getInternalCode = (onComplete: (result: string) => void) => {
    const getInternalCode = async () => {
      const result: OperationResult<GetCraftInternalCodeQuery> = await client.query(GetCraftInternalCodeDocument, {});

      onComplete(result.data?.craft.proposeNewInternalCode ?? '');
    };

    void getInternalCode();
  };

  return {
    checkCanUseInternalCode,
    getInternalCode,
  };
};
