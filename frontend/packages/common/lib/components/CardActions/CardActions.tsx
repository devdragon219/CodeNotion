import { CancelOutlined, CheckCircleOutline, DeleteTwoTone, EditTwoTone, SaveAltRounded } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { CardActionsProps } from './CardActions.types';

export const CardActions = ({
  editProps,
  leftActions,
  readonly,
  rightActions,
  onCancel,
  onDelete,
  onEdit,
  onExport,
  onSave,
}: CardActionsProps) => {
  const { t } = useTranslation();

  return (
    <Stack direction="row" spacing={1}>
      {leftActions}
      {onDelete && (
        <Button size="large" variant="contained" color="secondary" startIcon={<DeleteTwoTone />} onClick={onDelete}>
          {t('common.button.delete')}
        </Button>
      )}
      {onExport && (
        <Button size="large" variant="contained" color="secondary" startIcon={<SaveAltRounded />} onClick={onExport}>
          {t('common.button.export')}
        </Button>
      )}
      {onEdit && !readonly && (
        <>
          <Button size="large" variant="contained" color="tertiary" startIcon={<CancelOutlined />} onClick={onCancel}>
            {t('common.button.cancel')}
          </Button>
          <Button
            size="large"
            variant="contained"
            color="tertiary"
            startIcon={<CheckCircleOutline />}
            onClick={onSave}
            type={onSave ? 'button' : 'submit'}
          >
            {t('common.button.save')}
          </Button>
        </>
      )}
      {onEdit && readonly && (
        <Button
          size="large"
          variant={editProps?.variant ?? 'contained'}
          color={editProps?.color ?? 'primary'}
          startIcon={<EditTwoTone />}
          onClick={onEdit}
        >
          {t(editProps?.label ?? 'common.button.edit')}
        </Button>
      )}
      {rightActions}
    </Stack>
  );
};
