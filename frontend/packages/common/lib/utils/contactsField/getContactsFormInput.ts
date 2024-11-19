import { ContactInfoType, ContactInput } from '../../gql/types';
import { ContactFormInput, ContactsFormInput } from '../../interfaces/FormInputs/Contacts';

export const isContactPhone = (contact: ContactInput) =>
  [ContactInfoType.LandlinePhone, ContactInfoType.MobilePhone].includes(contact.contactInfoType);
export const isContactEmail = (contact: ContactInput) =>
  [ContactInfoType.RegisteredEmail, ContactInfoType.EMail].includes(contact.contactInfoType);

export const getContactsFormInput = (contacts?: ContactInput[] | null): ContactsFormInput => {
  const emptyContacts = { emails: [] as ContactFormInput[], phones: [] as ContactFormInput[] };

  if (!contacts?.length) return emptyContacts;

  return contacts.reduce(
    (acc, curr) => ({
      emails: isContactEmail(curr)
        ? [
            ...acc.emails,
            {
              contactInfo: curr.contactInfo ?? '',
              contactInfoType: curr.contactInfoType,
              contactId: curr.id ?? null,
            },
          ]
        : [...acc.emails],
      phones: isContactPhone(curr)
        ? [
            ...acc.phones,
            {
              contactInfo: curr.contactInfo ?? '',
              contactInfoType: curr.contactInfoType,
              contactId: curr.id ?? null,
            },
          ]
        : [...acc.phones],
    }),
    emptyContacts,
  );
};
