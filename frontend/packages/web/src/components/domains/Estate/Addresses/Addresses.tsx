import { Control, UseFormSetValue } from 'react-hook-form';

import { AddressesFieldValues } from '../../../../interfaces/FormInputs/Addresses';
import { AddressesField } from '../../../core/Fields/Addresses/Addresses';
import { EstateAddressesProps } from './Addresses.types';

export const EstateAddresses = ({ control, errors, mode, readonly, setValue }: EstateAddressesProps) => (
  <AddressesField
    buttonTitle="estate.action.add_address"
    control={control as unknown as Control<AddressesFieldValues>}
    dialogTitles={{
      add: 'estate.dialog.address.add',
      edit: 'estate.dialog.address.edit',
    }}
    emptyText="estate.text.no_secondary_addresses"
    errors={errors}
    mode={mode}
    readonly={readonly}
    required
    sectionTitles={{
      primary: 'estate.section_title.primary_address',
      secondary: 'estate.section_title.secondary_addresses',
    }}
    useMap
    setValue={setValue as unknown as UseFormSetValue<AddressesFieldValues>}
  />
);
