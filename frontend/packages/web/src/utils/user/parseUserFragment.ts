import { getContactsFormInput, getFullName, parseStringToDate } from '@realgimm5/frontend-common/utils';

import { UserDetailFragment, UserFragment } from '../../gql/RealGimm.Web.User.fragment';
import { UserFieldValue } from '../../interfaces/FieldValues/User';
import { UserFormInput } from '../../interfaces/FormInputs/User';
import { getUserOrgUnitsInput } from './getUserOrgUnitsInput';

export const parseUserToUserFieldValue = (
  user: Pick<UserFragment, 'id' | 'firstName' | 'lastName'>,
): UserFieldValue => ({
  fullName: getFullName(user.firstName, user.lastName),
  id: user.id,
});

export const parseUserToUserFormInput = (user: UserDetailFragment): UserFormInput => ({
  ceasedDate: parseStringToDate(user.ceasedDate),
  contacts: getContactsFormInput(user.contacts),
  enabledSince: parseStringToDate(user.enabledSince),
  firstName: user.firstName ?? '',
  groups: user.groups.map((group) => ({
    groupId: group.id,
    name: group.name,
  })),
  lastName: user.lastName ?? '',
  lockedSince: parseStringToDate(user.lockedSince),
  managementSubjects: user.managementSubjects,
  officeAccess: user.officeAccess,
  orgUnits: getUserOrgUnitsInput(user.managementOrgUnits),
  password: null,
  status: user.status,
  supplierSubject: user.supplierSubject ?? null,
  suspensionReason: user.suspensionReason ?? '',
  userId: user.id,
  userName: user.userName,
  userType: user.type,
});
