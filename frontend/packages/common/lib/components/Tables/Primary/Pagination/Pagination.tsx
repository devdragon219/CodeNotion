import { TablePagination } from '@mui/material';
import { ParseKeys } from 'i18next';
import { memo, useCallback, useState } from 'react';
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';

import { DEFAULT_ROWS_PER_PAGE } from '../../../../configs/defaults';
import { parseSxPropsToArray } from '../../../../utils/muiUtils';
import { TablePaginationToolbarProps } from './Pagination.types';

const TablePaginationToolbar = ({
  count,
  page,
  rowsPerPage,
  rowsPerPageOptions = DEFAULT_ROWS_PER_PAGE,
  sx,
  onPageChange,
  onRowsPerPageChange,
}: TablePaginationToolbarProps) => {
  const { t } = useTranslation();
  const [width, setWidth] = useState(0);

  const handleRef = useCallback((el: HTMLDivElement | null) => {
    if (el) {
      setWidth(el.clientWidth);
    }
  }, []);

  return (
    <TablePagination
      rowsPerPageOptions={rowsPerPageOptions}
      component="div"
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
      getItemAriaLabel={(type) => t(`component.table.go_to_${type}_page` as ParseKeys)}
      labelDisplayedRows={({ from, to, count }) =>
        t('common.component.table.displayed_rows', {
          from,
          to,
          count,
        })
      }
      labelRowsPerPage={t('common.component.table.rows_per_page')}
      slotProps={{
        select: {
          slotProps: {
            input: {
              className: 'MuiInputBase-inputSizeLarge',
            },
          },
          MenuProps: {
            slotProps: { paper: { sx: { width }, variant: 'select' } },
          },
          ref: handleRef,
          size: 'large',
          sx: { ml: '10px', mr: '25px', width: '82px' },
          variant: 'outlined',
        },
      }}
      sx={[
        {
          '& .MuiToolbar-root': {
            py: 1,
            pl: 2,
            height: 44,
          },
          '& .MuiTablePagination-actions': {
            ml: '10px',
          },
        },
        ...parseSxPropsToArray(sx),
      ]}
    />
  );
};

const memoized = memo(TablePaginationToolbar, isEqual) as typeof TablePaginationToolbar;
export { memoized as TablePaginationToolbar };
