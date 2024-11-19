import { SvgIconComponent } from '@mui/icons-material';
import { ParseKeys } from 'i18next';
import { PropsWithChildren, ReactElement } from 'react';

import { DialogProps } from '../Dialog/Dialog.types';

export type ConfirmationDialogProps = Omit<DialogProps, 'actions' | 'children' | 'title'> &
  PropsWithChildren<{
    type?: 'danger' | 'alert';
    icon: SvgIconComponent;
    title: ParseKeys;
    description?: ParseKeys;
    actions: ReactElement;
  }>;
