import { TabProps } from '@mui/material';
import { ParseKeys } from 'i18next';
import { PropsWithChildren } from 'react';

export type Tab = PropsWithChildren<{
  error?: boolean;
  icon?: TabProps['icon'];
  iconPosition?: TabProps['iconPosition'];
  label: ParseKeys;
}>;

export interface TabsProps {
  initialTab?: number;
  tabs: Tab[];
  onChange?: (index: number) => void;
}
