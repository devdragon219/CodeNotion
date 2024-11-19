import { ContactsField } from '@realgimm5/frontend-common/components';
import { ContactsFieldValues } from '@realgimm5/frontend-common/interfaces';
import { Control } from 'react-hook-form';

import { UserContactsProps } from './Contacts.types';

export const UserContacts = ({ control, readonly, errors, mode }: UserContactsProps) => (
  <ContactsField
    control={control as unknown as Control<ContactsFieldValues>}
    readonly={readonly}
    errors={errors}
    mode={mode}
  />
);
