import { LazyRoute } from '@realgimm5/frontend-common/components';
import { LoginProvider } from '@realgimm5/frontend-common/contexts';
import { LoginMethod } from '@realgimm5/frontend-common/enums';
import { Navigate, RouteObject } from 'react-router-dom';

export const getAuthRoutes = (): RouteObject[] => [
  {
    index: true,
    element: <Navigate to="/auth/login" />,
  },
  {
    path: 'login',
    element: (
      <LoginProvider
        loginMethods={(import.meta.env.VITE_LOGIN_METHODS ?? [LoginMethod.Jwt]) as LoginMethod[]}
        userManagerSetting={{
          scope: 'openid profile email',
          authority: import.meta.env.VITE_OIDC_AUTHORITY ?? '',
          client_id: import.meta.env.VITE_OIDC_CLIENT_ID ?? '',
          response_type: 'code',
          redirect_uri: import.meta.env.VITE_OIDC_REDIRECT_URI ?? '',
        }}
      >
        <LazyRoute route={() => import('./login')} />
      </LoginProvider>
    ),
  },
];
