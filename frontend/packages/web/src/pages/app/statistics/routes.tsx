import { LazyRoute } from '@realgimm5/frontend-common/components';
import { TableProvider } from '@realgimm5/frontend-common/contexts';
import { RouteObject } from 'react-router-dom';

export const getStatisticsRoutes = (): RouteObject[] => [
  {
    path: 'usage-types-distributions',
    element: (
      <TableProvider
        key="usage-types-distributions"
        initialState={{
          sorting: [
            {
              desc: true,
              id: 'percentage',
            },
          ],
        }}
      >
        <LazyRoute route={() => import('./usage-types-distributions')} />
      </TableProvider>
    ),
  },
  {
    path: 'estate-unit-types-distributions',
    element: (
      <TableProvider
        key="estate-unit-types-distributions"
        initialState={{
          sorting: [
            {
              desc: true,
              id: 'percentage',
            },
          ],
        }}
      >
        <LazyRoute route={() => import('./estate-unit-types-distributions')} />
      </TableProvider>
    ),
  },
];
