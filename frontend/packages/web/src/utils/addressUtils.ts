import { AddressFragment } from '../gql/RealGimm.Web.Address.fragment';
import { AsstAddressFragment } from '../gql/RealGimm.Web.AsstAddress.fragment';
import { AddressFormInput } from '../interfaces/FormInputs/Addresses';
import { getCountryName } from './countryUtils';

export const parseAddressToString = (
  address: AddressFormInput | AddressFragment | AsstAddressFragment | null | undefined,
  language: string,
  format: 'long' | 'short' = 'long',
) => {
  if (!address) return '';

  const toponymy =
    address.toponymy || address.numbering
      ? [address.toponymy, address.numbering].filter((it) => !!it).join(', ')
      : null;
  const cityName = 'cityName' in address ? address.cityName : address.city?.name;

  switch (format) {
    case 'long':
      return [toponymy, address.localPostCode, cityName, getCountryName(address.countryISO ?? '', language)]
        .filter((it) => !!it)
        .join(' - ');
    case 'short':
      return [toponymy, cityName].filter((it) => !!it).join(' ');
  }
};

export const getLocationLatLon = (address: AddressFormInput) => {
  const coordinates = address.coordinates ?? address.addressCoordinates;

  if (coordinates) return { coordinates };

  return null;
};
