import { LazyRoute } from '@realgimm5/frontend-common/components';
import { OperationProvider, TableProvider } from '@realgimm5/frontend-common/contexts';
import { Navigate, Outlet, RouteObject } from 'react-router-dom';

export const getMaintenanceRoutes = (): RouteObject[] => [
  {
    index: true,
    element: <Navigate to="/app/settings/maintenance/facility-contract-types" />,
  },
  {
    path: 'facility-contract-types',
    element: (
      <TableProvider
        key="facility-contract-types"
        initialState={{
          sorting: [
            {
              desc: false,
              id: 'ordering',
            },
          ],
        }}
      >
        <LazyRoute route={() => import('./facility-contract-types')} />
      </TableProvider>
    ),
  },
  {
    path: 'facility-contract-templates',
    element: (
      <TableProvider
        key="facility-contract-templates"
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
        element: <LazyRoute route={() => import('./facility-contract-templates')} />,
      },
      {
        path: ':id',
        element: (
          <OperationProvider>
            <LazyRoute route={() => import('./facility-contract-template')} />
          </OperationProvider>
        ),
      },
    ],
  },
  {
    path: 'estate-unit-groups',
    element: (
      <TableProvider
        key="estate-unit-groups"
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
        element: <LazyRoute route={() => import('./estate-unit-groups')} />,
      },
      {
        path: ':id',
        element: (
          <OperationProvider>
            <LazyRoute route={() => import('./estate-unit-group')} />
          </OperationProvider>
        ),
      },
    ],
  },
  {
    path: 'slas',
    element: (
      <TableProvider
        key="slas"
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
        element: <LazyRoute route={() => import('./slas')} />,
      },
      {
        path: ':id',
        element: (
          <OperationProvider>
            <LazyRoute route={() => import('./sla')} />
          </OperationProvider>
        ),
      },
    ],
  },
  {
    path: 'penalties',
    element: (
      <TableProvider
        key="penalties"
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
        element: <LazyRoute route={() => import('./penalties')} />,
      },
      {
        path: ':id',
        element: (
          <OperationProvider>
            <LazyRoute route={() => import('./penalty')} />
          </OperationProvider>
        ),
      },
    ],
  },
  {
    path: 'calendars',
    element: (
      <TableProvider
        key="calendars"
        initialState={{
          sorting: [
            {
              desc: false,
              id: 'name',
            },
          ],
        }}
      >
        <LazyRoute route={() => import('./calendars')} />
      </TableProvider>
    ),
  },
  {
    path: 'ticket-checklist-templates',
    element: (
      <TableProvider
        key="ticket-checklist-templates"
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
        element: <LazyRoute route={() => import('./ticket-checklist-templates')} />,
      },
      {
        path: ':id',
        element: (
          <OperationProvider>
            <LazyRoute route={() => import('./ticket-checklist-template')} />
          </OperationProvider>
        ),
      },
    ],
  },
  {
    path: 'intervention-types',
    element: (
      <TableProvider
        key="intervention-types"
        initialState={{
          sorting: [
            {
              desc: false,
              id: 'internalCode',
            },
          ],
        }}
      >
        <LazyRoute route={() => import('./intervention-types')} />
      </TableProvider>
    ),
  },
  {
    path: 'crafts',
    element: (
      <TableProvider
        key="crafts"
        initialState={{
          sorting: [
            {
              desc: false,
              id: 'ordering',
            },
          ],
        }}
      >
        <LazyRoute route={() => import('./crafts')} />
      </TableProvider>
    ),
  },
  {
    path: 'qualification-levels',
    element: (
      <TableProvider
        key="qualification-levels"
        initialState={{
          sorting: [
            {
              desc: false,
              id: 'ordering',
            },
          ],
        }}
      >
        <LazyRoute route={() => import('./qualification-levels')} />
      </TableProvider>
    ),
  },
  {
    path: 'ticket-types',
    element: (
      <TableProvider
        key="ticket-types"
        initialState={{
          sorting: [
            {
              desc: false,
              id: 'ordering',
            },
          ],
        }}
      >
        <LazyRoute route={() => import('./ticket-types')} />
      </TableProvider>
    ),
  },
  {
    path: 'price-list-measurement-units',
    element: (
      <TableProvider
        key="price-list-measurement-units"
        initialState={{
          sorting: [
            {
              desc: false,
              id: 'ordering',
            },
          ],
        }}
      >
        <LazyRoute route={() => import('./price-list-measurement-units')} />
      </TableProvider>
    ),
  },
  {
    path: 'service-categories',
    element: (
      <TableProvider
        key="service-categories"
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
        element: <LazyRoute route={() => import('./service-categories')} />,
      },
      {
        path: ':id',
        element: (
          <OperationProvider>
            <LazyRoute route={() => import('./service-category')} />
          </OperationProvider>
        ),
      },
    ],
  },
];
