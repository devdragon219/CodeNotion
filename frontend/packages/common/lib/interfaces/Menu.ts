import { SvgIconComponent } from '@mui/icons-material';
import { ParseKeys } from 'i18next';

interface BaseMenuItem {
  title: ParseKeys;
  caption?: ParseKeys;
}

export interface MenuItemGroup extends BaseMenuItem {
  type: 'group';
  url?: string;
  icon?: SvgIconComponent;
  children: MenuItem[];
  features?: string[];
}

export interface MenuItemLink extends BaseMenuItem {
  type: 'link';
  url: string;
  disabled?: boolean;
  external?: boolean;
  feature?: string;
  match?: 'complete' | 'partial';
}

export type MenuItem = MenuItemGroup | MenuItemLink;

export interface MenuGroup {
  title?: ParseKeys;
  caption?: ParseKeys;
  children: MenuItem[];
}
