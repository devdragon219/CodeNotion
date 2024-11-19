import { OperationResult, useClient } from 'urql';

import {
  CanUseInterventionTypeInternalCodeDocument,
  CanUseInterventionTypeInternalCodeQuery,
  GetInterventionTypeInternalCodeDocument,
  GetInterventionTypeInternalCodeQuery,
} from '../gql/RealGimm.Web.InterventionType.operation';

export const useInterventionType = () => {
  const client = useClient();

  const checkCanUseInternalCode = (
    internalCode: string,
    currentInterventionTypeId: number | null,
    onComplete: (result: boolean) => void,
  ) => {
    const checkCanUseInternalCode = async () => {
      if (internalCode.length === 0) {
        onComplete(true);
        return;
      }

      const result: OperationResult<CanUseInterventionTypeInternalCodeQuery> = await client.query(
        CanUseInterventionTypeInternalCodeDocument,
        {
          internalCode,
          currentInterventionTypeId,
        },
      );

      onComplete(result.data?.interventionType.canUseInternalCode ?? true);
    };

    void checkCanUseInternalCode();
  };

  const getInternalCode = (onComplete: (result: string) => void) => {
    const getInternalCode = async () => {
      const result: OperationResult<GetInterventionTypeInternalCodeQuery> = await client.query(
        GetInterventionTypeInternalCodeDocument,
        {},
      );

      onComplete(result.data?.interventionType.proposeNewInternalCode ?? '');
    };

    void getInternalCode();
  };

  return {
    checkCanUseInternalCode,
    getInternalCode,
  };
};
