import { createContext } from 'react';

import { TableContextProps } from './types';

// eslint-disable-next-line
const TableContext = createContext<TableContextProps<any> | null>(null);
TableContext.displayName = 'Table Context';

export { TableContext };
