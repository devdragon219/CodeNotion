import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { ReactElement } from 'react';

import { ColumnFragment } from '../../../gql/RealGimm.Web.Column.fragment';
import { TableFragment } from '../../../gql/RealGimm.Web.Table.fragment';
import { TaxConfigMainTableRowFragment } from '../../../gql/RealGimm.Web.TaxConfigMainTableRow.fragment';
import { getTaxConfigFieldLabel, getTaxConfigTableColumnType, getTaxConfigTableRowValue } from './taxConfigUtils';

export const getTaxConfigMainTableColumns = (
  columns: ColumnFragment[],
  subTables: TableFragment[],
  showAll: (row: TaxConfigMainTableRowFragment, subTable: TableFragment) => ReactElement,
): TableColumn<TaxConfigMainTableRowFragment>[] => [
  ...columns
    .filter(({ isVisibleInTable }) => isVisibleInTable)
    .map<TableColumn<TaxConfigMainTableRowFragment>>((column) => ({
      id: column.filterKey ?? column.code,
      type: getTaxConfigTableColumnType(column),
      label: getTaxConfigFieldLabel(column.code),
      enableColumnFilter: !!column.filterKey,
      enableSorting: !!column.filterKey,
      getRowValue: (row) => getTaxConfigTableRowValue(column, row),
    })),
  ...subTables.map<TableColumn<TaxConfigMainTableRowFragment>>((subTable) => ({
    id: subTable.code,
    label: getTaxConfigFieldLabel(subTable.code),
    getRowValue: (row) => showAll(row, subTable),
  })),
];
