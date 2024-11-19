import { SxProps, Theme } from '@mui/material';
import { ParseKeys } from 'i18next';
import { ReactElement } from 'react';

export interface SectionTitleProps {
  actions?: ReactElement;
  sx?: SxProps<Theme>;
  value: ParseKeys;
}
