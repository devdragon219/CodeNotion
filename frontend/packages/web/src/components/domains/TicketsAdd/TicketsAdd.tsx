import { AddCircleOutline } from '@mui/icons-material';
import { Button, Menu, MenuItem, Typography } from '@mui/material';
import { TicketMainType } from '@realgimm5/frontend-common/gql/types';
import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { TicketsAddProps } from './TicketsAdd.types';

export const TicketsAdd = ({ onAdd }: TicketsAddProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleAdd = useCallback(
    (mainType: TicketMainType) => () => {
      onAdd(mainType);
      handleClose();
    },
    [handleClose, onAdd],
  );

  return (
    <>
      <Button
        ref={anchorRef}
        size="large"
        variant="contained"
        color="primary"
        startIcon={<AddCircleOutline />}
        onClick={handleOpen}
      >
        {t('common.button.add')}
      </Button>
      <Menu anchorEl={anchorRef.current} open={open} onClose={handleClose} variant="selectedMenu">
        <MenuItem disableGutters onClick={handleAdd(TicketMainType.Issue)}>
          <Typography variant="bodySm">{t('ticket.action.add_single_ticket')}</Typography>
        </MenuItem>
        <MenuItem disableGutters onClick={handleAdd(TicketMainType.ChecklistOnTriggerCondition)}>
          <Typography variant="bodySm">{t('ticket.action.add_maintenance_on_condition')}</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};
