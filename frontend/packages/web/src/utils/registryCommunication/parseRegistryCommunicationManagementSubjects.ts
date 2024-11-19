import { RegistryCommunicationManagementSubjectFragment } from '../../gql/RealGimm.Web.Subject.fragment';
import { ConfirmTemporaryRegistryCommunicationGroupFieldValues } from '../../interfaces/FormInputs/ConfirmTemporaryRegistryCommunicationGroup';
import { getEmptyConfirmTemporaryRegistryCommunicationGroupFormInput } from './initialValues';

export const parseRegistryCommunicationManagementSubjectsToConfirmTemporaryRegistryCommunicationGroupFieldValues = (
  managementSubjects: RegistryCommunicationManagementSubjectFragment[],
): ConfirmTemporaryRegistryCommunicationGroupFieldValues => ({
  inputs: managementSubjects.map(getEmptyConfirmTemporaryRegistryCommunicationGroupFormInput),
});
