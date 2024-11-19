import { ContactFormInput, ContactsFormInput } from '../../../../interfaces/FormInputs/Contacts';

export interface ContactDialogInput {
  contact: ContactFormInput;
  index: number;
}

export interface ContactDialogProps {
  existingContacts: ContactsFormInput;
  input?: ContactDialogInput;
  type: 'email' | 'phone';
  onClose: () => void;
  onSave: (value: ContactFormInput[] | ContactDialogInput) => void;
}
