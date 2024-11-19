import { ParseKeys } from 'i18next';
import { ForwardedRef } from 'react';

import { PrimaryTableProps, TableSingleAdd } from '../Tables/Primary/Primary.types';

export interface TransferListProps<T> extends Pick<PrimaryTableProps<T>, 'columns' | 'rows' | 'getRowId'> {
  empty?: ParseKeys;
  fixedValues?: T[];
  ref?: ForwardedRef<HTMLDivElement>;
  titles?: {
    left?: ParseKeys;
    right?: ParseKeys;
  };
  value: T[];
  onAdd?: TableSingleAdd;
  onChange: (value: T[]) => void;
  onLoadMore?: () => void;
}
