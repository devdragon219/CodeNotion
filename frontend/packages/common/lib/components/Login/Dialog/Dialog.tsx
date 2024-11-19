import { Box, FormHelperText, List, ListItemButton, ListItemText } from '@mui/material';
import { t } from 'i18next';
import { useCallback } from 'react';

import { Dialog } from '../../Dialog/Dialog';
import { TenantsDialogProps } from './Dialog.types';

export const TenantsDialog = ({ hasError, tenants, onClose, onSelect }: TenantsDialogProps) => {
  const handleSelect = useCallback(
    (tenantId: string) => () => {
      onSelect(tenantId);
    },
    [onSelect],
  );

  return (
    <Dialog title="common.component.login.dialog.select_tenant" maxWidth="xs" open onClose={onClose}>
      <List>
        {tenants.map((tenant, index) => (
          <ListItemButton key={index} onClick={handleSelect(tenant.id)}>
            <ListItemText primary={tenant.name} />
          </ListItemButton>
        ))}
      </List>
      {hasError && (
        <Box sx={{ mt: { xs: 1.5, sm: 2.5 } }}>
          <FormHelperText error>{t('common.component.login.error.invalid_tenant')}</FormHelperText>
        </Box>
      )}
    </Dialog>
  );
};
