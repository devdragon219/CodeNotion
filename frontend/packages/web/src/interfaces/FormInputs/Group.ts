import { PermissionFormInput } from './Permissions';

export interface GroupFormInput {
  description: string;
  groupId: number | null;
  name: string;
  permissions: PermissionFormInput[];
}
