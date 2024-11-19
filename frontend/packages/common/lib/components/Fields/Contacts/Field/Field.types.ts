import { Control, FieldErrors } from 'react-hook-form';

import { ContactsFieldValues } from '../../../../interfaces/FormInputs/Contacts';

export interface ContactFieldProps {
  control: Control<ContactsFieldValues>;
  errors: FieldErrors<ContactsFieldValues>;
  index: number;
  type: 'email' | 'phone';
}
