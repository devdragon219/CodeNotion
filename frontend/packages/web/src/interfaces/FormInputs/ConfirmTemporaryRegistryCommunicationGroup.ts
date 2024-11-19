import { RegistryCommunicationManagementSubjectFragment } from '../../gql/RealGimm.Web.Subject.fragment';
import { SubjectFieldValue } from '../FieldValues/Subject';

export interface ConfirmTemporaryRegistryCommunicationGroupFormInput {
  date: Date | null;
  debtBankAccount: {
    id: number;
    referenceCode: string;
  } | null;
  managementSubject: RegistryCommunicationManagementSubjectFragment;
  requestingSubjectLegalRepresentative: SubjectFieldValue | null;
}

export interface ConfirmTemporaryRegistryCommunicationGroupFieldValues {
  inputs: ConfirmTemporaryRegistryCommunicationGroupFormInput[];
}
