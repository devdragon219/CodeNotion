export interface SidebarContextProps {
  isSidebarOpen: boolean;
  handleToggleSidebar: (status?: boolean, callback?: () => void) => void;
}
