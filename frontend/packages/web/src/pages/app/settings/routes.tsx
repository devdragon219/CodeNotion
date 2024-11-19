import { Navigate, RouteObject } from 'react-router-dom';

import { getAssetManagementRoutes } from './asset-management/routes';
import { getEnergyManagementRoutes } from './energy-management/routes';
import { getMaintenanceRoutes } from './maintenance/routes';
import { getRealEstateRoutes } from './real-estate/routes';
import { getTaxManagementRoutes } from './tax-management/routes';

export const getSettingsRoutes = (): RouteObject[] => [
  {
    index: true,
    element: <Navigate to="/app/settings/real-estate" />,
  },
  {
    path: 'asset-management',
    children: getAssetManagementRoutes(),
  },
  { path: 'energy-management', children: getEnergyManagementRoutes() },
  { path: 'maintenance', children: getMaintenanceRoutes() },
  { path: 'real-estate', children: getRealEstateRoutes() },
  { path: 'tax-management', children: getTaxManagementRoutes() },
];
