import { MenuGroup } from '../../interfaces/Menu';

export interface HeaderProps {
  menu: MenuGroup[];
  redirect: {
    notifications?: string;
    profile: string;
  };
}
