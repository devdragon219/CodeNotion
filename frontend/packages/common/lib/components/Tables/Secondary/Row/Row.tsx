import {
  DeleteTwoTone,
  EditTwoTone,
  FileDownloadTwoTone,
  FileOpenOutlined,
  KeyboardArrowDown,
  KeyboardArrowRight,
} from '@mui/icons-material';
import { IconButton, Stack, styled } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { parseDateToLocalizedString } from '../../../../utils/dateUtils';
import { isValidDate } from '../../../../utils/typeNarrowings/isValidDate';
import { SecondaryTableProps, SimpleRow } from '../Secondary.types';
import { SecondaryTableRowProps } from './Row.types';

const TableBodyCell = styled('td')<{
  hasChildren: boolean;
  isChildren: boolean;
  open: boolean;
  size: SecondaryTableProps['size'];
}>(({ hasChildren, isChildren, open, size, theme }) => ({
  ...(size === 'small' ? theme.typography.bodySm : theme.typography.bodyMd),
  backgroundColor: open
    ? theme.palette.grey[200]
    : isChildren
      ? theme.palette.grey[50]
      : theme.palette.background.default,
  color: theme.palette.grey[700],
  lineHeight: '20px',
  padding: hasChildren ? '8px 15px' : '10px 15px',
}));

export const SecondaryTableRow = ({
  index,
  level = 0,
  row,
  size,
  useActions,
  canRowDelete,
  canRowEdit,
  canRowDownload,
  onRowDelete,
  onRowEdit,
  onRowView,
  onRowDownload,
}: SecondaryTableRowProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const [open, setOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setOpen((open) => !open);
  }, []);

  const hasActions = useMemo(
    () => !!onRowDelete || !!onRowEdit || !!onRowView || !!onRowDownload,
    [onRowDelete, onRowEdit, onRowView, onRowDownload],
  );

  const getContent = useCallback(
    (cell: SimpleRow[number]) => {
      if (isValidDate(cell)) {
        return parseDateToLocalizedString(cell, language);
      }

      switch (typeof cell) {
        case 'boolean':
          return t(`common.text.${cell}`);
        default:
          return cell;
      }
    },
    [language, t],
  );

  return (
    <>
      <tr>
        {(Array.isArray(row) ? row : row.row).map((cell, index) => (
          <TableBodyCell key={index} hasChildren={!Array.isArray(row)} isChildren={level !== 0} open={open} size={size}>
            {!Array.isArray(row) && row.collapseColumnIndex === index ? (
              <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5 }}>
                {getContent(cell)}
                {!Array.isArray(row) && row.collapseColumnIndex === index && (
                  <IconButton size="small" onClick={toggleOpen} sx={{ p: 0 }}>
                    {open ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
                  </IconButton>
                )}
              </Stack>
            ) : (
              getContent(cell)
            )}
          </TableBodyCell>
        ))}
        {hasActions && (
          <TableBodyCell hasChildren={!Array.isArray(row)} isChildren={level !== 0} open={open} size={size}>
            {useActions && (
              <Stack direction="row" spacing={1}>
                {onRowDownload && (!canRowDownload || canRowDownload(index)) && (
                  <IconButton
                    onClick={() => {
                      onRowDownload(index);
                    }}
                  >
                    <FileDownloadTwoTone />
                  </IconButton>
                )}
                {onRowEdit && (!canRowEdit || canRowEdit(index)) && (
                  <IconButton
                    onClick={() => {
                      onRowEdit(index);
                    }}
                  >
                    <EditTwoTone />
                  </IconButton>
                )}
                {onRowDelete && (!canRowDelete || canRowDelete(index)) && (
                  <IconButton
                    onClick={() => {
                      onRowDelete(index);
                    }}
                  >
                    <DeleteTwoTone />
                  </IconButton>
                )}
                {onRowView && (
                  <IconButton
                    onClick={() => {
                      onRowView(index);
                    }}
                  >
                    <FileOpenOutlined />
                  </IconButton>
                )}
              </Stack>
            )}
          </TableBodyCell>
        )}
      </tr>
      {!Array.isArray(row) &&
        open &&
        row.children.map((row, index) => (
          <SecondaryTableRow
            key={index}
            index={index}
            level={level + 1}
            row={row}
            size={size}
            useActions={false}
            onRowDelete={onRowDelete}
            onRowEdit={onRowEdit}
          />
        ))}
    </>
  );
};
