import { ConfirmedRegistryCommunicationGroupIdInput } from '@realgimm5/frontend-common/gql/types';

import { RegistryCommunicationGroupIdFragment } from '../../gql/RealGimm.Web.RegistryCommunicationGroupId.fragment';

export const parseRegistryCommunicationGroupIdFragmentToConfirmedRegistryCommunicationGroupIdInput = (
  id: RegistryCommunicationGroupIdFragment,
): ConfirmedRegistryCommunicationGroupIdInput => ({
  communicationType: id.communicationType,
  date: id.date!,
  debtBankAccountId: id.debtBankAccountId!,
  endDate: id.endDate,
  isActiveContract: id.isActiveContract,
  managementSubjectId: id.managementSubjectId,
  requestingSubjectLegalRepresentativeId: id.requestingSubjectLegalRepresentativeId!,
});
