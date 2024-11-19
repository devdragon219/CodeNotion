import { createContext } from 'react';

import { LoginContextProps } from './types';

const LoginContext = createContext<LoginContextProps | null>(null);
LoginContext.displayName = 'Login Context';

export { LoginContext };
