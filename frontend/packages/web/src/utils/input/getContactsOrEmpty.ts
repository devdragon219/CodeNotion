import { ContactInput, ContactType } from '@realgimm5/frontend-common/gql/types';
import { ContactFormInput } from '@realgimm5/frontend-common/interfaces';

export const getContactsOrEmpty = (value: ContactFormInput[]): ContactInput[] =>
  value
    .filter(({ contactInfo, contactInfoType }) => contactInfo && contactInfo.trim().length !== 0 && contactInfoType)
    .map((contact) => ({
      contactInfo: contact.contactInfo,
      contactInfoType: contact.contactInfoType!,
      contactType: ContactType.Main,
      id: contact.contactId,
    }));
