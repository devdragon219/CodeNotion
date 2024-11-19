import { LazyRoute } from '@realgimm5/frontend-common/components';
import { OperationProvider, TableProvider } from '@realgimm5/frontend-common/contexts';
import { Navigate, Outlet, RouteObject } from 'react-router-dom';

export const getAssetManagementRoutes = (): RouteObject[] => [
  {
    index: true,
    element: <Navigate to="/app/settings/asset-management/contract-types" />,
  },
  {
    path: 'contract-types',
    element: (
      <TableProvider
        key="contract-types"
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
        element: <LazyRoute route={() => import('./contract-types')} />,
      },
      {
        path: ':id',
        element: (
          <OperationProvider>
            <LazyRoute route={() => import('./contract-type')} />
          </OperationProvider>
        ),
      },
    ],
  },
  {
    path: 'accounting-items',
    element: (
      <TableProvider
        key="accounting-items"
        initialState={{
          sorting: [
            {
              desc: false,
              id: 'internalCode',
            },
          ],
        }}
      >
        <LazyRoute route={() => import('./accounting-items')} />
      </TableProvider>
    ),
  },
  {
    path: 'bill-item-types',
    element: (
      <TableProvider
        key="bill-item-types"
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
        element: <LazyRoute route={() => import('./bill-item-types')} />,
      },
      {
        path: ':id',
        element: (
          <OperationProvider>
            <LazyRoute route={() => import('./bill-item-type')} />
          </OperationProvider>
        ),
      },
    ],
  },
  {
    path: 'vat-rates',
    element: (
      <TableProvider
        key="vat-rates"
        initialState={{
          sorting: [
            {
              desc: false,
              id: 'internalCode',
            },
          ],
        }}
      >
        <LazyRoute route={() => import('./vat-rates')} />
      </TableProvider>
    ),
  },
  {
    path: 'interest-rates',
    element: (
      <TableProvider
        key="interest-rates"
        initialState={{
          sorting: [
            {
              desc: true,
              id: 'since',
            },
          ],
        }}
      >
        <LazyRoute route={() => import('./interest-rates')} />
      </TableProvider>
    ),
  },
  {
    path: 'revaluation-data',
    element: (
      <TableProvider
        key="revaluation-data"
        initialState={{
          sorting: [
            {
              desc: true,
              id: 'year',
            },
          ],
        }}
      >
        <LazyRoute route={() => import('./revaluation-data')} />
      </TableProvider>
    ),
  },
];
