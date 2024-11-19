import { DialogProps as MuiDialogProps } from '@mui/material';
import { ParseKeys } from 'i18next';
import { MouseEvent, PropsWithChildren, TouchEvent } from 'react';

interface BaseDialogProps extends Omit<MuiDialogProps, 'onClose'> {
  title?: ParseKeys;
  onClose: (event: MouseEvent | TouchEvent, reason: 'backdropClick' | 'closeClick' | 'escapeKeyDown') => void;
}

export type DialogProps = PropsWithChildren<BaseDialogProps>;
