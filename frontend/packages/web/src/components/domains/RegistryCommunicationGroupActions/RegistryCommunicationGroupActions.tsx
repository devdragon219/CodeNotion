import { Button, Menu, MenuItem, Typography } from '@mui/material';
import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { RegistryCommunicationGroupActionsProps } from './RegistryCommunicationGroupActions.types';

export const RegistryCommunicationGroupActions = ({
  isConfirmed,
  onCancel,
  onConfirm,
  onExport,
}: RegistryCommunicationGroupActionsProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleCancel = useCallback(() => {
    onCancel();
    handleClose();
  }, [handleClose, onCancel]);
  const handleConfirm = useCallback(() => {
    onConfirm();
    handleClose();
  }, [handleClose, onConfirm]);
  const handleExport = useCallback(() => {
    onExport();
    handleClose();
  }, [handleClose, onExport]);

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
        {isConfirmed ? (
          [
            <MenuItem key="cancel" disableGutters onClick={handleCancel}>
              <Typography variant="bodySm">{t('registry_communication.action.cancel_single')}</Typography>
            </MenuItem>,
            <MenuItem key="export" disableGutters onClick={handleExport}>
              <Typography variant="bodySm">{t('registry_communication.action.export')}</Typography>
            </MenuItem>,
          ]
        ) : (
          <MenuItem disableGutters onClick={handleConfirm}>
            <Typography variant="bodySm">{t('registry_communication.action.confirm_single')}</Typography>
          </MenuItem>
        )}
      </Menu>
    </>
  );
};
