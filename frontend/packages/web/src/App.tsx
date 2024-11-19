import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { NotificationProvider, SnackbarProvider, ThemeProvider } from '@realgimm5/frontend-common/contexts';
import { useGraphQlClient } from '@realgimm5/frontend-common/hooks';
import { getDateLocale } from '@realgimm5/frontend-common/i18n';
import { PropsWithChildren, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider as UrqlProvider } from 'urql';

import { useGetLastNotificationsQuery } from './gql/RealGimm.Web.Notification.operation';
import { getRoutes } from './pages/routes';
import { parseNotificationFragmentToNotificationItem } from './utils/notification/parseNotificationFragment';

type NotificationProviderWrapperProps = PropsWithChildren<{
  navigate: (to: string) => void;
}>;
const NotificationProviderWrapper = ({ children, navigate }: NotificationProviderWrapperProps) => {
  const { t } = useTranslation();
  const [queryState, reexecuteQuery] = useGetLastNotificationsQuery();
  const notifications = useMemo(
    () =>
      queryState.data?.notification.lastNotifications.map((notification) =>
        parseNotificationFragmentToNotificationItem(notification, t),
      ) ?? [],
    [queryState.data, t],
  );

  return (
    <NotificationProvider
      fetching={queryState.fetching}
      notifications={notifications}
      navigate={navigate}
      updateNotifications={reexecuteQuery}
    >
      {children}
    </NotificationProvider>
  );
};

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
            <NotificationProviderWrapper navigate={navigate}>
              <RouterProvider router={router} />
            </NotificationProviderWrapper>
          </UrqlProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
};
