import { Button, Menu, MenuItem, Typography } from '@mui/material';
import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { TicketActionsProps } from './TicketActions.types';

export const TicketActions = ({ onConvert }: TicketActionsProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleConvert = useCallback(() => {
    onConvert();
    handleClose();
  }, [handleClose, onConvert]);

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
        <MenuItem disableGutters onClick={handleConvert}>
          <Typography variant="bodySm">{t('ticket.action.convert_in_excluded_from_contract')}</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};
