import { PropsWithChildren, useCallback, useState } from 'react';

import { DEFAULT_DRAWER_TRANSITION_MS } from '../../configs/defaults';
import { SidebarContext } from './context';

export const SidebarProvider = ({ children }: PropsWithChildren) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const handleToggleSidebar = useCallback((status?: boolean, callback?: () => void) => {
    setSidebarOpen((isSidebarOpen) => status ?? !isSidebarOpen);
    if (callback) {
      setTimeout(callback, DEFAULT_DRAWER_TRANSITION_MS);
    }
  }, []);

  return <SidebarContext.Provider value={{ isSidebarOpen, handleToggleSidebar }}>{children}</SidebarContext.Provider>;
};
