import { OperationResult, useClient } from 'urql';

import {
  CanUseWorkTeamInternalCodeDocument,
  CanUseWorkTeamInternalCodeQuery,
  GetWorkTeamInternalCodeDocument,
  GetWorkTeamInternalCodeQuery,
} from '../gql/RealGimm.Web.WorkTeam.operation';

export const useWorkTeam = () => {
  const client = useClient();

  const checkCanUseInternalCode = (
    internalCode: string,
    currentWorkTeamId: number | null,
    onComplete: (result: boolean) => void,
  ) => {
    const checkCanUseInternalCode = async () => {
      if (internalCode.length === 0) {
        onComplete(true);
        return;
      }

      const result: OperationResult<CanUseWorkTeamInternalCodeQuery> = await client.query(
        CanUseWorkTeamInternalCodeDocument,
        {
          currentWorkTeamId,
          internalCode,
        },
      );

      onComplete(result.data?.workTeam.canUseInternalCode ?? true);
    };

    void checkCanUseInternalCode();
  };

  const getInternalCode = (onComplete: (result: string) => void) => {
    const getInternalCode = async () => {
      const result: OperationResult<GetWorkTeamInternalCodeQuery> = await client.query(
        GetWorkTeamInternalCodeDocument,
        {},
      );

      onComplete(result.data?.workTeam.proposeNewInternalCode ?? '');
    };

    void getInternalCode();
  };

  return {
    checkCanUseInternalCode,
    getInternalCode,
  };
};
