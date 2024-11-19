import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { SnackbarProvider, ThemeProvider } from '@realgimm5/frontend-common/contexts';
import { useGraphQlClient } from '@realgimm5/frontend-common/hooks';
import { getDateLocale } from '@realgimm5/frontend-common/i18n';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider as UrqlProvider } from 'urql';

import { getRoutes } from './pages/routes';

export const App = () => {
  const {
    i18n: { language },
  } = useTranslation();

  const router = useMemo(() => createBrowserRouter(getRoutes()), []);
  const navigate = useCallback((to: string) => router.navigate(to), [router]);
  const client = useGraphQlClient(navigate);
  const adapterLocale = useMemo(() => getDateLocale(language), [language]);

  return (
    <LocalizationProvider adapterLocale={adapterLocale} dateAdapter={AdapterDateFns}>
      <ThemeProvider>
        <SnackbarProvider>
          <UrqlProvider value={client}>
            <RouterProvider router={router} />
          </UrqlProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
};
