import { LazyRoute } from '@realgimm5/frontend-common/components';
import { OperationProvider, TableProvider } from '@realgimm5/frontend-common/contexts';
import { Navigate, Outlet, RouteObject } from 'react-router-dom';

export const getRegistryRoutes = (): RouteObject[] => [
  {
    index: true,
    element: <Navigate to="/app/registry/subjects" />,
  },
  {
    path: 'subjects',
    element: (
      <TableProvider
        key="subjects"
        initialState={{
          sorting: [
            {
              desc: false,
              id: 'internalCode',
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
        element: <LazyRoute route={() => import('./subjects')} />,
      },
      {
        path: ':id',
        element: (
          <OperationProvider>
            <LazyRoute route={() => import('./subject')} />
          </OperationProvider>
        ),
      },
    ],
  },
  {
    path: 'organizational-units',
    children: [
      {
        index: true,
        element: <Navigate to="/app/registry/organizational-units/management" />,
      },
      {
        path: ':type',
        element: <LazyRoute route={() => import('./organizational-units')} />,
        children: [
          {
            path: ':id',
            element: (
              <OperationProvider>
                <LazyRoute route={() => import('./organizational-unit')} />
              </OperationProvider>
            ),
          },
        ],
      },
    ],
  },
];
