import { OperationResult, useClient } from 'urql';

import {
  CanUseMainUsageTypeInternalCodeDocument,
  CanUseMainUsageTypeInternalCodeQuery,
  GetMainUsageTypeInternalCodeDocument,
  GetMainUsageTypeInternalCodeQuery,
} from '../gql/RealGimm.Web.MainUsageType.operation';

export const useMainUsageType = () => {
  const client = useClient();

  const checkCanUseInternalCode = (
    internalCode: string,
    currentMainUsageTypeId: number | null,
    onComplete: (result: boolean) => void,
  ) => {
    const checkCanUseInternalCode = async () => {
      if (internalCode.length === 0) {
        onComplete(true);
        return;
      }

      const result: OperationResult<CanUseMainUsageTypeInternalCodeQuery> = await client.query(
        CanUseMainUsageTypeInternalCodeDocument,
        {
          internalCode,
          currentMainUsageTypeId,
        },
      );

      onComplete(result.data?.estateMainUsageType.canUseInternalCode ?? true);
    };

    void checkCanUseInternalCode();
  };

  const getInternalCode = (onComplete: (result: string) => void) => {
    const getInternalCode = async () => {
      const result: OperationResult<GetMainUsageTypeInternalCodeQuery> = await client.query(
        GetMainUsageTypeInternalCodeDocument,
        {},
      );

      onComplete(result.data?.estateMainUsageType.proposeNewInternalCode ?? '');
    };

    void getInternalCode();
  };

  return {
    checkCanUseInternalCode,
    getInternalCode,
  };
};
