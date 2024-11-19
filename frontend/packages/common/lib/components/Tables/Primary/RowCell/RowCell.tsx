import { KeyboardArrowDown, KeyboardArrowRight } from '@mui/icons-material';
import { IconButton, Stack, TableCell, Theme } from '@mui/material';
import { Row } from '@tanstack/react-table';
import { MouseEvent, memo, useCallback, useMemo } from 'react';
import isEqual from 'react-fast-compare';

import { parseSxPropsToArray } from '../../../../utils/muiUtils';
import { CheckboxField } from '../../../Fields/Checkbox/Checkbox';
import { TableInput } from '../Input/Input';
import { TableRowActions } from '../RowActions/RowActions';
import { TableRowCellProps } from './RowCell.types';

const TableRowCell = <T,>({
  actionsVariant = 'menu',
  cell,
  color = 'primary',
  customRowActions,
  editing,
  sx,
  value,
  getRowStyle,
  hideRowActions,
  onChange,
  onDelete,
  onEdit,
  onExport,
}: TableRowCellProps<T>) => {
  const handleChange = useCallback(
    (value: unknown) => {
      onChange(cell.row.index, cell.column.id, value);
    },
    [onChange, cell.row.index, cell.column.id],
  );

  const handleToggleExpanded = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      cell.row.toggleExpanded();
    },
    [cell.row],
  );

  const handleToggleSelected = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();

      const checked = !cell.row.getIsSelected();
      cell.row.toggleSelected(checked);

      const toggleChildrenRows = (row: Row<T>) => {
        row.subRows.forEach((row) => {
          row.toggleSelected(checked);
          toggleChildrenRows(row);
        });
      };
      toggleChildrenRows(cell.row);

      const toggleParentRow = (row: Row<T>, rowSelection: Record<string, boolean>) => {
        const parentRow = row.getParentRow();
        if (!parentRow) return;

        const selection = {
          ...parentRow.subRows.reduce<Record<string, boolean>>(
            (acc, row) => ({
              ...acc,
              [row.id]: row.getIsSelected(),
            }),
            {},
          ),
          ...rowSelection,
        };

        const selected = parentRow.subRows.every(({ id }) => selection[id]) ? checked : false;
        parentRow.toggleSelected(selected);

        toggleParentRow(parentRow, {
          ...selection,
          [parentRow.id]: selected,
        });
      };
      toggleParentRow(cell.row, {
        [cell.row.id]: checked,
      });
    },
    [cell.row],
  );

  const content = useMemo(() => {
    switch (cell.column.id) {
      case 'select':
        return (
          <CheckboxField
            checked={cell.row.getIsSelected()}
            disabled={!cell.row.getCanSelect()}
            onChange={cell.row.getToggleSelectedHandler()}
            onClick={(e) => {
              e.stopPropagation();
            }}
            sx={{ m: '-9px' }}
          />
        );
      case 'actions':
        return (
          <TableRowActions
            cell={cell}
            customRowActions={customRowActions}
            variant={actionsVariant}
            hideRowActions={hideRowActions}
            onDelete={onDelete}
            onEdit={onEdit}
            onExport={onExport}
          />
        );
      default: {
        const {
          multiple,
          options,
          schema,
          type,
          useRowValue,
          useSortedOptions,
          getCanExpand,
          getCanSelect,
          getOptionLabel,
        } = cell.column.columnDef.meta ?? {};
        const canSelect = getCanSelect?.(cell.row.depth);
        const canExpand = getCanExpand?.(cell.row.depth);
        const content =
          typeof value === 'function' || useRowValue ? (
            <>{value}</>
          ) : (
            <TableInput
              multiple={multiple}
              options={options}
              readonly={!editing}
              schema={schema}
              type={type}
              useSortedOptions={useSortedOptions}
              value={value}
              variant="row"
              getOptionLabel={getOptionLabel}
              onChange={handleChange}
            />
          );

        if (!canSelect && !canExpand) return content;

        return (
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            {canSelect && (
              <CheckboxField
                checked={cell.row.getIsSelected()}
                indeterminate={cell.row.getIsSomeSelected()}
                onClick={handleToggleSelected}
                sx={{ m: '-9px 0 -9px -9px !important', flex: '0 0 auto' }}
              />
            )}
            {content}
            {canExpand && (
              <IconButton size="small" onClick={handleToggleExpanded} sx={{ p: 0 }}>
                {cell.row.getIsExpanded() ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
              </IconButton>
            )}
          </Stack>
        );
      }
    }
  }, [
    cell,
    handleToggleSelected,
    customRowActions,
    actionsVariant,
    hideRowActions,
    onDelete,
    onEdit,
    onExport,
    value,
    editing,
    handleChange,
    handleToggleExpanded,
  ]);

  return (
    <TableCell
      className={color}
      sx={[
        ...parseSxPropsToArray(sx),
        ...(getRowStyle ? [(theme: Theme) => getRowStyle(cell.row.original, theme)] : []),
      ]}
      style={{
        minWidth: cell.column.getSize(),
        ...(cell.column.getIsPinned() ? { width: cell.column.getSize() } : {}),
      }}
    >
      {content}
    </TableCell>
  );
};

const memoized = memo(TableRowCell, isEqual) as typeof TableRowCell;
export { memoized as TableRowCell };
