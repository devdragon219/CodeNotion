import { Button, Menu, MenuItem, Typography } from '@mui/material';
import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { RegistryCommunicationGroupsActionsProps } from './RegistryCommunicationGroupsActions.types';

export const RegistryCommunicationGroupsActions = ({ onConfirm }: RegistryCommunicationGroupsActionsProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleConfirm = useCallback(() => {
    onConfirm();
    handleClose();
  }, [handleClose, onConfirm]);

  return (
    <>
      <Button
        ref={anchorRef}
        size="large"
        variant="outlined"
        color="primary"
        sx={{ minWidth: '112px' }}
        onClick={handleOpen}
      >
        {t('core.button.actions')}
      </Button>
      <Menu anchorEl={anchorRef.current} open={open} onClose={handleClose} variant="selectedMenu">
        <MenuItem disableGutters onClick={handleConfirm}>
          <Typography variant="bodySm">{t('registry_communication.action.confirm_all')}</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};
