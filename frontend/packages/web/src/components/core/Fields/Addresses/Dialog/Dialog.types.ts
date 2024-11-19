import { ParseKeys } from 'i18next';

import { AddressFormInput } from '../../../../../interfaces/FormInputs/Addresses';

export interface AddressDialogInput {
  address: AddressFormInput;
  index: number;
}

export interface AddressDialogProps {
  buttonTitle: ParseKeys;
  input?: AddressDialogInput;
  required?: boolean;
  sectionTitle: ParseKeys;
  title: ParseKeys;
  useAddressType?: boolean;
  onClose: () => void;
  onSave: (value: AddressFormInput[] | AddressDialogInput) => void;
}
