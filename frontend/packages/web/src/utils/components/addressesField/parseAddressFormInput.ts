import { AddressInput, AddressType, AsstAddressInput, AsstAddressType } from '@realgimm5/frontend-common/gql/types';
import { getStringOrNull } from '@realgimm5/frontend-common/utils';

import { AddressFormInput } from '../../../interfaces/FormInputs/Addresses';
import { getLocationLatLon } from '../../addressUtils';

export const parseAddressFormInputToAddressInput = (address: AddressFormInput): AddressInput => ({
  addressType: address.addressType! as AddressType,
  cityId: address.city.id,
  cityName: getStringOrNull(address.city.name),
  countryISO: getStringOrNull(address.countryISO),
  countyName: getStringOrNull(address.countyName),
  id: address.addressId,
  localPostCode: getStringOrNull(address.localPostCode),
  notes: getStringOrNull(address.notes),
  numbering: getStringOrNull(address.numbering),
  toponymy: getStringOrNull(address.toponymy),
});

export const parseAddressFormInputToAsstAddressInput = (address: AddressFormInput): AsstAddressInput => ({
  ...parseAddressFormInputToAddressInput(address),
  addressType: address.addressType! as AsstAddressType,
  locationLatLon: getLocationLatLon(address),
});
