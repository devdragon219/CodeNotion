import { TableCell, TableRow, Typography } from '@mui/material';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { PrimaryTableEmptyRowProps } from './EmptyRow.types';

const PrimaryTableEmptyRow = ({ colSpan, empty }: PrimaryTableEmptyRowProps) => {
  const { t } = useTranslation();

  return (
    <TableRow className="MuiTableRow-empty">
      <TableCell colSpan={colSpan} padding="none" sx={{ border: 'none', height: '114px', textAlign: 'center' }}>
        <Typography variant="h5" sx={(theme) => ({ color: theme.palette.grey[700] })}>
          {t(empty ?? 'common.component.table.empty')}
        </Typography>
      </TableCell>
    </TableRow>
  );
};

const memoized = memo(PrimaryTableEmptyRow);
export { memoized as PrimaryTableEmptyRow };
