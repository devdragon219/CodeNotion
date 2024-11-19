import { OperationResult, useClient } from 'urql';

import {
  CanUseServiceCategoryInternalCodeDocument,
  CanUseServiceCategoryInternalCodeQuery,
  GetServiceCategoryInternalCodeDocument,
  GetServiceCategoryInternalCodeQuery,
} from '../gql/RealGimm.Web.ServiceCategory.operation';

export const useServiceCategory = () => {
  const client = useClient();

  const checkCanUseInternalCode = (
    internalCode: string,
    currentServiceCategoryId: number | null,
    onComplete: (result: boolean) => void,
  ) => {
    const checkCanUseInternalCode = async () => {
      if (internalCode.length === 0) {
        onComplete(true);
        return;
      }

      const result: OperationResult<CanUseServiceCategoryInternalCodeQuery> = await client.query(
        CanUseServiceCategoryInternalCodeDocument,
        {
          currentServiceCategoryId,
          internalCode,
        },
      );

      onComplete(result.data?.serviceCategory.canUseInternalCode ?? true);
    };

    void checkCanUseInternalCode();
  };

  const getInternalCode = (onComplete: (result: string) => void) => {
    const getInternalCode = async () => {
      const result: OperationResult<GetServiceCategoryInternalCodeQuery> = await client.query(
        GetServiceCategoryInternalCodeDocument,
        {},
      );

      onComplete(result.data?.serviceCategory.proposeNewInternalCode ?? '');
    };

    void getInternalCode();
  };

  return {
    checkCanUseInternalCode,
    getInternalCode,
  };
};
