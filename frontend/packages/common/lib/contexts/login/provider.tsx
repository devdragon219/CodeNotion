import { UserManager } from 'oidc-client-ts';
import { useCallback, useMemo, useState } from 'react';

import { Loader } from '../../components/Loader/Loader';
import { LoginError } from '../../enums/LoginError';
import { useLoginMutation, useLoginWithOidcMutation } from '../../gql/RealGimm.WebCommon.Login.operation';
import { useSwitchTenantMutation } from '../../gql/RealGimm.WebCommon.User.operation';
import { LoginFormInput } from '../../interfaces/FormInputs/Login';
import { jwtDecode } from '../../utils/jwtDecode';
import { useAuth } from '../auth/hook';
import { LoginContext } from './context';
import { LoginContextProps, LoginProviderProps } from './types';

export const LoginProvider = ({ children, loginMethods, userManagerSetting }: LoginProviderProps) => {
  const [loading, setLoading] = useState(false);
  const { setAuth, updateAuth } = useAuth();
  const [, loginMutation] = useLoginMutation();
  const [, loginWithOidcMutation] = useLoginWithOidcMutation();
  const [, switchTenantMutation] = useSwitchTenantMutation();
  const userManager = useMemo(
    () => (userManagerSetting ? new UserManager(userManagerSetting) : null),
    [userManagerSetting],
  );

  const loginWithCredentials = useCallback(
    async (credentials: LoginFormInput, remember: boolean) => {
      setLoading(true);
      const result = await loginMutation({ credentials });
      setLoading(false);
      const auth = result.data?.login.login;
      if (auth) {
        setAuth(auth, remember);
        const { tenants } = jwtDecode(auth.jwt);
        return Promise.resolve(tenants);
      }

      const { graphQLErrors } = result.error ?? {};
      if (graphQLErrors && graphQLErrors.length !== 0) {
        const message = graphQLErrors[0].extensions.message;
        if (typeof message === 'string') {
          const error = message
            .split(/(?=[A-Z])/)
            .join('_')
            .toUpperCase();

          if (Object.values(LoginError).includes(error as LoginError)) {
            return Promise.reject(error);
          }
        }
      }

      return Promise.reject(LoginError.InvalidCredentials);
    },
    [loginMutation, setAuth],
  );

  const loginWithOidc = useCallback(async () => {
    if (!userManager) return Promise.reject();

    setLoading(true);
    try {
      await userManager.signinRedirect();
      return;
    } catch (error) {
      return await Promise.reject(error);
    } finally {
      setLoading(false);
    }
  }, [userManager]);

  const loginWithOidcCallback = useCallback(async () => {
    if (!userManager) return Promise.reject();

    setLoading(true);
    try {
      const user = await userManager.signinCallback();
      await userManager.removeUser();
      if (user && user.id_token) {
        const result = await loginWithOidcMutation({ idToken: user.id_token });
        const auth = result.data?.login.loginOIDC;
        if (auth) {
          setAuth(auth);
          const { tenants } = jwtDecode(auth.jwt);
          return tenants;
        }
      }
      return await Promise.reject();
    } catch (error) {
      return await Promise.reject(error);
    } finally {
      setLoading(false);
    }
  }, [loginWithOidcMutation, setAuth, userManager]);

  const selectTenant = useCallback(
    async (newTenant: string) => {
      setLoading(true);
      const result = await switchTenantMutation({ input: { newTenant } });
      setLoading(false);
      const auth = result.data?.user.switchTenant;
      if (auth) {
        updateAuth(auth);
        return Promise.resolve();
      }

      return Promise.reject();
    },
    [switchTenantMutation, updateAuth],
  );

  const contextValue: LoginContextProps = {
    loginMethods,
    loginWithCredentials,
    loginWithOidc,
    loginWithOidcCallback,
    selectTenant,
  };

  return (
    <LoginContext.Provider value={contextValue}>
      {loading && <Loader />}
      {children}
    </LoginContext.Provider>
  );
};
