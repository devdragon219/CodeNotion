import { MenuGroup } from '../../interfaces/Menu';

export interface SidebarProps {
  menu: MenuGroup[];
  open: boolean;
  unsupportedFeatures?: string[];
  onClose: () => void;
}
