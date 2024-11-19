import { RegistryCommunicationManagementSubjectFragment } from '../../gql/RealGimm.Web.Subject.fragment';
import { ConfirmTemporaryRegistryCommunicationGroupFormInput } from '../../interfaces/FormInputs/ConfirmTemporaryRegistryCommunicationGroup';

export const getEmptyConfirmTemporaryRegistryCommunicationGroupFormInput = (
  managementSubject: RegistryCommunicationManagementSubjectFragment,
): ConfirmTemporaryRegistryCommunicationGroupFormInput => ({
  date: null,
  debtBankAccount: null,
  managementSubject,
  requestingSubjectLegalRepresentative: null,
});
