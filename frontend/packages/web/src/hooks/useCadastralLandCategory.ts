import { OperationResult, useClient } from 'urql';

import {
  CanUseCadastralLandCategoryInternalCodeDocument,
  CanUseCadastralLandCategoryInternalCodeQuery,
  GetCadastralLandCategoryInternalCodeDocument,
  GetCadastralLandCategoryInternalCodeQuery,
} from '../gql/RealGimm.Web.CadastralLandCategory.operation';

export const useCadastralLandCategory = () => {
  const client = useClient();

  const checkCanUseInternalCode = (
    internalCode: string,
    currentCadastralLandCategoryId: number | null,
    onComplete: (result: boolean) => void,
  ) => {
    const checkCanUseInternalCode = async () => {
      if (internalCode.length === 0) {
        onComplete(true);
        return;
      }

      const result: OperationResult<CanUseCadastralLandCategoryInternalCodeQuery> = await client.query(
        CanUseCadastralLandCategoryInternalCodeDocument,
        {
          internalCode,
          currentCadastralLandCategoryId,
        },
      );

      onComplete(result.data?.cadastralLandCategory.canUseInternalCode ?? true);
    };

    void checkCanUseInternalCode();
  };

  const getInternalCode = (onComplete: (result: string) => void) => {
    const getInternalCode = async () => {
      const result: OperationResult<GetCadastralLandCategoryInternalCodeQuery> = await client.query(
        GetCadastralLandCategoryInternalCodeDocument,
        {},
      );

      onComplete(result.data?.cadastralLandCategory.proposeNewInternalCode ?? '');
    };

    void getInternalCode();
  };

  return {
    checkCanUseInternalCode,
    getInternalCode,
  };
};
