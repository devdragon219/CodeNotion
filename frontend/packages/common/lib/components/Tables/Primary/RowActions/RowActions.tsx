import {
  DeleteOutline,
  DeleteTwoTone,
  EditOutlined,
  EditTwoTone,
  FileDownloadOutlined,
  MoreHorizOutlined,
  SaveAltRounded,
} from '@mui/icons-material';
import { Box, Button, IconButton, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material';
import { MouseEvent, memo, useCallback, useMemo, useState } from 'react';
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';

import { TableRowActionsProps } from './RowActions.types';

const TableRowActions = <T,>({
  cell,
  customRowActions,
  variant = 'menu',
  hideRowActions,
  onDelete,
  onEdit,
  onExport,
}: TableRowActionsProps<T>) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const handleOpen = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  }, []);
  const handleClose = useCallback((event: MouseEvent) => {
    event.stopPropagation();
    setAnchorEl(null);
  }, []);

  const canPerformAction = useCallback(
    (action: string) => {
      if (!hideRowActions) return true;
      const result = hideRowActions(cell.row.original);
      if (!result) return true;
      if (Array.isArray(result)) return !result.includes(action);
      return result !== action;
    },
    [cell, hideRowActions],
  );

  const customActionsToRender = useMemo(
    () => customRowActions.filter(({ id }) => canPerformAction(id)),
    [canPerformAction, customRowActions],
  );

  const handleCustomAction = useCallback(
    (onClick: (row: T) => void) => (event: MouseEvent) => {
      handleClose(event);
      onClick(cell.row.original);
    },
    [handleClose, cell.row.original],
  );

  const handleDelete = useMemo(() => {
    if (!onDelete || !canPerformAction('delete')) {
      return undefined;
    }
    return (event: MouseEvent) => {
      handleClose(event);
      onDelete(cell.row.original);
    };
  }, [onDelete, canPerformAction, cell.row.original, handleClose]);

  const handleEdit = useMemo(() => {
    if (!onEdit || !canPerformAction('edit')) {
      return undefined;
    }
    return (event: MouseEvent) => {
      handleClose(event);
      onEdit(cell.row.original);
    };
  }, [onEdit, canPerformAction, handleClose, cell.row.original]);

  const handleExport = useMemo(() => {
    if (!onExport || !canPerformAction('export')) {
      return undefined;
    }
    return (event: MouseEvent) => {
      handleClose(event);
      onExport(cell.row.original);
    };
  }, [onExport, canPerformAction, handleClose, cell.row.original]);

  const actions = useMemo(() => {
    if (hideRowActions?.(cell.row.original) === true) {
      return <></>;
    }

    switch (variant) {
      case 'inline':
        return (
          <Box sx={{ display: 'flex', gap: 1 }}>
            {customActionsToRender.map(({ icon: Icon, id, label, onClick }) =>
              Icon ? (
                <IconButton key={id} size="small" onClick={handleCustomAction(onClick)}>
                  <Icon sx={(theme) => ({ color: theme.palette.grey[700] })} />
                </IconButton>
              ) : (
                <Button
                  key={id}
                  color="secondary"
                  size="small"
                  variant="contained"
                  onClick={handleCustomAction(onClick)}
                >
                  {t(label)}
                </Button>
              ),
            )}
            {handleEdit && (
              <IconButton size="small" onClick={handleEdit}>
                <EditTwoTone sx={(theme) => ({ color: theme.palette.grey[700] })} />
              </IconButton>
            )}
            {handleDelete && (
              <IconButton size="small" onClick={handleDelete}>
                <DeleteTwoTone sx={(theme) => ({ color: theme.palette.grey[700] })} />
              </IconButton>
            )}
            {handleExport && (
              <IconButton size="small" onClick={handleExport}>
                <SaveAltRounded sx={(theme) => ({ color: theme.palette.grey[700] })} />
              </IconButton>
            )}
          </Box>
        );
      case 'menu':
        return (
          <IconButton size="small" onClick={handleOpen}>
            <MoreHorizOutlined sx={(theme) => ({ color: theme.palette.grey[700] })} />
          </IconButton>
        );
    }
  }, [
    hideRowActions,
    cell.row.original,
    variant,
    customActionsToRender,
    handleEdit,
    handleDelete,
    handleExport,
    handleOpen,
    handleCustomAction,
    t,
  ]);

  return (
    <>
      {!cell.row.getCanMultiSelect() && (
        <Button
          color="secondary"
          size="small"
          variant={cell.row.getIsSelected() ? 'outlined' : 'contained'}
          onClick={cell.row.getToggleSelectedHandler()}
          disabled={cell.getContext().table.getIsSomeRowsSelected() && !cell.row.getIsSelected()}
        >
          {t(`common.component.table.${cell.row.getIsSelected() ? 'unselect' : 'select'}`)}
        </Button>
      )}
      {(customActionsToRender.length !== 0 || handleEdit || handleDelete || handleExport) && actions}
      {anchorEl && (
        <Menu anchorEl={anchorEl} open onClose={handleClose} variant="selectedMenu">
          {[
            ...customActionsToRender.map(({ icon: Icon, id, label, onClick }) => (
              <MenuItem key={id} disableGutters onClick={handleCustomAction(onClick)}>
                {Icon && (
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                )}
                <Typography variant="bodySm">{t(label)}</Typography>
              </MenuItem>
            )),
            handleEdit && (
              <MenuItem key="edit" disableGutters onClick={handleEdit}>
                <ListItemIcon>
                  <EditOutlined />
                </ListItemIcon>
                <Typography variant="bodySm">{t('common.component.table.edit')}</Typography>
              </MenuItem>
            ),
            handleDelete && (
              <MenuItem key="delete" disableGutters onClick={handleDelete}>
                <ListItemIcon>
                  <DeleteOutline />
                </ListItemIcon>
                <Typography variant="bodySm">{t('common.component.table.delete')}</Typography>
              </MenuItem>
            ),
            handleExport && (
              <MenuItem key="export" disableGutters onClick={handleExport}>
                <ListItemIcon>
                  <FileDownloadOutlined />
                </ListItemIcon>
                <Typography variant="bodySm">{t('common.component.table.export')}</Typography>
              </MenuItem>
            ),
          ]}
        </Menu>
      )}
    </>
  );
};

const memoized = memo(TableRowActions, isEqual) as typeof TableRowActions;
export { memoized as TableRowActions };
