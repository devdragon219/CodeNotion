import { MenuItemGroup } from '../../../interfaces/Menu';

export interface MenuListItemGroupProps {
  drawerOpen: boolean;
  item: MenuItemGroup;
  level: number;
  onClose?: () => void;
}
