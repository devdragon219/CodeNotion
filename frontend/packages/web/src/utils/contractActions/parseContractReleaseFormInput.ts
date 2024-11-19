import { parseDateToString } from '@realgimm5/frontend-common/utils';

import { ReleaseContractMutationVariables } from '../../gql/RealGimm.Web.Contract.operation';
import { ContractReleaseFormInput } from '../../interfaces/FormInputs/ContractActions';

export const parseContractReleaseFormInputToReleaseContractVariables = (
  contractId: number,
  contractRelease: ContractReleaseFormInput,
): ReleaseContractMutationVariables => ({
  contractId,
  releaseReason: contractRelease.reason,
  releaseDate: parseDateToString(contractRelease.date),
  isOccupiedWithoutRight: contractRelease.isOccupiedWithoutRight,
});
