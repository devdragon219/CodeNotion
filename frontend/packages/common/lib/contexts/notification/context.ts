import { createContext } from 'react';

import { NotificationContextProps } from './types';

const NotificationContext = createContext<NotificationContextProps | null>(null);
NotificationContext.displayName = 'Notification Context';

export { NotificationContext };
