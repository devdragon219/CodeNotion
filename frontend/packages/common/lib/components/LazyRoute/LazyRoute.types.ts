import { ComponentType } from 'react';

export interface LazyRouteProps {
  route: () => Promise<{ default: ComponentType }>;
}
