import { MenuItemLink } from '../../../interfaces/Menu';

export interface MenuListItemProps {
  drawerOpen: boolean;
  item: MenuItemLink;
  level: number;
  onClose?: () => void;
}
