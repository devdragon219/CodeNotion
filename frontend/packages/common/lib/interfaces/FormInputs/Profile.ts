import { UserStatus } from '../../gql/types';
import { ContactsFormInput } from './Contacts';

export interface ProfileChangePasswordFormInput {
  confirmPassword: string;
  currentPassword: string;
  newPassword: string;
}

export interface ProfileFormInput {
  contacts: ContactsFormInput;
  enabledSince: Date | null;
  firstName: string;
  lastName: string;
  managementSubjects: string[];
  status: UserStatus;
  userName: string;
}
