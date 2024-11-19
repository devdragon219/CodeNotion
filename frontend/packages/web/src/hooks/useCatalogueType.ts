import { OperationResult, useClient } from 'urql';

import {
  CanUseCatalogueTypeInternalCodeDocument,
  CanUseCatalogueTypeInternalCodeQuery,
  GetCatalogueTypeInternalCodeDocument,
  GetCatalogueTypeInternalCodeQuery,
} from '../gql/RealGimm.Web.CatalogueType.operation';

export const useCatalogueType = () => {
  const client = useClient();

  const checkCanUseInternalCode = (
    internalCode: string,
    currentCatalogueTypeId: number | null,
    onComplete: (result: boolean) => void,
  ) => {
    const checkCanUseInternalCode = async () => {
      if (internalCode.length === 0) {
        onComplete(true);
        return;
      }

      const result: OperationResult<CanUseCatalogueTypeInternalCodeQuery> = await client.query(
        CanUseCatalogueTypeInternalCodeDocument,
        {
          currentCatalogueTypeId,
          internalCode,
        },
      );

      onComplete(result.data?.catalogueType.canUseInternalCode ?? true);
    };

    void checkCanUseInternalCode();
  };

  const getInternalCode = (onComplete: (result: string) => void) => {
    const getInternalCode = async () => {
      const result: OperationResult<GetCatalogueTypeInternalCodeQuery> = await client.query(
        GetCatalogueTypeInternalCodeDocument,
        {},
      );

      onComplete(result.data?.catalogueType.proposeNewInternalCode ?? '');
    };

    void getInternalCode();
  };

  return {
    checkCanUseInternalCode,
    getInternalCode,
  };
};
