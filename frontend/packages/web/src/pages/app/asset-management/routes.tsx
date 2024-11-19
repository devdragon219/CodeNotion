import { LazyRoute } from '@realgimm5/frontend-common/components';
import { OperationProvider, TableProvider } from '@realgimm5/frontend-common/contexts';
import { Navigate, Outlet, RouteObject } from 'react-router-dom';

export const getAssetManagementRoutes = (): RouteObject[] => [
  {
    index: true,
    element: <Navigate to="/app/asset-management/contracts" />,
  },
  {
    path: 'contracts',
    children: [
      {
        index: true,
        element: <Navigate to="/app/asset-management/contracts/active" />,
      },
      {
        path: ':type',
        element: (
          <TableProvider
            key="contracts"
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
            element: <LazyRoute route={() => import('./contracts')} />,
          },
          {
            path: ':id',
            element: (
              <OperationProvider>
                <LazyRoute route={() => import('./contract')} />
              </OperationProvider>
            ),
          },
        ],
      },
    ],
  },
  {
    path: 'bills',
    children: [
      {
        index: true,
        element: <Navigate to="/app/asset-management/bills/active" />,
      },
      {
        path: ':type',
        element: (
          <TableProvider
            key="bills"
            initialState={{
              sorting: [
                {
                  desc: true,
                  id: 'date',
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
            element: <LazyRoute route={() => import('./bills')} />,
          },
          {
            path: ':id',
            element: (
              <OperationProvider>
                <LazyRoute route={() => import('./bill')} />
              </OperationProvider>
            ),
          },
        ],
      },
    ],
  },
  {
    path: 'administrations',
    element: (
      <TableProvider
        key="administrations"
        initialState={{
          sorting: [
            {
              desc: true,
              id: 'since',
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
        element: <LazyRoute route={() => import('./administrations')} />,
      },
      {
        path: ':id',
        children: [
          {
            index: true,
            element: (
              <OperationProvider>
                <LazyRoute route={() => import('./administration')} />
              </OperationProvider>
            ),
          },
          {
            path: 'terms/:termId',
            element: (
              <OperationProvider id="termId">
                <LazyRoute route={() => import('./administration-term')} />
              </OperationProvider>
            ),
          },
        ],
      },
    ],
  },
  {
    path: 'registry-communications',
    children: [
      {
        index: true,
        element: <Navigate to="/app/asset-management/registry-communications/temporary" />,
      },
      {
        path: ':type',
        element: (
          <TableProvider
            key="registry-communication-groups"
            initialState={{
              sorting: [
                {
                  desc: true,
                  id: 'id.endDate',
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
            element: <LazyRoute route={() => import('./registry-communications')} />,
          },
          {
            path: ':managementSubjectId/:isActiveContract/:communicationType/:endDate?/:date?/:requestingSubjectLegalRepresentativeId?/:debtBankAccountId?',
            element: (
              <OperationProvider>
                <LazyRoute route={() => import('./registry-communication')} />
              </OperationProvider>
            ),
          },
        ],
      },
    ],
  },
  {
    path: 'registration-payments',
    element: (
      <TableProvider
        key="registration-payments"
        initialState={{
          sorting: [
            {
              desc: false,
              id: 'paymentCode',
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
        element: <LazyRoute route={() => import('./registration-payments')} />,
      },
      {
        path: ':id',
        element: (
          <OperationProvider>
            <LazyRoute route={() => import('./registration-payment')} />
          </OperationProvider>
        ),
      },
    ],
  },
];
