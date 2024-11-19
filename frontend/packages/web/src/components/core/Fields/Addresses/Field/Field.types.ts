import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';

import { AddressesFieldValues } from '../../../../../interfaces/FormInputs/Addresses';

export interface AddressFieldProps {
  control: Control<AddressesFieldValues>;
  errors: FieldErrors<AddressesFieldValues>;
  index: number;
  readonly?: boolean;
  required?: boolean;
  useAddressType?: boolean;
  useMap?: boolean;
  setValue: UseFormSetValue<AddressesFieldValues>;
}
