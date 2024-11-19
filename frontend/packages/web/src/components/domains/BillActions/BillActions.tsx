import { Button, Menu, MenuItem, Typography } from '@mui/material';
import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { BillActionsProps } from './BillActions.types';

export const BillActions = ({ isTemporary, onFinalize, onGenerate }: BillActionsProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleFinalize = useCallback(() => {
    onFinalize();
    handleClose();
  }, [handleClose, onFinalize]);
  const handleGenerate = useCallback(() => {
    onGenerate();
    handleClose();
  }, [handleClose, onGenerate]);

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
        {isTemporary && (
          <MenuItem disableGutters onClick={handleFinalize}>
            <Typography variant="bodySm">{t('bill.action.finalize_bill')}</Typography>
          </MenuItem>
        )}
        <MenuItem disableGutters onClick={handleGenerate}>
          <Typography variant="bodySm">{t('bill.action.generate_pdf')}</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};
