import { ContactInfoType } from '../../gql/types';
import { ContactFormInput, ContactsFormInput } from '../../interfaces/FormInputs/Contacts';

export const getEmptyContactFormInput = (contactInfoType: ContactInfoType | null = null): ContactFormInput => ({
  contactId: null,
  contactInfo: '',
  contactInfoType,
});

export const getEmptyContactsFormInput = (): ContactsFormInput => ({
  emails: [],
  phones: [],
});
