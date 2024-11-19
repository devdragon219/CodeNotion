import { OperationResult, useClient } from 'urql';

import {
  CheckTagConfigTableValueExistsDocument,
  CheckTagConfigTableValueExistsQuery,
} from '../gql/RealGimm.Web.TaxConfiguration.operation';

export const useTaxConfig = () => {
  const client = useClient();

  const checkCanCreateTaxConfigTableValue = (
    calculatorId: string,
    tableCode: string,
    year: number | null,
    groupingReference: string | undefined,
    onComplete: (result: boolean) => void,
  ) => {
    const checkCanCreateTaxConfigTableValue = async () => {
      if (!year || (groupingReference && groupingReference.length === 0)) {
        onComplete(true);
        return;
      }

      const result: OperationResult<CheckTagConfigTableValueExistsQuery> = await client.query(
        CheckTagConfigTableValueExistsDocument,
        {
          calculatorId,
          tableCode,
          year,
          groupingReference,
        },
      );

      onComplete(!(result.data?.taxConfiguration.checkTableValueExists ?? false));
    };

    void checkCanCreateTaxConfigTableValue();
  };

  return {
    checkCanCreateTaxConfigTableValue,
  };
};
