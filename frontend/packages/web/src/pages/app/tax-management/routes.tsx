import { LazyRoute } from '@realgimm5/frontend-common/components';
import { TableProvider } from '@realgimm5/frontend-common/contexts';
import { Navigate, Outlet, RouteObject } from 'react-router-dom';

export const getTaxManagementRoutes = (): RouteObject[] => [
  {
    index: true,
    element: <Navigate to="/app/tax/asset-taxes" />,
  },
  {
    path: 'asset-taxes',
    element: (
      <TableProvider
        key="asset-taxes"
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
        element: <LazyRoute route={() => import('./asset-taxes')} />,
      },
      {
        path: ':taxCalculatorId/:year/:managementSubjectId/:expectedDueDate',
        element: (
          <TableProvider
            key="asset-tax"
            initialState={{
              sorting: [
                {
                  desc: false,
                  id: 'cityName',
                },
              ],
            }}
          >
            <LazyRoute route={() => import('./asset-tax')} />
          </TableProvider>
        ),
      },
      {
        path: 'history',
        element: (
          <TableProvider
            key="asset-taxes-history"
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
            element: <LazyRoute route={() => import('./asset-taxes-history')} />,
          },
          {
            path: ':taxCalculatorId/:year/:managementSubjectId/:expectedDueDate',
            element: (
              <TableProvider
                key="asset-tax"
                initialState={{
                  sorting: [
                    {
                      desc: false,
                      id: 'cityName',
                    },
                  ],
                }}
              >
                <LazyRoute route={() => import('./asset-tax')} />
              </TableProvider>
            ),
          },
        ],
      },
    ],
  },
  {
    path: 'report',
    element: <LazyRoute route={() => import('./report-generator')} />,
  },
];
