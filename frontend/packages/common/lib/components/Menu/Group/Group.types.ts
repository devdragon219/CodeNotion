import { MenuGroup } from '../../../interfaces/Menu';

export interface MenuListGroupProps {
  drawerOpen: boolean;
  group: MenuGroup;
  onClose?: () => void;
}
