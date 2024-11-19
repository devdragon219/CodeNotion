import { MenuGroup } from '../../interfaces/Menu';

export interface MenuProps {
  items: MenuGroup[];
  open: boolean;
  onClose?: () => void;
}
