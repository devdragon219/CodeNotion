import { useEffect } from 'react';

import { QueryVariables } from '../../interfaces/GraphQL';
import { createUseContext } from '../../utils/contextHelper';
import { TableContext } from './context';
import { TableContextProps } from './types';

export const useTable = <Variables extends QueryVariables = QueryVariables>(
  defaultVariables?: (variables: Variables) => Variables,
) => {
  const context = createUseContext<TableContextProps<Variables>>(TableContext)();

  useEffect(() => {
    if (defaultVariables) {
      context.setDefaultVariables(() => defaultVariables);
    }
    // eslint-disable-next-line
  }, []);

  return context;
};
