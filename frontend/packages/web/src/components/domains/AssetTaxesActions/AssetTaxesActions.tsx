import { Button, Menu, MenuItem, Typography } from '@mui/material';
import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AssetTaxesActionsProps } from './AssetTaxesActions.types';

export const AssetTaxesActions = ({ onFinalize }: AssetTaxesActionsProps) => {
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
        <MenuItem disableGutters onClick={handleFinalize}>
          <Typography variant="bodySm">{t('asset_tax.action.finalize_asset_taxes')}</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};
