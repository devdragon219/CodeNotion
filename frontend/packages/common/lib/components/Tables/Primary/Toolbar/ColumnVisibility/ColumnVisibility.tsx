import { memo, useMemo } from 'react';
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';

import { SelectField } from '../../../../Fields/Select/Select';
import { ToolbarColumnVisibilityProps } from './ColumnVisibility.types';

const ToolbarColumnVisibility = <T,>({
  columns,
  columnVisibility,
  onColumnVisibilityChange,
}: ToolbarColumnVisibilityProps<T>) => {
  const { t } = useTranslation();

  const columnOptions = useMemo(() => columns.filter(({ id }) => !['select', 'actions'].includes(id)), [columns]);

  return (
    <SelectField
      sx={{ width: 'auto' }}
      multiple
      selectAll="common.component.table.select_all_columns"
      options={columnOptions.map(({ id }) => id)}
      columns={{
        direction: 'column',
        size: columnOptions.length >= 8 ? 2 : 1,
      }}
      getOptionLabel={(column) => columns.find(({ id }) => id === column)?.columnDef.header?.toString() ?? column}
      value={Object.entries(columnVisibility)
        .filter(([, visible]) => visible)
        .map(([id]) => id)}
      onChange={(values) => {
        onColumnVisibilityChange(
          columns.reduce(
            (acc, column) => ({
              ...acc,
              [column.id]: ['select', 'actions', ...values].includes(column.id),
            }),
            {},
          ),
        );
      }}
      renderValue={(columns) => t('common.component.table.visible_columns', { count: columns.length - 2 })}
      useSortedOptions={false}
    />
  );
};

const memoized = memo(ToolbarColumnVisibility, isEqual) as typeof ToolbarColumnVisibility;
export { memoized as ToolbarColumnVisibility };
