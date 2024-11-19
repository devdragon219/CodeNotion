import { OperationResult, useClient } from 'urql';

import {
  CanUseFacilityContractTypeInternalCodeDocument,
  CanUseFacilityContractTypeInternalCodeQuery,
  GetFacilityContractTypeInternalCodeDocument,
  GetFacilityContractTypeInternalCodeQuery,
} from '../gql/RealGimm.Web.FacilityContractType.operation';

export const useFacilityContractType = () => {
  const client = useClient();

  const checkCanUseInternalCode = (
    internalCode: string,
    currentFacilityContractTypeId: number | null,
    onComplete: (result: boolean) => void,
  ) => {
    const checkCanUseInternalCode = async () => {
      if (internalCode.length === 0) {
        onComplete(true);
        return;
      }

      const result: OperationResult<CanUseFacilityContractTypeInternalCodeQuery> = await client.query(
        CanUseFacilityContractTypeInternalCodeDocument,
        {
          internalCode,
          currentFacilityContractTypeId,
        },
      );

      onComplete(result.data?.fcltContractType.canUseInternalCode ?? true);
    };

    void checkCanUseInternalCode();
  };

  const getInternalCode = (onComplete: (result: string) => void) => {
    const getInternalCode = async () => {
      const result: OperationResult<GetFacilityContractTypeInternalCodeQuery> = await client.query(
        GetFacilityContractTypeInternalCodeDocument,
        {},
      );

      onComplete(result.data?.fcltContractType.proposeNewInternalCode ?? '');
    };

    void getInternalCode();
  };

  return {
    checkCanUseInternalCode,
    getInternalCode,
  };
};
