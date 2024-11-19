import { isMapCoordinates } from '@realgimm5/frontend-common/utils';

import { AddressFragment } from '../../../gql/RealGimm.Web.Address.fragment';
import { AsstAddressFragment } from '../../../gql/RealGimm.Web.AsstAddress.fragment';
import { CityFragment } from '../../../gql/RealGimm.Web.City.fragment';
import { CityFieldValue } from '../../../interfaces/FieldValues/City';
import { AddressFormInput } from '../../../interfaces/FormInputs/Addresses';

const isAsstAddressFragment = (address: AddressFragment | AsstAddressFragment): address is AsstAddressFragment =>
  !!(address as AsstAddressFragment).locationLatLon?.coordinates;

export const parseCityToCityFieldValue = (city?: CityFragment | null): CityFieldValue => ({
  cadastralCode: city?.cadastralCode ?? '',
  countyName: city?.countyName ?? '',
  guid: city?.guid ?? '',
  id: city?.id ?? null,
  name: city?.name ?? '',
});

export const parseAddressToAddressFormInput = (address: AddressFragment | AsstAddressFragment): AddressFormInput => ({
  addressId: address.id,
  addressType: address.addressType,
  coordinates:
    isAsstAddressFragment(address) && isMapCoordinates(address.locationLatLon?.coordinates)
      ? address.locationLatLon.coordinates
      : null,
  addressCoordinates: null,
  city: {
    cadastralCode: address.city?.cadastralCode ?? '',
    countyName: address.countyName ?? '',
    guid: address.city?.guid ?? '',
    id: address.city?.id ?? null,
    name: address.cityName ?? '',
  },
  countryISO: address.countryISO ?? '',
  countyName: address.countyName ?? '',
  localPostCode: address.localPostCode ?? '',
  notes: address.notes ?? '',
  numbering: address.numbering ?? '',
  toponymy: address.toponymy ?? '',
});
