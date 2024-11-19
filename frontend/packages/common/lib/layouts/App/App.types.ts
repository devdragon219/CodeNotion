import { MenuGroup } from '../../interfaces/Menu';

export interface AppLayoutProps {
  menu: MenuGroup[];
  redirect: {
    login: string;
    notifications?: string;
    profile: string;
  };
  unsupportedFeatures?: string[];
}
