import { getI18n, locales } from '@realgimm5/frontend-common/i18n';

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

export const i18n = getI18n(resources);
