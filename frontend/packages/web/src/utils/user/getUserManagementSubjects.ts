import { UserDetailFragment } from '../../gql/RealGimm.Web.User.fragment';
import { UserSubjectFormInput } from '../../interfaces/FormInputs/User';

export const getUserManagementSubjects = (
  managementSubjects?: UserDetailFragment['managementSubjects'],
): UserSubjectFormInput[] =>
  managementSubjects?.map((subject) => ({
    subjectId: subject.id,
    name: subject.name,
  })) ?? [];
