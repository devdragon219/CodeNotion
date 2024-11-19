import { UserManagerSettings } from 'oidc-client-ts';
import { PropsWithChildren } from 'react';

import { LoginMethod } from '../../enums/LoginMethod';
import { LoginFormInput } from '../../interfaces/FormInputs/Login';
import { JwtTenant } from '../../interfaces/JWT';

export interface LoginContextProps {
  loginMethods: LoginMethod[];
  loginWithCredentials: (credentials: LoginFormInput, remember: boolean) => Promise<JwtTenant[]>;
  loginWithOidc: () => Promise<void>;
  loginWithOidcCallback: () => Promise<JwtTenant[]>;
  selectTenant: (tenant: string) => Promise<void>;
}

export type LoginProviderProps = PropsWithChildren<{
  loginMethods: LoginMethod[];
  userManagerSetting?: UserManagerSettings;
}>;
