import { JwtTenant } from '../../../interfaces/JWT';

export interface TenantsDialogProps {
  hasError: boolean;
  tenants: JwtTenant[];
  onClose: () => void;
  onSelect: (tenantId: string) => void;
}
