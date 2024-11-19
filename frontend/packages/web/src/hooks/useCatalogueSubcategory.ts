import { OperationResult, useClient } from 'urql';

import {
  CanUseCatalogueSubCategoryInternalCodeDocument,
  CanUseCatalogueSubCategoryInternalCodeQuery,
  GetCatalogueSubCategoryInternalCodeDocument,
  GetCatalogueSubCategoryInternalCodeQuery,
} from '../gql/RealGimm.Web.CatalogueCategory.operation';

export const useCatalogueSubCategory = () => {
  const client = useClient();

  const checkCanUseInternalCode = (
    internalCode: string,
    catalogueCategoryId: number | null,
    currentCatalogueSubCategoryId: number | null,
    catalogueSubCategoryInternalCodes: string[],
    onComplete: (result: boolean) => void,
  ) => {
    const checkCanUseInternalCode = async () => {
      if (internalCode.length === 0) {
        onComplete(true);
        return;
      }

      if (catalogueSubCategoryInternalCodes.includes(internalCode)) {
        onComplete(false);
        return;
      }

      const result: OperationResult<CanUseCatalogueSubCategoryInternalCodeQuery> = await client.query(
        CanUseCatalogueSubCategoryInternalCodeDocument,
        {
          catalogueCategoryId,
          currentCatalogueSubCategoryId,
          internalCode,
        },
      );

      onComplete(result.data?.catalogueCategory.canUseInternalCodeSubCategory ?? true);
    };

    void checkCanUseInternalCode();
  };

  const getInternalCode = (
    parentInternalCode: string,
    additionallyOccupiedCodes: string[],
    onComplete: (result: string) => void,
  ) => {
    const getInternalCode = async () => {
      const result: OperationResult<GetCatalogueSubCategoryInternalCodeQuery> = await client.query(
        GetCatalogueSubCategoryInternalCodeDocument,
        {
          parentInternalCode,
          additionallyOccupiedCodes,
        },
      );

      onComplete(result.data?.catalogueCategory.proposeNewInternalCodeSubCategory ?? '');
    };

    void getInternalCode();
  };

  return {
    checkCanUseInternalCode,
    getInternalCode,
  };
};
