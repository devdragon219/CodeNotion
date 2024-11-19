import { parseDateToString } from '@realgimm5/frontend-common/utils';

import { TakeoverActiveContractLandlordMutationVariables } from '../../gql/RealGimm.Web.ActiveContract.operation';
import { TransferContractManagementSubjectMutationVariables } from '../../gql/RealGimm.Web.Contract.operation';
import { TakeoverPassiveContractTenantMutationVariables } from '../../gql/RealGimm.Web.PassiveContract.operation';
import {
  ContractVariationTakeoverFormInput,
  ContractVariationTransferFormInput,
} from '../../interfaces/FormInputs/ContractActions';

export const parseContractVariationTakeoverFormInputToTakeoverActiveContractLandlordVariables = (
  contractId: number,
  contractTakeover: ContractVariationTakeoverFormInput,
): TakeoverActiveContractLandlordMutationVariables => ({
  contractId,
  legalRepresentativeSubjectId: contractTakeover.takeoverLegalRepresentativeSubject!.id,
  paymentDate: parseDateToString(contractTakeover.paymentDate)!,
  successorIds: contractTakeover.counterparts.map(({ subject }) => subject!.id),
});

export const parseContractVariationTakeoverFormInputToTakeoverPassiveContractTenantVariables = (
  contractId: number,
  contractTakeover: ContractVariationTakeoverFormInput,
): TakeoverPassiveContractTenantMutationVariables => ({
  contractId,
  legalRepresentativeSubjectId: contractTakeover.takeoverLegalRepresentativeSubject!.id,
  paymentDate: parseDateToString(contractTakeover.paymentDate)!,
  successorIds: contractTakeover.counterparts.map(({ subject }) => subject!.id),
});

export const parseContractVariationTransferFormInputToTransferContractManagementSubjectVariables = (
  contractTransfer: ContractVariationTransferFormInput,
): TransferContractManagementSubjectMutationVariables => ({
  contractIds: contractTransfer.contracts.map(({ id }) => id),
  legalRepresentativeSubjectId: contractTransfer.takeoverLegalRepresentativeSubject!.id,
  newManagementSubjectId: contractTransfer.managementSubject!.id,
  paymentDate: parseDateToString(contractTransfer.paymentDate)!,
  takeoverType: contractTransfer.takeoverType!,
  terminationDate: parseDateToString(contractTransfer.takeoverDate)!,
});
