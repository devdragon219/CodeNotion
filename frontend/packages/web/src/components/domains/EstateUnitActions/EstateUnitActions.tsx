import { Button, Menu, MenuItem, Typography } from '@mui/material';
import { useAuth } from '@realgimm5/frontend-common/contexts';
import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { RawFeature } from '../../../enums/RawFeature';
import { EstateUnitActionsProps } from './EstateUnitActions.types';

export const EstateUnitActions = ({ estateUnitId }: EstateUnitActionsProps) => {
  const { permissions } = useAuth();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleMerge = useCallback(() => {
    navigate(['/app/real-estate/estate-units', estateUnitId, 'merge'].filter((it) => !!it).join('/'));
  }, [estateUnitId, navigate]);
  const handleSplit = useCallback(() => {
    navigate(['/app/real-estate/estate-units', estateUnitId, 'split'].filter((it) => !!it).join('/'));
  }, [estateUnitId, navigate]);
  const handleTransform = useCallback(() => {
    navigate(['/app/real-estate/estate-units', estateUnitId, 'transform'].filter((it) => !!it).join('/'));
  }, [estateUnitId, navigate]);

  if (!permissions[RawFeature.ASST_ESTATEUNIT_VARIATION]) {
    return <></>;
  }

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
        <MenuItem disableGutters onClick={handleMerge}>
          <Typography variant="bodySm">{t('estate_unit.action.merge')}</Typography>
        </MenuItem>
        <MenuItem disableGutters onClick={handleSplit}>
          <Typography variant="bodySm">{t('estate_unit.action.split')}</Typography>
        </MenuItem>
        <MenuItem disableGutters onClick={handleTransform}>
          <Typography variant="bodySm">{t('estate_unit.action.transform')}</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};
