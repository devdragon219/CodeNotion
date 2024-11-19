import { jwtDecode as decode } from 'jwt-decode';

import { Permission } from '../enums/Permission';
import { JwtPermissions, JwtTenant, JwtToken } from '../interfaces/JWT';

export const jwtDecode = (token: string) => {
  const jwt = decode<JwtToken>(token);

  const isValid = jwt.exp > Date.now() / 1000;
  const hasSelectedTenant = !!jwt.rg_mtnt_selected;

  const tenants = Object.keys(jwt)
    .reduce<JwtTenant[]>((acc, key) => {
      if (key.startsWith('rg_mtnt_') && key !== 'rg_mtnt_selected') {
        acc.push({
          id: key.replace('rg_mtnt_', ''),
          name: jwt[key],
        });
      }
      return acc;
    }, [])
    .sort((a, b) => (a.name < b.name ? -1 : 1));

  const permissions = (jwt.rg_perm ?? '').split('#').reduce<JwtPermissions>((acc, perm) => {
    const parts = perm.split(':');
    const key = parts[0];
    let value = Number(`0x${parts[1]}`);
    const permissions: Permission[] = [];
    [Permission.Delete, Permission.Update, Permission.Read, Permission.Create].forEach((permission) => {
      if (value - permission >= 0) {
        permissions.push(permission);
        value -= permission;
      }
    });

    return {
      ...acc,
      [key]: permissions,
    };
  }, {});

  return {
    isValid,
    hasSelectedTenant,
    tenants,
    permissions,
  };
};
