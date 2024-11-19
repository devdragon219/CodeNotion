import { FormMode } from '@realgimm5/frontend-common/enums';
import { ParseKeys } from 'i18next';
import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';

import { AddressesFieldValues } from '../../../../interfaces/FormInputs/Addresses';

export interface AddressesFieldProps {
  buttonTitle: ParseKeys;
  control: Control<AddressesFieldValues>;
  dialogTitles: {
    add: ParseKeys;
    edit: ParseKeys;
  };
  emptyText: ParseKeys;
  errors: FieldErrors<AddressesFieldValues>;
  mode: FormMode;
  readonly?: boolean;
  required?: boolean;
  sectionTitles: {
    primary: ParseKeys;
    secondary: ParseKeys;
  };
  useAddressType?: boolean;
  useMap?: boolean;
  setValue: UseFormSetValue<AddressesFieldValues>;
}
