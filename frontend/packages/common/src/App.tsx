import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from '../lib/contexts/theme/provider';
import { getDateLocale } from '../lib/i18n/i18n';
import Storybook from './storybook';

export const App = () => {
  const {
    i18n: { language },
  } = useTranslation();

  const adapterLocale = useMemo(() => getDateLocale(language), [language]);

  return (
    <LocalizationProvider adapterLocale={adapterLocale} dateAdapter={AdapterDateFns}>
      <ThemeProvider>
        <BrowserRouter>
          <Storybook />
        </BrowserRouter>
      </ThemeProvider>
    </LocalizationProvider>
  );
};
