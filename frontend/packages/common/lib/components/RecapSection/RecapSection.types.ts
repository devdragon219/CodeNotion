import { GridSize } from '@mui/material/Grid2';
import { ParseKeys } from 'i18next';
import { ReactElement, ReactNode } from 'react';

export type RecapSectionItemValue = boolean | Date | number | null | string | undefined;

export interface RecapSectionSimpleItem {
  grid?: GridSize;
  label: ParseKeys;
  value: RecapSectionItemValue;
}

export interface RecapSectionTableItem {
  columns: ParseKeys[];
  rows: RecapSectionItemValue[][];
}

export interface RecapSectionEmptyTableItem {
  label: ParseKeys;
}

export interface RecapSectionItem {
  grid?: GridSize;
  label?: ParseKeys;
  value:
    | RecapSectionItemValue
    | RecapSectionSimpleItem[]
    | RecapSectionTableItem
    | RecapSectionEmptyTableItem
    | ReactElement;
}

export interface RecapSectionProps {
  title: ParseKeys;
  items: RecapSectionItem[] | ReactNode;
  onEdit: () => void;
}
