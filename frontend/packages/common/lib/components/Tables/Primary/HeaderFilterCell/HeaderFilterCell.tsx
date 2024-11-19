import { Button, TableCell } from '@mui/material';
import { memo, useMemo } from 'react';
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';

import { Transition } from '../../../Transition/Transition';
import { TableInput } from '../Input/Input';
import { TableHeaderFilterCellProps } from './HeaderFilterCell.types';

const TableHeaderFilterCell = <T,>({
  areFiltersVisible,
  header,
  sx,
  onResetColumnFilters,
}: TableHeaderFilterCellProps<T>) => {
  const { t } = useTranslation();

  const label = useMemo(() => {
    switch (header.id) {
      case 'select':
        return <></>;
      case 'actions':
        return (
          <Transition type="collapse" in={areFiltersVisible} unmountOnExit>
            <Button
              color="secondary"
              size="small"
              variant="outlined"
              onClick={onResetColumnFilters}
              sx={{ whiteSpace: 'nowrap' }}
            >
              {t('common.component.table.reset_filters')}
            </Button>
          </Transition>
        );
      default: {
        const { multiple, options, type, useSortedOptions, getOptionLabel } = header.column.columnDef.meta ?? {};
        return (
          <>
            {header.column.getCanFilter() && (
              <Transition type="collapse" in={areFiltersVisible} unmountOnExit>
                <TableInput
                  clearable
                  debounceDelay={300}
                  multiple={multiple}
                  options={options}
                  type={type}
                  sx={{ flex: 1, px: 2, py: 1 }}
                  useSortedOptions={useSortedOptions}
                  value={header.column.getFilterValue() ?? null}
                  variant="header"
                  getOptionLabel={getOptionLabel}
                  onChange={header.column.setFilterValue}
                />
              </Transition>
            )}
          </>
        );
      }
    }
  }, [areFiltersVisible, header, t, onResetColumnFilters]);

  return (
    <TableCell
      colSpan={header.colSpan}
      sx={sx}
      style={{
        minWidth: header.getSize(),
        ...(header.column.getIsPinned() ? { width: header.getSize() } : {}),
      }}
    >
      {!header.isPlaceholder && label}
    </TableCell>
  );
};

const memoized = memo(TableHeaderFilterCell, isEqual) as typeof TableHeaderFilterCell;
export { memoized as TableHeaderFilterCell };
