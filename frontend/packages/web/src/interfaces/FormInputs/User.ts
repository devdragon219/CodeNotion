import { OfficeAccess, OrgUnitType, UserStatus, UserType } from '@realgimm5/frontend-common/gql/types';
import { ContactsFormInput } from '@realgimm5/frontend-common/interfaces';

import { SubjectFieldValue } from '../FieldValues/Subject';

export interface UserPasswordFormInput {
  confirmPassword: string;
  newPassword: string;
}

export interface UserGroupFormInput {
  groupId: number;
  name: string;
}

export interface UserSubjectFormInput {
  name: string;
  subjectId: number;
}

export interface UserOrgUnitFormInput {
  groupSocietyName: string;
  internalCode: string;
  managementSubjectName: string;
  name: string;
  orgUnitId: number;
  orgUnitType: OrgUnitType;
  parentOrgUnitName: string;
}

export interface UserFormInput {
  ceasedDate: Date | null;
  contacts: ContactsFormInput;
  enabledSince: Date | null;
  firstName: string;
  groups: UserGroupFormInput[];
  lastName: string;
  lockedSince: Date | null;
  managementSubjects: SubjectFieldValue[];
  officeAccess: OfficeAccess | null;
  orgUnits: UserOrgUnitFormInput[];
  password: UserPasswordFormInput | null;
  status: UserStatus;
  supplierSubject: SubjectFieldValue | null;
  suspensionReason: string;
  userId: number | null;
  userName: string;
  userType: UserType;
}
