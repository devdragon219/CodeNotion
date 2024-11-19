import { OperationResult, useClient } from 'urql';

import {
  CanUseUsageTypeInternalCodeDocument,
  CanUseUsageTypeInternalCodeQuery,
  GetUsageTypeInternalCodeDocument,
  GetUsageTypeInternalCodeQuery,
} from '../gql/RealGimm.Web.UsageType.operation';

export const useUsageType = () => {
  const client = useClient();

  const checkCanUseInternalCode = (
    internalCode: string,
    currentUsageTypeId: number | null,
    onComplete: (result: boolean) => void,
  ) => {
    const checkCanUseInternalCode = async () => {
      if (internalCode.length === 0) {
        onComplete(true);
        return;
      }

      const result: OperationResult<CanUseUsageTypeInternalCodeQuery> = await client.query(
        CanUseUsageTypeInternalCodeDocument,
        {
          internalCode,
          currentUsageTypeId,
        },
      );

      onComplete(result.data?.estateUsageType.canUseInternalCode ?? true);
    };

    void checkCanUseInternalCode();
  };

  const getInternalCode = (onComplete: (result: string) => void) => {
    const getInternalCode = async () => {
      const result: OperationResult<GetUsageTypeInternalCodeQuery> = await client.query(
        GetUsageTypeInternalCodeDocument,
        {},
      );

      onComplete(result.data?.estateUsageType.proposeNewInternalCode ?? '');
    };

    void getInternalCode();
  };

  return {
    checkCanUseInternalCode,
    getInternalCode,
  };
};
