import { LazyRoute } from '@realgimm5/frontend-common/components';
import { OperationProvider, TableProvider } from '@realgimm5/frontend-common/contexts';
import { Navigate, Outlet, RouteObject } from 'react-router-dom';

export const getTaxManagementRoutes = (): RouteObject[] => [
  {
    index: true,
    element: <Navigate to="/app/settings/tax-management/revaluation-coefficients" />,
  },
  {
    path: 'revaluation-coefficients',
    element: (
      <TableProvider key="revaluation-coefficients">
        <Outlet />
      </TableProvider>
    ),
    children: [
      {
        index: true,
        element: <LazyRoute route={() => import('./revaluation-coefficients')} />,
      },
      {
        path: 'history',
        element: (
          <TableProvider
            key="revaluation-coefficients-history"
            initialState={{
              sorting: [
                {
                  desc: true,
                  id: 'year',
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
            element: <LazyRoute route={() => import('./revaluation-coefficients-history')} />,
          },
          {
            path: ':calculatorId/:tableCode/:tableValueId',
            element: (
              <OperationProvider>
                <LazyRoute route={() => import('./tax-config')} />
              </OperationProvider>
            ),
          },
        ],
      },
    ],
  },
  {
    path: 'tax-rates',
    element: (
      <TableProvider
        key="tax-rates"
        initialState={{
          sorting: [
            {
              desc: true,
              id: 'year',
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
        element: <LazyRoute route={() => import('./tax-rates')} />,
      },
      {
        path: ':calculatorId/:tableCode/:tableValueId',
        element: (
          <OperationProvider>
            <LazyRoute route={() => import('./tax-config')} />
          </OperationProvider>
        ),
      },
    ],
  },
];
