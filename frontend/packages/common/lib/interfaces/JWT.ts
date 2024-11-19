import { Permission } from '../enums/Permission';

export type JwtToken = {
  exp: number;
  rg_mtnt_selected?: string;
  rg_perm?: string;
} & Record<string, string>;

export interface JwtTenant {
  id: string;
  name: string;
}

export type JwtPermissions = Record<string, Permission[] | undefined>;
