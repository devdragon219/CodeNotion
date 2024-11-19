import { ContactInfoType, OfficeAccess, UserStatus, UserType } from '@realgimm5/frontend-common/gql/types';
import { getEmptyContactFormInput } from '@realgimm5/frontend-common/utils';

import { UserFormInput } from '../../interfaces/FormInputs/User';

export const getEmptyUserFormInput = (userType: UserType): UserFormInput => ({
  contacts: {
    emails: [
      getEmptyContactFormInput(ContactInfoType.EMail),
      getEmptyContactFormInput(ContactInfoType.RegisteredEmail),
    ],
    phones: [
      getEmptyContactFormInput(ContactInfoType.MobilePhone),
      getEmptyContactFormInput(ContactInfoType.LandlinePhone),
    ],
  },
  ceasedDate: null,
  enabledSince: new Date(),
  firstName: '',
  groups: [],
  lastName: '',
  lockedSince: null,
  managementSubjects: [],
  officeAccess: userType === UserType.ExternalSupplier ? OfficeAccess.FrontOffice : null,
  orgUnits: [],
  password: {
    newPassword: '',
    confirmPassword: '',
  },
  status: UserStatus.Active,
  supplierSubject: null,
  suspensionReason: '',
  userId: null,
  userName: '',
  userType,
});
