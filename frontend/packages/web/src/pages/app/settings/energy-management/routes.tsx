import { LazyRoute } from '@realgimm5/frontend-common/components';
import { OperationProvider, TableProvider } from '@realgimm5/frontend-common/contexts';
import { Navigate, Outlet, RouteObject } from 'react-router-dom';

export const getEnergyManagementRoutes = (): RouteObject[] => [
  {
    index: true,
    element: <Navigate to="/app/settings/energy-management/utility-types" />,
  },
  {
    path: 'utility-types',
    element: (
      <TableProvider
        key="utility-types"
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
        element: <LazyRoute route={() => import('./utility-types')} />,
      },
      {
        path: ':id',
        element: (
          <OperationProvider>
            <LazyRoute route={() => import('./utility-type')} />
          </OperationProvider>
        ),
      },
    ],
  },
];
