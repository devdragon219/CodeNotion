import { LazyRoute } from '@realgimm5/frontend-common/components';
import { OperationProvider, TableProvider } from '@realgimm5/frontend-common/contexts';
import { Navigate, Outlet, RouteObject } from 'react-router-dom';

export const getEnergyManagementRoutes = (): RouteObject[] => [
  {
    index: true,
    element: <Navigate to="/app/energy-management/utility-services" />,
  },
  {
    path: 'utility-services',
    element: (
      <TableProvider
        key="utility-services"
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
        element: <LazyRoute route={() => import('./utility-services')} />,
      },
      {
        path: ':id',
        element: (
          <OperationProvider>
            <LazyRoute route={() => import('./utility-service')} />
          </OperationProvider>
        ),
      },
    ],
  },
  {
    path: 'cost-charges',
    element: (
      <TableProvider
        key="cost-charges"
        initialState={{
          sorting: [
            {
              desc: true,
              id: 'referenceDate',
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
        element: <LazyRoute route={() => import('./cost-charges')} />,
      },
      {
        path: ':id',
        element: (
          <OperationProvider>
            <LazyRoute route={() => import('./cost-charge')} />
          </OperationProvider>
        ),
      },
    ],
  },
  {
    path: 'cost-charge-analysis',
    element: <LazyRoute route={() => import('./cost-charge-analysis')} />,
  },
];
