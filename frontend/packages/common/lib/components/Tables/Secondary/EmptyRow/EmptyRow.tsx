import { Typography, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { SecondaryTableEmptyRowProps } from './EmptyRow.types';

const TableBodyCell = styled('td')({
  border: 'none',
  height: '114px',
  padding: '0',
  textAlign: 'center',
});

export const SecondaryTableEmptyRow = ({ colSpan, empty }: SecondaryTableEmptyRowProps) => {
  const { t } = useTranslation();

  return (
    <tr>
      <TableBodyCell colSpan={colSpan}>
        <Typography variant="h5" sx={(theme) => ({ color: theme.palette.grey[700] })}>
          {t(empty ?? 'common.component.table.empty')}
        </Typography>
      </TableBodyCell>
    </tr>
  );
};
