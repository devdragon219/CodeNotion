import { OperationResult, useClient } from 'urql';

import {
  CanUseSlaInternalCodeDocument,
  CanUseSlaInternalCodeQuery,
  GetSlaInternalCodeDocument,
  GetSlaInternalCodeQuery,
} from '../gql/RealGimm.Web.SLA.operation';

export const useSla = () => {
  const client = useClient();

  const checkCanUseInternalCode = (
    internalCode: string,
    currentSlaId: number | null,
    slaInternalCodes: string[],
    onComplete: (result: boolean) => void,
  ) => {
    const checkCanUseInternalCode = async () => {
      if (internalCode.length === 0) {
        onComplete(true);
        return;
      }

      if (slaInternalCodes.includes(internalCode)) {
        onComplete(false);
        return;
      }

      const result: OperationResult<CanUseSlaInternalCodeQuery> = await client.query(CanUseSlaInternalCodeDocument, {
        currentSlaId,
        internalCode,
      });

      onComplete(result.data?.sla.canUseInternalCode ?? true);
    };

    void checkCanUseInternalCode();
  };

  const getInternalCode = (
    additionallyOccupiedCodes: string[],
    contractInternalCode: string | undefined = undefined,
    onComplete: (result: string) => void,
  ) => {
    const getInternalCode = async () => {
      const result: OperationResult<GetSlaInternalCodeQuery> = await client.query(GetSlaInternalCodeDocument, {
        additionallyOccupiedCodes,
        contractInternalCode,
      });

      onComplete(result.data?.sla.proposeNewInternalCode ?? '');
    };

    void getInternalCode();
  };

  return {
    checkCanUseInternalCode,
    getInternalCode,
  };
};
