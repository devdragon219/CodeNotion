import { Warning } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useBlocker } from 'react-router-dom';

import { ConfirmationDialog } from '../ConfirmationDialog/ConfirmationDialog';
import { BlockerDialogProps } from './BlockerDialog.types';

export const BlockerDialog = ({ isBlocked, canSave, onSave }: BlockerDialogProps) => {
  const { t } = useTranslation();

  const { state, reset, proceed } = useBlocker(
    ({ currentLocation, nextLocation }) => isBlocked && currentLocation.pathname !== nextLocation.pathname,
  );

  const handleSave = useCallback(() => {
    onSave?.()
      .then(() => {
        return proceed?.();
      })
      .catch(() => {
        return reset?.();
      });
  }, [onSave, proceed, reset]);

  return state === 'blocked' ? (
    <ConfirmationDialog
      open
      type="alert"
      icon={Warning}
      title={`common.dialog.close.title.${canSave ? 'working' : 'blocker'}`}
      description={`common.dialog.close.description.${canSave ? 'working' : 'blocker'}`}
      onClose={reset}
      actions={
        <>
          <Button color="secondary" onClick={reset}>
            {t('common.button.cancel')}
          </Button>
          {canSave ? (
            <>
              <Button color="destructive" onClick={proceed}>
                {t('common.button.delete')}
              </Button>
              <Button color="primary" onClick={handleSave}>
                {t('common.dialog.close.action.working')}
              </Button>
            </>
          ) : (
            <Button color="primary" onClick={proceed}>
              {t('common.button.proceed')}
            </Button>
          )}
        </>
      }
    />
  ) : null;
};
