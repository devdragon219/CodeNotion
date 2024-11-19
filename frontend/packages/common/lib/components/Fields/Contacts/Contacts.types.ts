import { Control, FieldErrors } from 'react-hook-form';

import { FormMode } from '../../../enums/FormMode';
import { ContactsFieldValues } from '../../../interfaces/FormInputs/Contacts';

export interface ContactsFieldProps {
  control: Control<ContactsFieldValues>;
  errors: FieldErrors<ContactsFieldValues>;
  mode: FormMode;
  readonly?: boolean;
}
