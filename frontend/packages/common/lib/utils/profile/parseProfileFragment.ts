import { UserProfileFragment } from '../../gql/RealGimm.WebCommon.User.fragment';
import { ProfileFormInput } from '../../interfaces/FormInputs/Profile';
import { getContactsFormInput } from '../contactsField/getContactsFormInput';
import { parseStringToDate } from '../stringUtils';

export const parseProfileToProfileFormInput = (profile: UserProfileFragment): ProfileFormInput => ({
  contacts: getContactsFormInput(profile.contacts),
  enabledSince: parseStringToDate(profile.enabledSince),
  firstName: profile.firstName ?? '',
  lastName: profile.lastName ?? '',
  managementSubjects: profile.managementSubjects.map(({ name }) => name),
  status: profile.status,
  userName: profile.userName,
});
