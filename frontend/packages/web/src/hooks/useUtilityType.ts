import { OperationResult, useClient } from 'urql';

import { GetUtilityServicesDocument, GetUtilityServicesQuery } from '../gql/RealGimm.Web.UtilityService.operation';
import {
  CanUseUtilityTypeInternalCodeDocument,
  CanUseUtilityTypeInternalCodeQuery,
  GetUtilityTypeInternalCodeDocument,
  GetUtilityTypeInternalCodeQuery,
} from '../gql/RealGimm.Web.UtilityType.operation';

export const useUtilityType = () => {
  const client = useClient();

  const checkCanUseInternalCode = (
    internalCode: string,
    currentUtilityTypeId: number | null,
    onComplete: (result: boolean) => void,
  ) => {
    const checkCanUseInternalCode = async () => {
      if (internalCode.length === 0) {
        onComplete(true);
        return;
      }

      const result: OperationResult<CanUseUtilityTypeInternalCodeQuery> = await client.query(
        CanUseUtilityTypeInternalCodeDocument,
        {
          currentUtilityTypeId,
          internalCode,
        },
      );

      onComplete(result.data?.utilityType.canUseInternalCode ?? true);
    };

    void checkCanUseInternalCode();
  };

  const checkHasUtilityServices = (currentUtilityTypeId: number | null, onComplete: (result: boolean) => void) => {
    const checkHasUtilityServices = async () => {
      if (currentUtilityTypeId === null) {
        onComplete(false);
        return;
      }

      const result: OperationResult<GetUtilityServicesQuery> = await client.query(GetUtilityServicesDocument, {
        where: {
          utilityType: {
            id: {
              eq: currentUtilityTypeId,
            },
          },
        },
      });
      const nodes = result.data?.utilityService.listUtilityServices?.nodes ?? [];

      onComplete(nodes.length !== 0);
    };

    void checkHasUtilityServices();
  };

  const getInternalCode = (onComplete: (result: string) => void) => {
    const getInternalCode = async () => {
      const result: OperationResult<GetUtilityTypeInternalCodeQuery> = await client.query(
        GetUtilityTypeInternalCodeDocument,
        {},
      );

      onComplete(result.data?.utilityType.proposeNewInternalCode ?? '');
    };

    void getInternalCode();
  };

  return {
    checkCanUseInternalCode,
    checkHasUtilityServices,
    getInternalCode,
  };
};
