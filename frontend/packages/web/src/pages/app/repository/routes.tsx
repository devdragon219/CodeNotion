import { LazyRoute } from '@realgimm5/frontend-common/components';
import { Navigate, RouteObject } from 'react-router-dom';

export const getRepositoryRoutes = (): RouteObject[] => [
  {
    index: true,
    element: <Navigate to="/app/repository/documents" />,
  },
  {
    path: 'documents/:type?',
    element: <LazyRoute route={() => import('./documents')} />,
  },
];
