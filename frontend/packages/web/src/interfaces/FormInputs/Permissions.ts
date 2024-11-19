export interface PermissionFormInput {
  feature: string;
  canCreate: boolean;
  canRead: boolean;
  canUpdate: boolean;
  canDelete: boolean;
}

export interface PermissionsFieldValues {
  permissions: PermissionFormInput[];
}
