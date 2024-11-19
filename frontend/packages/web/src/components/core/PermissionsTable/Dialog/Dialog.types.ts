import { PermissionFormInput } from '../../../../interfaces/FormInputs/Permissions';

export interface PermissionsDialogInput {
  permissions: PermissionFormInput[];
}

export interface PermissionsDialogProps {
  permissionsInput?: PermissionFormInput[];
  onClose: () => void;
  onSave: (value: PermissionsDialogInput) => void;
}
