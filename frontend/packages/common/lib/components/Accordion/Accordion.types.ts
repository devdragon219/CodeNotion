import { SvgIconComponent } from '@mui/icons-material';
import { ParseKeys } from 'i18next';
import { PropsWithChildren, ReactElement } from 'react';

export type AccordionProps = PropsWithChildren<{
  actions?: {
    icon?: SvgIconComponent;
    label: ParseKeys;
    onClick: () => void;
  }[];
  expanded?: boolean;
  icon?: ReactElement;
  title: string | ReactElement;
  subtitle?: string;
}>;
