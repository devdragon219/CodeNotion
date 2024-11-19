import { LazyRoute } from '@realgimm5/frontend-common/components';
import { TableProvider } from '@realgimm5/frontend-common/contexts';
import { Navigate, RouteObject } from 'react-router-dom';

import { getAssetManagementRoutes } from './asset-management/routes';
import { getEnergyManagementRoutes } from './energy-management/routes';
import { getMaintenanceRoutes } from './maintenance/routes';
import { getRealEstateRoutes } from './real-estate/routes';
import { getRegistryRoutes } from './registry/routes';
import { getRepositoryRoutes } from './repository/routes';
import { getSettingsRoutes } from './settings/routes';
import { getStatisticsRoutes } from './statistics/routes';
import { getSystemRoutes } from './system/routes';
import { getTaxManagementRoutes } from './tax-management/routes';

export const getAppRoutes = (): RouteObject[] => [
  {
    index: true,
    element: <Navigate to="/app/home" />,
  },
  {
    path: 'home',
    element: <LazyRoute route={() => import('./home')} />,
  },
  {
    path: 'registry',
    children: getRegistryRoutes(),
  },
  {
    path: 'real-estate',
    children: getRealEstateRoutes(),
  },
  {
    path: 'asset-management',
    children: getAssetManagementRoutes(),
  },
  { path: 'tax-management', children: getTaxManagementRoutes() },
  {
    path: 'energy-management',
    children: getEnergyManagementRoutes(),
  },
  {
    path: 'maintenance',
    children: getMaintenanceRoutes(),
  },
  {
    path: 'repository',
    children: getRepositoryRoutes(),
  },
  { path: 'system', children: getSystemRoutes() },
  { path: 'settings', children: getSettingsRoutes() },
  {
    path: 'notifications',
    element: (
      <TableProvider
        key="notifications"
        initialState={{
          sorting: [
            {
              desc: true,
              id: 'timestamp',
            },
          ],
        }}
      >
        <LazyRoute route={() => import('./notifications')} />
      </TableProvider>
    ),
  },
  {
    path: 'profile',
    element: <LazyRoute route={() => import('./profile')} />,
  },
  { path: 'statistics', children: getStatisticsRoutes() },
];
