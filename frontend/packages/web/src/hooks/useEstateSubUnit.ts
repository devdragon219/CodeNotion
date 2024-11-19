import { OperationResult, useClient } from 'urql';

import {
  GetEstateSubUnitInternalCodeDocument,
  GetEstateSubUnitInternalCodeQuery,
} from '../gql/RealGimm.Web.EstateSubUnit.operation';

export const useEstateSubUnit = () => {
  const client = useClient();

  const getInternalCode = (estateUnitId: number, onComplete: (result: string) => void) => {
    const getInternalCode = async () => {
      const result: OperationResult<GetEstateSubUnitInternalCodeQuery> = await client.query(
        GetEstateSubUnitInternalCodeDocument,
        {
          estateUnitId,
        },
      );

      onComplete(result.data?.estateSubUnit.proposeNewInternalCode ?? '');
    };

    void getInternalCode();
  };

  return {
    getInternalCode,
  };
};
