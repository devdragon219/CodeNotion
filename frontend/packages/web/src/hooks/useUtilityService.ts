import { OperationResult, useClient } from 'urql';

import {
  CanUseUtilityServiceInternalCodeDocument,
  CanUseUtilityServiceInternalCodeQuery,
  GetUtilityServiceInternalCodeDocument,
  GetUtilityServiceInternalCodeQuery,
} from '../gql/RealGimm.Web.UtilityService.operation';

export const useUtilityService = () => {
  const client = useClient();

  const checkCanUseInternalCode = (
    internalCode: string,
    currentUtilityServiceId: number | null,
    onComplete: (result: boolean) => void,
  ) => {
    const checkCanUseInternalCode = async () => {
      if (internalCode.length === 0) {
        onComplete(true);
        return;
      }

      const result: OperationResult<CanUseUtilityServiceInternalCodeQuery> = await client.query(
        CanUseUtilityServiceInternalCodeDocument,
        {
          currentUtilityServiceId,
          internalCode,
        },
      );

      onComplete(result.data?.utilityService.canUseInternalCode ?? true);
    };

    void checkCanUseInternalCode();
  };

  const getInternalCode = (onComplete: (result: string) => void) => {
    const getInternalCode = async () => {
      const result: OperationResult<GetUtilityServiceInternalCodeQuery> = await client.query(
        GetUtilityServiceInternalCodeDocument,
        {},
      );

      onComplete(result.data?.utilityService.proposeNewInternalCode ?? '');
    };

    void getInternalCode();
  };

  return {
    checkCanUseInternalCode,
    getInternalCode,
  };
};
