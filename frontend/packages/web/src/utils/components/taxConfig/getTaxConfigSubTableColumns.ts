import { TableColumn } from '@realgimm5/frontend-common/interfaces';

import { ColumnFragment } from '../../../gql/RealGimm.Web.Column.fragment';
import { TaxConfigSubTableRowFragment } from '../../../gql/RealGimm.Web.TaxConfigSubTableRow.fragment';
import { getTaxConfigFieldLabel, getTaxConfigTableColumnType, getTaxConfigTableRowValue } from './taxConfigUtils';

export const getTaxConfigSubTableColumns = (columns: ColumnFragment[]): TableColumn<TaxConfigSubTableRowFragment>[] =>
  columns
    .filter(({ isVisibleInTable }) => isVisibleInTable)
    .map<TableColumn<TaxConfigSubTableRowFragment>>((column) => ({
      id: column.filterKey ?? column.code,
      type: getTaxConfigTableColumnType(column),
      label: getTaxConfigFieldLabel(column.code),
      getRowValue: (row) => getTaxConfigTableRowValue(column, row),
    }));
