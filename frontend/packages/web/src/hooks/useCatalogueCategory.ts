import { OperationResult, useClient } from 'urql';

import {
  CanUseCatalogueCategoryInternalCodeDocument,
  CanUseCatalogueCategoryInternalCodeQuery,
  GetCatalogueCategoryInternalCodeDocument,
  GetCatalogueCategoryInternalCodeQuery,
} from '../gql/RealGimm.Web.CatalogueCategory.operation';

export const useCatalogueCategory = () => {
  const client = useClient();

  const checkCanUseInternalCode = (
    internalCode: string,
    currentCatalogueCategoryId: number | null,
    onComplete: (result: boolean) => void,
  ) => {
    const checkCanUseInternalCode = async () => {
      if (internalCode.length === 0) {
        onComplete(true);
        return;
      }

      const result: OperationResult<CanUseCatalogueCategoryInternalCodeQuery> = await client.query(
        CanUseCatalogueCategoryInternalCodeDocument,
        {
          currentCatalogueCategoryId,
          internalCode,
        },
      );

      onComplete(result.data?.catalogueCategory.canUseInternalCode ?? true);
    };

    void checkCanUseInternalCode();
  };

  const getInternalCode = (onComplete: (result: string) => void) => {
    const getInternalCode = async () => {
      const result: OperationResult<GetCatalogueCategoryInternalCodeQuery> = await client.query(
        GetCatalogueCategoryInternalCodeDocument,
        {},
      );

      onComplete(result.data?.catalogueCategory.proposeNewInternalCode ?? '');
    };

    void getInternalCode();
  };

  return {
    checkCanUseInternalCode,
    getInternalCode,
  };
};
