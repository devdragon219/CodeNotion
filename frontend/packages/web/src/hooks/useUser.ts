import { OperationResult, useClient } from 'urql';

import { CanUseUsernameDocument, CanUseUsernameQuery } from '../gql/RealGimm.Web.Admin.operation';

export const useUser = () => {
  const client = useClient();

  const checkCanUseUserName = (
    userName: string,
    currentUserId: number | null,
    onComplete: (result: boolean) => void,
  ) => {
    const checkCanUseUserName = async () => {
      if (userName.length === 0) {
        onComplete(true);
        return;
      }

      const result: OperationResult<CanUseUsernameQuery> = await client.query(CanUseUsernameDocument, {
        currentUserId,
        userName,
      });

      onComplete(result.data?.admin.canUseUsername ?? true);
    };

    void checkCanUseUserName();
  };

  return {
    checkCanUseUserName,
  };
};
