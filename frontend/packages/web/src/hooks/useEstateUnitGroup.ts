import { OperationResult, useClient } from 'urql';

import {
  CanUseEstateUnitGroupInternalCodeDocument,
  CanUseEstateUnitGroupInternalCodeQuery,
  GetEstateUnitGroupInternalCodeDocument,
  GetEstateUnitGroupInternalCodeQuery,
} from '../gql/RealGimm.Web.EstateUnitGroup.operation';

export const useEstateUnitGroup = () => {
  const client = useClient();

  const checkCanUseInternalCode = (
    internalCode: string,
    currentEstateUnitGroupId: number | null,
    onComplete: (result: boolean) => void,
  ) => {
    const checkCanUseInternalCode = async () => {
      if (internalCode.length === 0) {
        onComplete(true);
        return;
      }

      const result: OperationResult<CanUseEstateUnitGroupInternalCodeQuery> = await client.query(
        CanUseEstateUnitGroupInternalCodeDocument,
        {
          internalCode,
          currentEstateUnitGroupId,
        },
      );

      onComplete(result.data?.estateUnitGroup.canUseInternalCode ?? true);
    };

    void checkCanUseInternalCode();
  };

  const getInternalCode = (onComplete: (result: string) => void) => {
    const getInternalCode = async () => {
      const result: OperationResult<GetEstateUnitGroupInternalCodeQuery> = await client.query(
        GetEstateUnitGroupInternalCodeDocument,
        {},
      );

      onComplete(result.data?.estateUnitGroup.proposeNewInternalCode ?? '');
    };

    void getInternalCode();
  };

  return {
    checkCanUseInternalCode,
    getInternalCode,
  };
};
