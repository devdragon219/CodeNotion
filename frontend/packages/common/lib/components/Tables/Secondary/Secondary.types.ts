import { SxProps, Theme } from '@mui/material';
import { ParseKeys } from 'i18next';
import { ReactElement } from 'react';

export type SimpleRow = (boolean | Date | number | string | ReactElement | undefined | null)[];
interface CollapsibleRow {
  children: (SimpleRow | CollapsibleRow)[];
  collapseColumnIndex: number;
  row: SimpleRow;
}
export type Row = SimpleRow | CollapsibleRow;

export interface SecondaryTableProps {
  columns: (ParseKeys | ReactElement)[];
  empty?: ParseKeys;
  rows: Row[];
  size?: 'small' | 'medium';
  sx?: SxProps<Theme>;
  canRowDelete?: (index: number) => boolean;
  canRowEdit?: (index: number) => boolean;
  canRowDownload?: (index: number) => boolean;
  onRowDelete?: (index: number) => void;
  onRowEdit?: (index: number) => void;
  onRowDownload?: (index: number) => void;
  onRowView?: (index: number) => void;
  onEdit?: () => void;
}
