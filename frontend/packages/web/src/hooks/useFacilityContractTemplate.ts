import { OperationResult, useClient } from 'urql';

import {
  CanUseFacilityContractTemplateInternalCodeDocument,
  CanUseFacilityContractTemplateInternalCodeQuery,
  GetFacilityContractTemplateInternalCodeDocument,
  GetFacilityContractTemplateInternalCodeQuery,
} from '../gql/RealGimm.Web.FacilityContractTemplate.operation';

export const useFacilityContractTemplate = () => {
  const client = useClient();

  const checkCanUseInternalCode = (
    internalCode: string,
    currentFacilityContractTemplateId: number | null,
    onComplete: (result: boolean) => void,
  ) => {
    const checkCanUseInternalCode = async () => {
      if (internalCode.length === 0) {
        onComplete(true);
        return;
      }

      const result: OperationResult<CanUseFacilityContractTemplateInternalCodeQuery> = await client.query(
        CanUseFacilityContractTemplateInternalCodeDocument,
        {
          currentFacilityContractTemplateId,
          internalCode,
        },
      );

      onComplete(result.data?.contractTemplate.canUseInternalCode ?? true);
    };

    void checkCanUseInternalCode();
  };

  const getInternalCode = (onComplete: (result: string) => void) => {
    const getInternalCode = async () => {
      const result: OperationResult<GetFacilityContractTemplateInternalCodeQuery> = await client.query(
        GetFacilityContractTemplateInternalCodeDocument,
        {},
      );

      onComplete(result.data?.contractTemplate.proposeNewInternalCode ?? '');
    };

    void getInternalCode();
  };

  return {
    checkCanUseInternalCode,
    getInternalCode,
  };
};
