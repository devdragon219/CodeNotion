import { AdminUserInput } from '@realgimm5/frontend-common/gql/types';
import { getStringOrNull, parseDateToString } from '@realgimm5/frontend-common/utils';

import { UserFormInput } from '../../interfaces/FormInputs/User';
import { getContactsOrEmpty } from '../input/getContactsOrEmpty';

export const parseUserFormInputToUserInput = (user: UserFormInput): AdminUserInput => ({
  ceasedDate: parseDateToString(user.ceasedDate, 'complete'),
  contacts: [...getContactsOrEmpty(user.contacts.emails), ...getContactsOrEmpty(user.contacts.phones)],
  enabledSince: parseDateToString(user.enabledSince, 'complete'),
  firstName: user.firstName,
  groups: user.groups.map((group) => group.groupId),
  lastName: user.lastName,
  lockedSince: parseDateToString(user.lockedSince, 'complete'),
  managementOrgUnits: user.orgUnits.map((orgUnit) => orgUnit.orgUnitId),
  managementSubjects: user.managementSubjects.map((subject) => subject.id),
  newPassword: user.password ? user.password.newPassword : null,
  officeAccess: user.officeAccess!,
  passwordConfirmation: user.password ? user.password.confirmPassword : null,
  status: user.status,
  supplierSubjectId: user.supplierSubject?.id,
  suspensionReason: getStringOrNull(user.suspensionReason),
  type: user.userType,
  userName: user.userName,
});
