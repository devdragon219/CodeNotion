import { OperationResult, useClient } from 'urql';

import {
  CanUseOrgUnitInternalCodeDocument,
  CanUseOrgUnitInternalCodeQuery,
  GetOrgUnitInternalCodeDocument,
  GetOrgUnitInternalCodeQuery,
} from '../gql/RealGimm.Web.OrgUnit.operation';

export const useOrgUnit = () => {
  const client = useClient();

  const checkCanUseInternalCode = (
    internalCode: string,
    currentOrgUnitId: number | null,
    onComplete: (result: boolean) => void,
  ) => {
    const checkCanUseInternalCode = async () => {
      if (internalCode.length === 0) {
        onComplete(true);
        return;
      }

      const result: OperationResult<CanUseOrgUnitInternalCodeQuery> = await client.query(
        CanUseOrgUnitInternalCodeDocument,
        {
          currentOrgUnitId,
          internalCode,
        },
      );

      onComplete(result.data?.orgUnit.canUseInternalCode ?? true);
    };

    void checkCanUseInternalCode();
  };

  const getInternalCode = (onComplete: (result: string) => void) => {
    const getInternalCode = async () => {
      const result: OperationResult<GetOrgUnitInternalCodeQuery> = await client.query(
        GetOrgUnitInternalCodeDocument,
        {},
      );

      onComplete(result.data?.orgUnit.proposeNewInternalCode ?? '');
    };

    void getInternalCode();
  };

  return {
    checkCanUseInternalCode,
    getInternalCode,
  };
};
