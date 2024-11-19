import { LoginResult, UserModel } from '../../gql/types';
import { JwtPermissions } from '../../interfaces/JWT';

export interface AuthContextProps {
  accessToken?: string;
  isSignedIn: boolean;
  permissions: JwtPermissions;
  refreshToken?: string;
  user?: UserModel;
  setAuth: (auth: LoginResult, persist?: boolean) => void;
  updateAuth: (auth: LoginResult) => void;
  signOut: () => void;
}
