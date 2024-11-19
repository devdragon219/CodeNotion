import { OperationResult, useClient } from 'urql';

import {
  CanUseContractTypeInternalCodeDocument,
  CanUseContractTypeInternalCodeQuery,
  GetContractTypeInternalCodeDocument,
  GetContractTypeInternalCodeQuery,
} from '../gql/RealGimm.Web.ContractType.operation';

export const useContractType = () => {
  const client = useClient();

  const checkCanUseInternalCode = (
    internalCode: string,
    currentContractTypeId: number | null,
    onComplete: (result: boolean) => void,
  ) => {
    const checkCanUseInternalCode = async () => {
      if (internalCode.length === 0) {
        onComplete(true);
        return;
      }

      const result: OperationResult<CanUseContractTypeInternalCodeQuery> = await client.query(
        CanUseContractTypeInternalCodeDocument,
        {
          currentContractTypeId,
          internalCode,
        },
      );

      onComplete(result.data?.contractType.canUseInternalCode ?? true);
    };

    void checkCanUseInternalCode();
  };

  const getInternalCode = (onComplete: (result: string) => void) => {
    const getInternalCode = async () => {
      const result: OperationResult<GetContractTypeInternalCodeQuery> = await client.query(
        GetContractTypeInternalCodeDocument,
        {},
      );

      onComplete(result.data?.contractType.proposeNewInternalCode ?? '');
    };

    void getInternalCode();
  };

  return {
    checkCanUseInternalCode,
    getInternalCode,
  };
};
