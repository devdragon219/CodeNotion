import { OperationResult, useClient } from 'urql';

import {
  CanUsePenaltyInternalCodeDocument,
  CanUsePenaltyInternalCodeQuery,
  GetPenaltyInternalCodeDocument,
  GetPenaltyInternalCodeQuery,
} from '../gql/RealGimm.Web.Penalty.operation';

export const usePenalty = () => {
  const client = useClient();

  const checkCanUseInternalCode = (
    internalCode: string,
    currentPenaltyId: number | null,
    penaltyInternalCodes: string[],
    onComplete: (result: boolean) => void,
  ) => {
    const checkCanUseInternalCode = async () => {
      if (internalCode.length === 0) {
        onComplete(true);
        return;
      }

      if (penaltyInternalCodes.includes(internalCode)) {
        onComplete(false);
        return;
      }

      const result: OperationResult<CanUsePenaltyInternalCodeQuery> = await client.query(
        CanUsePenaltyInternalCodeDocument,
        {
          currentPenaltyId,
          internalCode,
        },
      );

      onComplete(result.data?.penalty.canUseInternalCode ?? true);
    };

    void checkCanUseInternalCode();
  };

  const getInternalCode = (
    additionallyOccupiedCodes: string[],
    contractInternalCode: string | undefined = undefined,
    onComplete: (result: string) => void,
  ) => {
    const getInternalCode = async () => {
      const result: OperationResult<GetPenaltyInternalCodeQuery> = await client.query(GetPenaltyInternalCodeDocument, {
        additionallyOccupiedCodes,
        contractInternalCode,
      });

      onComplete(result.data?.penalty.proposeNewInternalCode ?? '');
    };

    void getInternalCode();
  };

  return {
    checkCanUseInternalCode,
    getInternalCode,
  };
};
