import { Error } from '@realgimm5/frontend-common/components';
import { AppLayout, AuthLayout } from '@realgimm5/frontend-common/layouts';
import { Navigate, RouteObject } from 'react-router-dom';

import { UNSUPPORTED_RAW_FEATURES } from '../configs/features';
import { menuConfig } from '../configs/menu';
import { getAppRoutes } from './app/routes';
import { getAuthRoutes } from './auth/routes';

export const getRoutes = (): RouteObject[] => [
  {
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Navigate to="/app" />,
      },
      {
        element: (
          <AppLayout
            menu={menuConfig}
            redirect={{
              login: '/auth',
              notifications: '/app/notifications',
              profile: '/app/profile',
            }}
            unsupportedFeatures={UNSUPPORTED_RAW_FEATURES}
          />
        ),
        children: [
          {
            path: 'app',
            children: getAppRoutes(),
          },
        ],
      },
      {
        element: <AuthLayout redirect="/app" />,
        children: [
          {
            path: 'auth',
            children: getAuthRoutes(),
          },
        ],
      },
    ],
  },
];
