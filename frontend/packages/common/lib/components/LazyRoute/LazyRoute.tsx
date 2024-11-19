import { Suspense, lazy } from 'react';

import { Loader } from '../Loader/Loader';
import { LazyRouteProps } from './LazyRoute.types';

export const LazyRoute = ({ route }: LazyRouteProps) => {
  const Component = lazy(route);

  return (
    <Suspense fallback={<Loader />}>
      <Component />
    </Suspense>
  );
};
