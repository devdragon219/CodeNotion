import { getI18n, locales } from '@realgimm5/frontend-common/i18n';
import { registerLocale } from 'i18n-iso-countries';
import countriesEn from 'i18n-iso-countries/langs/en.json';
import countriesIt from 'i18n-iso-countries/langs/it.json';

import { en } from './locales/en';
import { it } from './locales/it';

export const resources = {
  en: {
    translation: {
      ...en,
      ...locales.en,
    },
  },
  it: {
    translation: {
      ...it,
      ...locales.it,
    },
  },
} as const;

[countriesEn, countriesIt].forEach((locale) => {
  registerLocale(locale);
});

export const i18n = getI18n(resources);
