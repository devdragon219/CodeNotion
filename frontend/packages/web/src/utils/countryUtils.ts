import { getAlpha3Code, getName, getNames } from 'i18n-iso-countries';

export const getSortedCountryCodes = (language: string) =>
  Object.values(getNames(language))
    .sort((a, b) => (a < b ? -1 : 1))
    .map((name) => getAlpha3Code(name, language) ?? name);

export const getCountryName = (countryCode: string, language: string) => getName(countryCode, language) ?? countryCode;
