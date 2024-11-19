import { OperationResult, useClient } from 'urql';

import {
  GetCadastralUnitInternalCodeByEstateUnitInternalCodeDocument,
  GetCadastralUnitInternalCodeByEstateUnitInternalCodeQuery,
  GetCadastralUnitInternalCodeDocument,
  GetCadastralUnitInternalCodeQuery,
} from '../gql/RealGimm.Web.CadastralUnit.operation';

export const useCadastralUnit = () => {
  const client = useClient();

  const getInternalCode = (estateUnitId: number, onComplete: (result: string) => void) => {
    const getInternalCode = async () => {
      const result: OperationResult<GetCadastralUnitInternalCodeQuery> = await client.query(
        GetCadastralUnitInternalCodeDocument,
        {
          estateUnitId,
        },
      );

      onComplete(result.data?.cadastralUnit.proposeNewInternalCode ?? '');
    };

    void getInternalCode();
  };

  const getInternalCodeByEstateUnitInternalCode = (
    estateUnitInternalCode: string,
    onComplete: (result: string) => void,
  ) => {
    const getInternalCodeByEstateUnitInternalCode = async () => {
      const result: OperationResult<GetCadastralUnitInternalCodeByEstateUnitInternalCodeQuery> = await client.query(
        GetCadastralUnitInternalCodeByEstateUnitInternalCodeDocument,
        {
          estateUnitInternalCode,
        },
      );

      onComplete(result.data?.cadastralUnit.proposeNewInternalCodeByParentCode ?? '');
    };

    void getInternalCodeByEstateUnitInternalCode();
  };

  return {
    getInternalCode,
    getInternalCodeByEstateUnitInternalCode,
  };
};
