import { OperationResult, useClient } from 'urql';

import {
  CanUseFunctionAreaInternalCodeDocument,
  CanUseFunctionAreaInternalCodeQuery,
  GetFunctionAreaInternalCodeDocument,
  GetFunctionAreaInternalCodeQuery,
} from '../gql/RealGimm.Web.FunctionArea.operation';

export const useFunctionArea = () => {
  const client = useClient();

  const checkCanUseInternalCode = (
    internalCode: string,
    currentFunctionAreaId: number | null,
    functionAreaInternalCodes: string[],
    onComplete: (result: boolean) => void,
  ) => {
    const checkCanUseInternalCode = async () => {
      if (internalCode.length === 0) {
        onComplete(true);
        return;
      }

      if (functionAreaInternalCodes.includes(internalCode)) {
        onComplete(false);
        return;
      }

      const result: OperationResult<CanUseFunctionAreaInternalCodeQuery> = await client.query(
        CanUseFunctionAreaInternalCodeDocument,
        {
          currentFunctionAreaId,
          internalCode,
        },
      );

      onComplete(result.data?.functionArea.canUseInternalCode ?? true);
    };

    void checkCanUseInternalCode();
  };

  const getInternalCode = (additionallyOccupiedCodes: string[], onComplete: (result: string) => void) => {
    const getInternalCode = async () => {
      const result: OperationResult<GetFunctionAreaInternalCodeQuery> = await client.query(
        GetFunctionAreaInternalCodeDocument,
        {
          additionallyOccupiedCodes,
        },
      );

      onComplete(result.data?.functionArea.proposeNewInternalCode ?? '');
    };

    void getInternalCode();
  };

  return {
    checkCanUseInternalCode,
    getInternalCode,
  };
};
