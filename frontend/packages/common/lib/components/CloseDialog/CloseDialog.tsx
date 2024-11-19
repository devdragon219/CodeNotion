import { Warning } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { ConfirmationDialog } from '../ConfirmationDialog/ConfirmationDialog';
import { CloseDialogProps } from './CloseDialog.types';

export const CloseDialog = ({ canSave, onSave, onCancel, onClose }: CloseDialogProps) => {
  const { t } = useTranslation();

  return (
    <ConfirmationDialog
      open
      type="alert"
      icon={Warning}
      title={`common.dialog.close.title.${canSave ? 'working' : 'blocker'}`}
      description={`common.dialog.close.description.${canSave ? 'working' : 'blocker'}`}
      onClose={onCancel}
      actions={
        <>
          <Button color="secondary" onClick={onCancel}>
            {t('common.button.cancel')}
          </Button>
          {canSave ? (
            <>
              <Button color="destructive" onClick={onClose}>
                {t('common.button.delete')}
              </Button>
              <Button color="primary" onClick={onSave}>
                {t('common.dialog.close.action.working')}
              </Button>
            </>
          ) : (
            <Button color="primary" onClick={onClose}>
              {t('common.button.proceed')}
            </Button>
          )}
        </>
      }
    />
  );
};
