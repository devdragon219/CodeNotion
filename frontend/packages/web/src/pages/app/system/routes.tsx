import { LazyRoute } from '@realgimm5/frontend-common/components';
import { OperationProvider, TableProvider } from '@realgimm5/frontend-common/contexts';
import { Navigate, Outlet, RouteObject } from 'react-router-dom';

export const getSystemRoutes = (): RouteObject[] => [
  {
    index: true,
    element: <Navigate to="/app/system/groups" />,
  },
  {
    path: 'groups',
    element: (
      <TableProvider
        key="groups"
        initialState={{
          sorting: [
            {
              desc: false,
              id: 'name',
            },
          ],
        }}
      >
        <Outlet />
      </TableProvider>
    ),
    children: [
      {
        index: true,
        element: <LazyRoute route={() => import('./groups')} />,
      },
      {
        path: ':id',
        element: (
          <OperationProvider>
            <LazyRoute route={() => import('./group')} />
          </OperationProvider>
        ),
      },
    ],
  },
  {
    path: 'users',
    element: (
      <TableProvider
        key="users"
        initialState={{
          sorting: [
            {
              desc: false,
              id: 'fullName',
            },
          ],
        }}
      >
        <Outlet />
      </TableProvider>
    ),
    children: [
      {
        index: true,
        element: <LazyRoute route={() => import('./users')} />,
      },
      {
        path: ':id',
        element: (
          <OperationProvider>
            <LazyRoute route={() => import('./user')} />
          </OperationProvider>
        ),
      },
    ],
  },
  {
    path: 'audit-events',
    element: (
      <TableProvider
        key="audit-events"
        initialState={{
          sorting: [
            {
              desc: true,
              id: 'auditDate',
            },
          ],
        }}
      >
        <LazyRoute route={() => import('./audit-events')} />
      </TableProvider>
    ),
  },
  {
    path: 'configs',
    element: (
      <TableProvider
        key="configs"
        initialState={{
          sorting: [
            {
              desc: false,
              id: 'function',
            },
          ],
        }}
        usePagination={false}
      >
        <LazyRoute route={() => import('./configs')} />
      </TableProvider>
    ),
  },
];
