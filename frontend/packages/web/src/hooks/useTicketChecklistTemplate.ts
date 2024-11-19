import { OperationResult, useClient } from 'urql';

import {
  CanUseTicketChecklistTemplateInternalCodeDocument,
  CanUseTicketChecklistTemplateInternalCodeQuery,
  GetTicketChecklistTemplateInternalCodeDocument,
  GetTicketChecklistTemplateInternalCodeQuery,
} from '../gql/RealGimm.Web.TicketChecklistTemplate.operation';

export const useTicketChecklistTemplate = () => {
  const client = useClient();

  const checkCanUseInternalCode = (
    internalCode: string,
    currentTicketChecklistTemplateId: number | null,
    onComplete: (result: boolean) => void,
  ) => {
    const checkCanUseInternalCode = async () => {
      if (internalCode.length === 0) {
        onComplete(true);
        return;
      }

      const result: OperationResult<CanUseTicketChecklistTemplateInternalCodeQuery> = await client.query(
        CanUseTicketChecklistTemplateInternalCodeDocument,
        {
          currentTicketChecklistTemplateId,
          internalCode,
        },
      );

      onComplete(result.data?.ticketChecklistTemplate.canUseInternalCode ?? true);
    };

    void checkCanUseInternalCode();
  };

  const getInternalCode = (onComplete: (result: string) => void) => {
    const getInternalCode = async () => {
      const result: OperationResult<GetTicketChecklistTemplateInternalCodeQuery> = await client.query(
        GetTicketChecklistTemplateInternalCodeDocument,
        {},
      );

      onComplete(result.data?.ticketChecklistTemplate.proposeNewInternalCode ?? '');
    };

    void getInternalCode();
  };

  return {
    checkCanUseInternalCode,
    getInternalCode,
  };
};
