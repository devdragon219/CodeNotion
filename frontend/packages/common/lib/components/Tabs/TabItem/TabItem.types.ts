import { TabProps as MuiTabProps } from '@mui/material';
import { ParseKeys } from 'i18next';

export interface TabItemProps extends Omit<MuiTabProps, 'label'> {
  error?: boolean;
  index: number;
  label: ParseKeys;
  selected: boolean;
}
