import { LazyRoute } from '@realgimm5/frontend-common/components';
import { Navigate, RouteObject } from 'react-router-dom';

export const getAppRoutes = (): RouteObject[] => [
  {
    index: true,
    element: <Navigate to="/app/home" />,
  },
  {
    path: 'home',
    element: <LazyRoute route={() => import('./home')} />,
  },
  {
    path: 'profile',
    element: <LazyRoute route={() => import('./profile')} />,
  },
];
