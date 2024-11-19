import { LazyRoute } from '@realgimm5/frontend-common/components';
import { OperationProvider, TableProvider } from '@realgimm5/frontend-common/contexts';
import { Outlet, RouteObject } from 'react-router-dom';

export const getMaintenanceRoutes = (): RouteObject[] => [
  {
    index: true,
    element: <LazyRoute route={() => import('.')} />,
  },
  {
    path: 'tickets',
    element: (
      <TableProvider
        key="tickets"
        initialState={{
          sorting: [
            {
              desc: false,
              id: 'dueDate',
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
        element: <LazyRoute route={() => import('./tickets')} />,
      },
      {
        path: ':id',
        element: (
          <OperationProvider>
            <LazyRoute route={() => import('./ticket')} />
          </OperationProvider>
        ),
      },
    ],
  },
  {
    path: 'tickets-calendar',
    element: <LazyRoute route={() => import('./tickets-calendar')} />,
  },
  {
    path: 'tickets-timetable/:type',
    element: (
      <TableProvider
        key="tickets"
        initialState={{
          sorting: [
            {
              desc: false,
              id: 'dueDate',
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
        element: <LazyRoute route={() => import('./tickets')} />,
      },
      {
        path: ':id',
        element: (
          <OperationProvider>
            <LazyRoute route={() => import('./ticket')} />
          </OperationProvider>
        ),
      },
    ],
  },
  {
    path: 'facility-contracts',
    element: (
      <TableProvider
        key="facility-contracts"
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
        element: <LazyRoute route={() => import('./facility-contracts')} />,
      },
      {
        path: ':id',
        children: [
          {
            index: true,
            element: (
              <OperationProvider>
                <LazyRoute route={() => import('./facility-contract')} />
              </OperationProvider>
            ),
          },
          {
            path: 'ticket-checklists/:ticketChecklistId',
            element: (
              <OperationProvider id="ticketChecklistId">
                <LazyRoute route={() => import('./ticket-checklist')} />
              </OperationProvider>
            ),
          },
        ],
      },
    ],
  },
  {
    path: 'work-teams',
    element: (
      <TableProvider
        key="work-teams"
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
        element: <LazyRoute route={() => import('./work-teams')} />,
      },
      {
        path: ':id',
        element: (
          <OperationProvider>
            <LazyRoute route={() => import('./work-team')} />
          </OperationProvider>
        ),
      },
    ],
  },
  {
    path: 'price-lists',
    element: (
      <TableProvider
        key="price-lists"
        initialState={{
          sorting: [
            {
              desc: false,
              id: 'ordering',
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
        element: <LazyRoute route={() => import('./price-lists')} />,
      },
      {
        path: ':id',
        element: (
          <OperationProvider>
            <LazyRoute route={() => import('./price-list')} />
          </OperationProvider>
        ),
      },
    ],
  },
  {
    path: 'price-list-articles',
    element: (
      <TableProvider
        key="price-list-articles"
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
        element: <LazyRoute route={() => import('./price-list-articles')} />,
      },
      {
        path: ':id',
        element: (
          <OperationProvider>
            <LazyRoute route={() => import('./price-list-article')} />
          </OperationProvider>
        ),
      },
    ],
  },
];
