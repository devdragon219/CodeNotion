import { PermissionFormInput } from '../../../interfaces/FormInputs/Permissions';

export interface PermissionsTableProps {
  permissionsInput?: PermissionFormInput[];
  readonly?: boolean;
  onInputChange?: (permissionsInput: PermissionFormInput[]) => void;
}
