/* eslint-disable no-restricted-imports */
import { CancelTwoTone } from '@mui/icons-material';
import { DialogContent, DialogTitle, IconButton, Dialog as MuiDialog, Typography } from '@mui/material';
import { MouseEvent, TouchEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { DialogProps } from './Dialog.types';

export const Dialog = ({ children, title, onClose, ...props }: DialogProps) => {
  const { t } = useTranslation();

  const handleClose = useCallback(
    (event: MouseEvent | TouchEvent) => {
      onClose(event, 'closeClick');
    },
    [onClose],
  );

  return (
    <MuiDialog onClose={onClose} {...props}>
      <DialogTitle component="div">
        <Typography variant="h2">{title && t(title)}</Typography>
        <IconButton onClick={handleClose}>
          <CancelTwoTone />
        </IconButton>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </MuiDialog>
  );
};
