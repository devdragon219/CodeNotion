import { LazyRoute } from '@realgimm5/frontend-common/components';
import { OperationProvider, TableProvider } from '@realgimm5/frontend-common/contexts';
import { Navigate, Outlet, RouteObject } from 'react-router-dom';

export const getRealEstateRoutes = (): RouteObject[] => [
  {
    index: true,
    element: <Navigate to="/app/real-estate/estates" />,
  },
  {
    path: 'estates',
    element: (
      <TableProvider
        key="estates"
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
        element: <LazyRoute route={() => import('./estates')} />,
      },
      {
        path: ':id',
        children: [
          {
            index: true,
            element: (
              <OperationProvider>
                <LazyRoute route={() => import('./estate')} />
              </OperationProvider>
            ),
          },
          {
            path: 'portfolio',
            element: <LazyRoute route={() => import('./estate-portfolio')} />,
          },
        ],
      },
    ],
  },
  {
    path: 'estate-units',
    element: (
      <TableProvider
        key="estate-units"
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
        element: <LazyRoute route={() => import('./estate-units')} />,
      },
      {
        path: ':id?/merge',
        element: <LazyRoute route={() => import('./estate-unit-actions/estate-unit-merge')} />,
      },
      {
        path: ':id?/split',
        element: <LazyRoute route={() => import('./estate-unit-actions/estate-unit-split')} />,
      },
      {
        path: ':id?/transform',
        element: <LazyRoute route={() => import('./estate-unit-actions/estate-unit-transform')} />,
      },
      {
        path: ':id',
        element: (
          <OperationProvider>
            <LazyRoute route={() => import('./estate-unit')} />
          </OperationProvider>
        ),
      },
    ],
  },
  {
    path: 'cadastral-units',
    element: (
      <TableProvider
        key="cadastral-units"
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
        element: <LazyRoute route={() => import('./cadastral-units')} />,
      },
      {
        path: ':id',
        element: (
          <OperationProvider>
            <LazyRoute route={() => import('./cadastral-unit')} />
          </OperationProvider>
        ),
      },
    ],
  },
  {
    path: 'catalogues',
    element: (
      <TableProvider
        key="catalogues"
        initialState={{
          sorting: [
            {
              desc: false,
              id: 'estateInternalCode',
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
        element: <LazyRoute route={() => import('./catalogues')} />,
      },
      {
        path: ':catalogueTypeId/:estateId',
        children: [
          {
            index: true,
            element: (
              <OperationProvider id={['catalogueTypeId', 'estateId']}>
                <LazyRoute route={() => import('./catalogue')} />
              </OperationProvider>
            ),
          },
          {
            path: 'items/:catalogueItemId',
            element: (
              <OperationProvider id="catalogueItemId">
                <LazyRoute route={() => import('./catalogue-item')} />
              </OperationProvider>
            ),
          },
        ],
      },
    ],
  },
];
