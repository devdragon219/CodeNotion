import { EditTwoTone } from '@mui/icons-material';
import { Box, IconButton, styled } from '@mui/material';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { SecondaryTableEmptyRow } from './EmptyRow/EmptyRow';
import { SecondaryTableRow } from './Row/Row';
import { SecondaryTableProps } from './Secondary.types';

const Table = styled('table')({
  borderCollapse: 'collapse',
  textAlign: 'left',
  width: '100%',
});

const TableHeadCell = styled('th')<{ size: SecondaryTableProps['size'] }>(({ size, theme }) => ({
  ...(size === 'small' ? theme.typography.bodySm : theme.typography.bodyMd),
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
  color: theme.palette.grey[700],
  fontWeight: 700,
  lineHeight: 'normal',
  padding: '9px 15px',
}));

export const SecondaryTable = ({
  columns,
  empty,
  rows,
  size = 'medium',
  sx,
  onEdit,
  ...props
}: SecondaryTableProps) => {
  const { t } = useTranslation();

  const hasActions = useMemo(
    () => !!props.onRowDelete || !!props.onRowEdit || !!props.onRowView || !!props.onRowDownload,
    [props.onRowDelete, props.onRowEdit, props.onRowView, props.onRowDownload],
  );

  return (
    <Box
      sx={{
        overflowX: 'auto',
      }}
    >
      <Table sx={sx}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <TableHeadCell key={index} size={size}>
                {typeof column === 'string' ? t(column) : column}
              </TableHeadCell>
            ))}
            {hasActions && <TableHeadCell size={size}>{t('common.component.table.actions')}</TableHeadCell>}
            {onEdit && (
              <TableHeadCell size={size}>
                <IconButton
                  onClick={() => {
                    onEdit();
                  }}
                >
                  <EditTwoTone />
                </IconButton>
              </TableHeadCell>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <SecondaryTableEmptyRow colSpan={columns.length} empty={empty} />
          ) : (
            rows.map((row, index) => (
              <SecondaryTableRow key={index} {...props} index={index} row={row} size={size} useActions />
            ))
          )}
        </tbody>
      </Table>
    </Box>
  );
};
