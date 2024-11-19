import { OperationResult, useClient } from 'urql';

import {
  CanUseQualificationLevelInternalCodeDocument,
  CanUseQualificationLevelInternalCodeQuery,
  GetQualificationLevelInternalCodeDocument,
  GetQualificationLevelInternalCodeQuery,
} from '../gql/RealGimm.Web.QualificationLevel.operation';

export const useQualificationLevel = () => {
  const client = useClient();

  const checkCanUseInternalCode = (
    internalCode: string,
    currentQualificationLevelId: number | null,
    onComplete: (result: boolean) => void,
  ) => {
    const checkCanUseInternalCode = async () => {
      if (internalCode.length === 0) {
        onComplete(true);
        return;
      }

      const result: OperationResult<CanUseQualificationLevelInternalCodeQuery> = await client.query(
        CanUseQualificationLevelInternalCodeDocument,
        {
          internalCode,
          currentQualificationLevelId,
        },
      );

      onComplete(result.data?.qualificationLevel.canUseInternalCode ?? true);
    };

    void checkCanUseInternalCode();
  };

  const getInternalCode = (onComplete: (result: string) => void) => {
    const getInternalCode = async () => {
      const result: OperationResult<GetQualificationLevelInternalCodeQuery> = await client.query(
        GetQualificationLevelInternalCodeDocument,
        {},
      );

      onComplete(result.data?.qualificationLevel.proposeNewInternalCode ?? '');
    };

    void getInternalCode();
  };

  return {
    checkCanUseInternalCode,
    getInternalCode,
  };
};
