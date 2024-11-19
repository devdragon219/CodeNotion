import { TFunction } from 'i18next';
import { array, object, string } from 'yup';

import { ContactsFormInput } from '../../../interfaces/FormInputs/Contacts';
import { getRequiredTranslation } from '../../translationUtils';

export const getContactsSchema = (t: TFunction, existingContacts?: ContactsFormInput) =>
  object().shape({
    contacts: object().shape({
      emails: array().of(
        object()
          .shape({
            contactInfoType: string().required(
              getRequiredTranslation('common.component.contacts_field.field.email_type', t),
            ),
            contactInfo: string().email(t('common.error.email')),
          })
          .unique(
            'contactInfo',
            existingContacts?.emails.map((it) => it.contactInfo) ?? [],
            t('common.component.contacts_field.error.email'),
          ),
      ),
      phones: array().of(
        object()
          .shape({
            contactInfoType: string().required(
              getRequiredTranslation('common.component.contacts_field.field.phone_type', t),
            ),
            contactInfo: string().phone(t('common.error.phone')),
          })
          .unique(
            'contactInfo',
            existingContacts?.phones.map((it) => it.contactInfo) ?? [],
            t('common.component.contacts_field.error.phone'),
          ),
      ),
    }),
  });
