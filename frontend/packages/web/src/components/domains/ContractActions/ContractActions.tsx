import { Button, Menu, MenuItem, Typography } from '@mui/material';
import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ContractActionsProps } from './ContractActions.types';

export const ContractActions = ({
  isContractActive,
  isContractPaused,
  onBillingPause,
  onContractRelease,
  onCounterpartVariation,
  onContractVariation,
}: ContractActionsProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOnBillingPause = useCallback(() => {
    onBillingPause?.();
    handleClose();
  }, [onBillingPause, handleClose]);

  const handleOnContractRelease = useCallback(() => {
    onContractRelease?.();
    handleClose();
  }, [onContractRelease, handleClose]);

  const handleOnCounterpartVariation = useCallback(() => {
    onCounterpartVariation?.();
    handleClose();
  }, [onCounterpartVariation, handleClose]);

  const handleOnContractVariation = useCallback(() => {
    onContractVariation?.();
    handleClose();
  }, [onContractVariation, handleClose]);

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
        {onBillingPause && (
          <MenuItem disableGutters onClick={handleOnBillingPause}>
            <Typography variant="bodySm">
              {t(`contract.action.${isContractPaused ? 'resume' : 'pause'}_billing`)}
            </Typography>
          </MenuItem>
        )}
        {onContractRelease && (
          <MenuItem disableGutters onClick={handleOnContractRelease}>
            <Typography variant="bodySm">{t('contract.action.release_contract')}</Typography>
          </MenuItem>
        )}
        {onCounterpartVariation && (
          <MenuItem disableGutters onClick={handleOnCounterpartVariation}>
            <Typography variant="bodySm">
              {t(`contract.action.counterparts_${isContractActive ? 'tenant' : 'landlord'}_variation`)}
            </Typography>
          </MenuItem>
        )}
        {onContractVariation && (
          <MenuItem disableGutters onClick={handleOnContractVariation}>
            <Typography variant="bodySm">
              {t(`contract.action.contract_${isContractActive ? 'landlord' : 'tenant'}_variation`)}
            </Typography>
          </MenuItem>
        )}
      </Menu>
    </>
  );
};
