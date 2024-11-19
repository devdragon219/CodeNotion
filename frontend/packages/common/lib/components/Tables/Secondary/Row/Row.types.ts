import { Row, SecondaryTableProps } from '../Secondary.types';

export interface SecondaryTableRowProps extends Omit<SecondaryTableProps, 'columns' | 'rows' | 'sx' | 'onEdit'> {
  index: number;
  level?: number;
  row: Row;
  useActions?: boolean;
}
