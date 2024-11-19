import { ContactInfoType } from '../../gql/types';

export interface ContactFormInput {
  contactId: number | null;
  contactInfo: string;
  contactInfoType: ContactInfoType | null;
}

export interface ContactsFormInput {
  emails: ContactFormInput[];
  phones: ContactFormInput[];
}

export interface ContactsFieldValues {
  contacts: ContactsFormInput;
}
