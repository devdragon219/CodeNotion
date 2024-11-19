import { OperationResult, useClient } from 'urql';

import {
  CanUseTicketTypeInternalCodeDocument,
  CanUseTicketTypeInternalCodeQuery,
  GetTicketTypeInternalCodeDocument,
  GetTicketTypeInternalCodeQuery,
} from '../gql/RealGimm.Web.TicketType.operation';

export const useTicketType = () => {
  const client = useClient();

  const checkCanUseInternalCode = (
    internalCode: string,
    currentTicketTypeId: number | null,
    onComplete: (result: boolean) => void,
  ) => {
    const checkCanUseInternalCode = async () => {
      if (internalCode.length === 0) {
        onComplete(true);
        return;
      }

      const result: OperationResult<CanUseTicketTypeInternalCodeQuery> = await client.query(
        CanUseTicketTypeInternalCodeDocument,
        {
          internalCode,
          currentTicketTypeId,
        },
      );

      onComplete(result.data?.ticketType.canUseInternalCode ?? true);
    };

    void checkCanUseInternalCode();
  };

  const getInternalCode = (onComplete: (result: string) => void) => {
    const getInternalCode = async () => {
      const result: OperationResult<GetTicketTypeInternalCodeQuery> = await client.query(
        GetTicketTypeInternalCodeDocument,
        {},
      );

      onComplete(result.data?.ticketType.proposeNewInternalCode ?? '');
    };

    void getInternalCode();
  };

  return {
    checkCanUseInternalCode,
    getInternalCode,
  };
};
