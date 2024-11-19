import { enUS as dateEn, it as dateIt } from 'date-fns/locale';
import i18n, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en/en.json';
import it from './locales/it/it.json';

export const getDateLocale = (language: string) => {
  switch (language) {
    case 'en':
      return dateEn;
    default:
      return dateIt;
  }
};

export const locales = {
  en,
  it,
};

export const resources = {
  en: {
    translation: en,
  },
  it: {
    translation: it,
  },
} as const;

export const getI18n = (resources: Resource) => {
  // eslint-disable-next-line import-x/no-named-as-default-member
  i18n.use(initReactI18next).init({
    resources,
    lng: 'it',
    fallbackLng: ['it'],
    interpolation: {
      escapeValue: false,
    },
  });

  return i18n;
};
