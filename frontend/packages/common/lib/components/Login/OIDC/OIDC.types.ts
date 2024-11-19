import { JwtTenant } from '../../../interfaces/JWT';

export interface LoginWithOidcProps {
  onLogin: (tenants: JwtTenant[]) => void;
}
