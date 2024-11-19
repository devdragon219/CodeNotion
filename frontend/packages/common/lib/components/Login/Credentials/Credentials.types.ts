import { JwtTenant } from '../../../interfaces/JWT';

export interface LoginWithCredentialsProps {
  onLogin: (tenants: JwtTenant[]) => void;
}
