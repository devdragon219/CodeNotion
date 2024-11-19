import { SxProps, Theme } from '@mui/material';

import { NotificationItem } from '../../interfaces/NotificationItem';

export interface NotificationViewProps {
  notification: NotificationItem;
  readonly?: boolean;
  sx?: SxProps<Theme>;
}
