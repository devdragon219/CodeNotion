import { LazyRoute } from '@realgimm5/frontend-common/components';
import { OperationProvider, TableProvider } from '@realgimm5/frontend-common/contexts';
import { Navigate, Outlet, RouteObject } from 'react-router-dom';

export const getRealEstateRoutes = (): RouteObject[] => [
  {
    index: true,
    element: <Navigate to="/app/settings/real-estate/floors" />,
  },
  {
    path: 'floors',
    element: (
      <TableProvider
        key="floors"
        initialState={{
          sorting: [
            {
              desc: false,
              id: 'position',
            },
          ],
        }}
      >
        <LazyRoute route={() => import('./floors')} />
      </TableProvider>
    ),
  },
  {
    path: 'function-areas',
    element: (
      <TableProvider
        key="function-areas"
        initialState={{
          sorting: [
            {
              desc: false,
              id: 'internalCode',
            },
          ],
        }}
      >
        <LazyRoute route={() => import('./function-areas')} />
      </TableProvider>
    ),
  },
  {
    path: 'catalogue-types',
    element: (
      <TableProvider
        key="catalogue-types"
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
        element: <LazyRoute route={() => import('./catalogue-types')} />,
      },
      {
        path: ':id',
        element: (
          <OperationProvider>
            <LazyRoute route={() => import('./catalogue-type')} />
          </OperationProvider>
        ),
      },
    ],
  },
  {
    path: 'catalogue-categories',
    element: (
      <TableProvider
        key="catalogue-categories"
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
        element: <LazyRoute route={() => import('./catalogue-categories')} />,
      },
      {
        path: ':id',
        element: (
          <OperationProvider>
            <LazyRoute route={() => import('./catalogue-category')} />
          </OperationProvider>
        ),
      },
    ],
  },
  {
    path: 'cadastral-land-categories',
    element: (
      <TableProvider
        key="cadastral-land-categories"
        initialState={{
          sorting: [
            {
              desc: false,
              id: 'ordering',
            },
          ],
        }}
      >
        <LazyRoute route={() => import('./cadastral-land-categories')} />
      </TableProvider>
    ),
  },
  {
    path: 'main-usage-types',
    element: (
      <TableProvider
        key="main-usage-types"
        initialState={{
          sorting: [
            {
              desc: false,
              id: 'ordering',
            },
          ],
        }}
      >
        <LazyRoute route={() => import('./main-usage-types')} />
      </TableProvider>
    ),
  },
  {
    path: 'usage-types',
    element: (
      <TableProvider
        key="usage-types"
        initialState={{
          sorting: [
            {
              desc: false,
              id: 'ordering',
            },
          ],
        }}
      >
        <LazyRoute route={() => import('./usage-types')} />
      </TableProvider>
    ),
  },
];
