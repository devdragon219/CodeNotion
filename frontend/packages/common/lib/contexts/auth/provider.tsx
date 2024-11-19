import { PropsWithChildren, useCallback, useMemo, useState } from 'react';

import { LoginResult } from '../../gql/types';
import { jwtDecode } from '../../utils/jwtDecode';
import { AuthContext } from './context';
import { AuthContextProps } from './types';

const AUTH_KEY = '_auth';
export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [auth, setAuthValue] = useState(() => {
    const item = localStorage.getItem(AUTH_KEY) ?? sessionStorage.getItem(AUTH_KEY);
    if (!item) {
      return undefined;
    }
    return JSON.parse(item) as LoginResult;
  });
  const isSignedIn = useMemo(() => !!auth && jwtDecode(auth.jwt).hasSelectedTenant, [auth]);
  const accessToken = useMemo(() => auth?.jwt, [auth]);
  const refreshToken = useMemo(() => auth?.refreshToken ?? undefined, [auth]);
  const user = useMemo(() => auth?.user, [auth]);
  const permissions = useMemo(() => (auth?.jwt ? jwtDecode(auth.jwt).permissions : {}), [auth]);

  const setAuth = useCallback((auth: LoginResult, persist = true) => {
    setAuthValue(() => {
      if (persist) {
        localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
      } else {
        sessionStorage.setItem(AUTH_KEY, JSON.stringify(auth));
      }
      return auth;
    });
  }, []);

  const updateAuth = useCallback((auth: LoginResult) => {
    setAuthValue(() => {
      if (localStorage.getItem(AUTH_KEY)) {
        localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
      } else if (sessionStorage.getItem(AUTH_KEY)) {
        sessionStorage.setItem(AUTH_KEY, JSON.stringify(auth));
      }
      return auth;
    });
  }, []);

  const signOut = useCallback(() => {
    setAuthValue(() => {
      localStorage.removeItem(AUTH_KEY);
      sessionStorage.removeItem(AUTH_KEY);
      return undefined;
    });
  }, []);

  const contextValue: AuthContextProps = {
    accessToken,
    isSignedIn,
    permissions,
    refreshToken,
    user,
    setAuth,
    updateAuth,
    signOut,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
