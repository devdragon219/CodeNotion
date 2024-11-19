import { getStringOrNull, parseDateToString } from '@realgimm5/frontend-common/utils';

import {
  PauseContractBillingMutationVariables,
  ResumeContractBillingMutationVariables,
} from '../../gql/RealGimm.Web.Contract.operation';
import { ContractBillingPauseFormInput } from '../../interfaces/FormInputs/ContractActions';

export const parseContractBillingPauseFormInputToPauseContractBillingVariables = (
  contractId: number,
  billingPause: ContractBillingPauseFormInput,
): PauseContractBillingMutationVariables => ({
  contractId,
  since: parseDateToString(billingPause.since)!,
  notes: getStringOrNull(billingPause.notes),
});

export const parseContractBillingPauseFormInputToResumeContractBillingVariables = (
  contractId: number,
  billingPause: ContractBillingPauseFormInput,
): ResumeContractBillingMutationVariables => ({
  contractId,
  isRecoveryArrears: billingPause.isRecoveryArrears,
  pauseEndDate: parseDateToString(billingPause.until)!,
  notes: getStringOrNull(billingPause.notes),
});
