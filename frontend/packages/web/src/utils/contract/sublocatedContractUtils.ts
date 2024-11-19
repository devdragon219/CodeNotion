import { parseStringToDate } from '@realgimm5/frontend-common/utils';

import { SublocatedContractDetailFragment } from '../../gql/RealGimm.Web.Contract.fragment';
import { ContractFragment } from '../../gql/RealGimm.Web.ContractListOutput.fragment';
import { SublocatedContractFormInput } from '../../interfaces/FormInputs/Contract';

export const parseSublocatedContractToSublocatedContractFormInput = (
  sublocatedContract: SublocatedContractDetailFragment,
): SublocatedContractFormInput => ({
  agreementDate: parseStringToDate(sublocatedContract.agreementDate),
  anytimeTerminationWarningMonths: sublocatedContract.anytimeTerminationWarningMonths ?? null,
  contractId: sublocatedContract.id,
  contractTypeDescription: sublocatedContract.type.description,
  effectStartDate: parseStringToDate(sublocatedContract.effectStartDate),
  externalCode: sublocatedContract.externalCode ?? '',
  firstTermDurationMonths: sublocatedContract.firstTermDurationMonths ?? null,
  firstTermExpirationDate: parseStringToDate(sublocatedContract.firstTermExpirationDate),
  internalCode: sublocatedContract.internalCode,
  lastRenewalStartDate: parseStringToDate(sublocatedContract.lastRenewalStartDate),
  managementSubjectName: sublocatedContract.managementSubject.name,
  nonRenewalWarningMonths: sublocatedContract.nonRenewalWarningMonths ?? null,
  reason: sublocatedContract.reason,
  secondTermDurationMonths: sublocatedContract.secondTermDurationMonths ?? null,
  secondTermExpirationDate: parseStringToDate(sublocatedContract.secondTermExpirationDate),
  status: sublocatedContract.status,
  terminationDate: parseStringToDate(sublocatedContract.terminationDate),
  terminator: sublocatedContract.terminator ?? null,
});

export const parseContractToSublocatedContractFormInput = (
  contract: ContractFragment,
): SublocatedContractFormInput => ({
  agreementDate: parseStringToDate(contract.agreementDate),
  anytimeTerminationWarningMonths: contract.anytimeTerminationWarningMonths ?? null,
  contractId: contract.id,
  contractTypeDescription: contract.typeDescription ?? '',
  effectStartDate: parseStringToDate(contract.effectStartDate),
  externalCode: contract.externalCode ?? '',
  firstTermDurationMonths: contract.firstTermDurationMonths ?? null,
  firstTermExpirationDate: parseStringToDate(contract.firstTermExpirationDate),
  internalCode: contract.internalCode,
  lastRenewalStartDate: parseStringToDate(contract.lastRenewalStartDate),
  managementSubjectName: contract.managementSubjectName ?? '',
  nonRenewalWarningMonths: contract.nonRenewalWarningMonths ?? null,
  reason: contract.reason,
  secondTermDurationMonths: contract.secondTermDurationMonths ?? null,
  secondTermExpirationDate: parseStringToDate(contract.secondTermExpirationDate),
  status: contract.status,
  terminationDate: parseStringToDate(contract.terminationDate),
  terminator: contract.terminator ?? null,
});
