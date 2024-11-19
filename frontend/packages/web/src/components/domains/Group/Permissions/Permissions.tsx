import { useCallback } from 'react';
import { useWatch } from 'react-hook-form';

import { PermissionFormInput } from '../../../../interfaces/FormInputs/Permissions';
import { PermissionsTable } from '../../../core/PermissionsTable/PermissionsTable';
import { GroupPermissionsProps } from './Permissions.types';

export const GroupPermissions = ({ control, readonly, setValue }: GroupPermissionsProps) => {
  const permissionsInput = useWatch({ control, name: 'permissions' });

  const onInputChange = useCallback(
    (updatedInput: PermissionFormInput[]) => {
      setValue('permissions', updatedInput);
    },
    [setValue],
  );

  return <PermissionsTable permissionsInput={permissionsInput} readonly={readonly} onInputChange={onInputChange} />;
};
