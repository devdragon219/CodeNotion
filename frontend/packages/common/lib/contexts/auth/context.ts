import { createContext } from 'react';

import { AuthContextProps } from './types';

const AuthContext = createContext<AuthContextProps | null>(null);
AuthContext.displayName = 'Auth Context';

export { AuthContext };
