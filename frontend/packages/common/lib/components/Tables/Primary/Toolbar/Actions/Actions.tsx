import { AddCircleOutline, CancelTwoTone, EditTwoTone, SaveAltRounded, SaveTwoTone } from '@mui/icons-material';
import { Button, ListItemIcon, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { memo, useCallback, useMemo, useRef, useState } from 'react';
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';

import { isOfType } from '../../../../../utils/typeNarrowings/isOfType';
import { TableMenuAdd } from '../../Primary.types';
import { ToolbarActionsProps } from './Actions.types';

const ToolbarActions = ({
  customTableActions,
  editing,
  onAdd,
  onCancel,
  onEdit,
  onExport,
  onSave,
}: ToolbarActionsProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const isMenuAdd = useCallback(
    (option: unknown): option is TableMenuAdd => isOfType<TableMenuAdd>(option, ['actions']),
    [],
  );

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const addButton = useMemo(() => {
    if (!onAdd) {
      return <></>;
    }

    if (Array.isArray(onAdd) || typeof onAdd === 'function') {
      const onClick = () => {
        if (Array.isArray(onAdd)) {
          setOpen(true);
        } else {
          onAdd();
        }
      };

      return (
        <Button
          ref={anchorRef}
          size="large"
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutline />}
          onClick={onClick}
        >
          {t('common.component.table.add')}
        </Button>
      );
    }

    const onClick = () => {
      if (isMenuAdd(onAdd)) {
        setOpen(true);
      } else {
        onAdd.onClick();
      }
    };

    return (
      <Button
        ref={anchorRef}
        size="large"
        variant="contained"
        color={onAdd.color ?? 'primary'}
        startIcon={onAdd.icon ?? <AddCircleOutline />}
        onClick={onClick}
      >
        {t(onAdd.label)}
      </Button>
    );
  }, [isMenuAdd, onAdd, t]);

  const handleClick = useCallback(
    (onClick: () => void) => () => {
      handleClose();
      onClick();
    },
    [handleClose],
  );

  const handleCustomAction = useCallback(
    (onClick: () => void) => () => {
      onClick();
    },
    [],
  );

  return (
    <Stack direction="row" spacing={1} sx={{ marginLeft: 'auto', width: 'max-content' }}>
      {Array.isArray(customTableActions)
        ? customTableActions.map(({ icon: Icon, id, label, onClick }) => (
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
          ))
        : customTableActions}
      {onExport && (
        <Button size="large" variant="contained" color="secondary" startIcon={<SaveAltRounded />} onClick={onExport}>
          {t('common.component.table.export')}
        </Button>
      )}
      {editing && (
        <>
          <Button size="large" variant="contained" color="tertiary" startIcon={<CancelTwoTone />} onClick={onCancel}>
            {t('common.component.table.cancel')}
          </Button>
          <Button size="large" variant="contained" color="tertiary" startIcon={<SaveTwoTone />} onClick={onSave}>
            {t('common.component.table.save')}
          </Button>
        </>
      )}
      {onEdit && !editing && (
        <Button size="large" variant="contained" color="secondary" startIcon={<EditTwoTone />} onClick={onEdit}>
          {t('common.component.table.edit')}
        </Button>
      )}
      {addButton}
      {onAdd && (Array.isArray(onAdd) || isMenuAdd(onAdd)) && (
        <Menu anchorEl={anchorRef.current} open={open} onClose={handleClose} variant="selectedMenu">
          {(Array.isArray(onAdd) ? onAdd : onAdd.actions).map(({ icon, label, onClick }, index) => (
            <MenuItem key={index} disableGutters onClick={handleClick(onClick)}>
              {icon && <ListItemIcon>{icon}</ListItemIcon>}
              <Typography variant="bodySm">{t(label)}</Typography>
            </MenuItem>
          ))}
        </Menu>
      )}
    </Stack>
  );
};

const memoized = memo(ToolbarActions, isEqual) as typeof ToolbarActions;
export { memoized as ToolbarActions };
