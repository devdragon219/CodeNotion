import { SecondaryTable } from '@realgimm5/frontend-common/components';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getPermissionsTableRows } from '../../../utils/components/permissionsTable/getPermissionsTableRows';
import { PermissionsDialog } from './Dialog/Dialog';
import { PermissionsDialogInput } from './Dialog/Dialog.types';
import { PermissionsTableProps } from './PermissionsTable.types';

export const PermissionsTable = ({ permissionsInput, readonly, onInputChange }: PermissionsTableProps) => {
  const { t } = useTranslation();
  const [isPermissionsDialogOpen, setPermissionsDialogOpen] = useState(false);

  const rows = useMemo(() => getPermissionsTableRows(permissionsInput, t), [permissionsInput, t]);

  const handleClosePermissionDialog = useCallback(() => {
    setPermissionsDialogOpen(false);
  }, []);
  const handleOpenPermissionDialog = useCallback(() => {
    setPermissionsDialogOpen(true);
  }, []);
  const handleSavePermissions = useCallback(
    (permissionsInput: PermissionsDialogInput) => {
      if (onInputChange) {
        onInputChange(permissionsInput.permissions);
      }
      setPermissionsDialogOpen(false);
    },
    [onInputChange],
  );

  return (
    <>
      <SecondaryTable
        columns={[
          'component.permissions_table.module',
          'component.permissions_table.block',
          'component.permissions_table.permissions',
        ]}
        empty={'component.permissions_table.no_permissions'}
        rows={rows}
        {...(!readonly && { onEdit: handleOpenPermissionDialog })}
      />
      {isPermissionsDialogOpen && (
        <PermissionsDialog
          permissionsInput={permissionsInput}
          onSave={handleSavePermissions}
          onClose={handleClosePermissionDialog}
        />
      )}
    </>
  );
};
