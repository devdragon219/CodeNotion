import { createContext } from 'react';

import { OperationContextProps } from './types';

const OperationContext = createContext<OperationContextProps | null>(null);
OperationContext.displayName = 'Operation Context';

export { OperationContext };
