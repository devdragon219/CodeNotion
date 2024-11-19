import { DeleteTwoTone, SaveAltRounded } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';
import { memo, useCallback } from 'react';
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';

import { DEFAULT_BORDER_RADIUS } from '../../../../../configs/defaults';
import { ToolbarRowSelectionProps } from './RowSelection.types';

const ToolbarRowSelection = <T,>({
  customRowsActions,
  selectedRows,
  onDelete,
  onExport,
}: ToolbarRowSelectionProps<T>) => {
  const { t } = useTranslation();

  const handleCustomAction = useCallback(
    (onClick: (rows: T[]) => void) => () => {
      onClick(selectedRows);
    },
    [selectedRows],
  );

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={(theme) => ({
        alignItems: 'center',
        backgroundColor: theme.palette.blue[50],
        borderRadius: `${DEFAULT_BORDER_RADIUS}px`,
        padding: '5px 15px',
        width: 'max-content',
        [theme.breakpoints.down('sm')]: {
          width: '100%',
        },
      })}
    >
      <Typography
        sx={(theme) => ({ color: theme.palette.grey[700], mr: onDelete || onExport ? '4px' : 0 })}
        variant="bodyMd"
      >
        {t('common.component.table.rows_selected', { count: selectedRows.length })}
      </Typography>
      {customRowsActions.map(({ icon: Icon, id, label, onClick }) => (
        <Button
          key={id}
          size="large"
          variant="contained"
          color="secondary"
          startIcon={Icon && <Icon />}
          onClick={handleCustomAction(onClick)}
        >
          {t(label)}
        </Button>
      ))}
      {onExport && (
        <Button size="large" variant="contained" color="secondary" startIcon={<SaveAltRounded />} onClick={onExport}>
          {t('common.component.table.export')}
        </Button>
      )}
      {onDelete && (
        <Button size="large" variant="contained" color="secondary" startIcon={<DeleteTwoTone />} onClick={onDelete}>
          {t('common.component.table.delete')}
        </Button>
      )}
    </Stack>
  );
};

const memoized = memo(ToolbarRowSelection, isEqual) as typeof ToolbarRowSelection;
export { memoized as ToolbarRowSelection };
