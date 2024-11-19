import { AddressFormInput } from '../../interfaces/FormInputs/Addresses';

export const getAddressesOrEmpty = (value: AddressFormInput[]) =>
  value.filter(
    ({ addressType, countryISO, city, countyName, toponymy, numbering, localPostCode, notes }) =>
      addressType &&
      [countryISO, city.name, countyName, toponymy, numbering, localPostCode, notes].some(
        (it) => it && it.trim().length !== 0,
      ),
  );
