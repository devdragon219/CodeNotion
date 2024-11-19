import { ReactElement } from 'react';

import { NotificationStatus } from '../gql/types';

export interface NotificationItem {
  description: string;
  downloadUrl?: string;
  icon: ReactElement;
  id: number;
  status: NotificationStatus;
  timestamp: string;
  title: string;
  url?: string;
  username: string;
}
