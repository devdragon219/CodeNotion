import { OperationResult, useClient } from 'urql';

import {
  CanUseServiceSubCategoryInternalCodeDocument,
  CanUseServiceSubCategoryInternalCodeQuery,
  GetServiceSubCategoryInternalCodeDocument,
  GetServiceSubCategoryInternalCodeQuery,
} from '../gql/RealGimm.Web.ServiceCategory.operation';

export const useServiceSubCategory = () => {
  const client = useClient();

  const checkCanUseInternalCode = (
    internalCode: string,
    serviceCategoryId: number | null,
    currentServiceSubCategoryId: number | null,
    serviceSubCategoryInternalCodes: string[],
    onComplete: (result: boolean) => void,
  ) => {
    const checkCanUseInternalCode = async () => {
      if (internalCode.length === 0) {
        onComplete(true);
        return;
      }

      if (serviceSubCategoryInternalCodes.includes(internalCode)) {
        onComplete(false);
        return;
      }

      const result: OperationResult<CanUseServiceSubCategoryInternalCodeQuery> = await client.query(
        CanUseServiceSubCategoryInternalCodeDocument,
        {
          serviceCategoryId,
          currentServiceSubCategoryId,
          internalCode,
        },
      );

      onComplete(result.data?.serviceCategory.canUseInternalCodeSubCategory ?? true);
    };

    void checkCanUseInternalCode();
  };

  const getInternalCode = (
    parentInternalCode: string,
    additionallyOccupiedCodes: string[],
    onComplete: (result: string) => void,
  ) => {
    const getInternalCode = async () => {
      const result: OperationResult<GetServiceSubCategoryInternalCodeQuery> = await client.query(
        GetServiceSubCategoryInternalCodeDocument,
        {
          parentInternalCode,
          additionallyOccupiedCodes,
        },
      );

      onComplete(result.data?.serviceCategory.proposeNewInternalCodeSubCategory ?? '');
    };

    void getInternalCode();
  };

  return {
    checkCanUseInternalCode,
    getInternalCode,
  };
};
