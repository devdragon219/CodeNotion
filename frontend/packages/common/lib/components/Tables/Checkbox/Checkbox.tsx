import { Box, TableCell, styled } from '@mui/material';
import { Fragment, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { CheckboxTableGroupedRow, CheckboxTableProps } from './Checkbox.types';
import { TableOptions } from './Options/Options';

const Table = styled('table')({
  textAlign: 'left',
  width: '100%',
});

const TableHeadCell = styled('th')<{ size: CheckboxTableProps['size'] }>(({ size, theme }) => ({
  ...(size === 'small' ? theme.typography.bodySm : theme.typography.bodyMd),
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
  color: theme.palette.grey[700],
  fontWeight: 700,
  lineHeight: 'normal',
  padding: '9px 15px',
}));

const TableBodyCell = styled('td')<{ size: CheckboxTableProps['size'] }>(({ size, theme }) => ({
  ...(size === 'small' ? theme.typography.bodySm : theme.typography.bodyMd),
  color: theme.palette.grey[700],
  lineHeight: '20px',
  padding: '10px 15px',
}));

export const CheckboxTable = <
  Group extends string = string,
  Option extends string = string,
  Row extends string = string,
>({
  columns,
  options,
  rows,
  size = 'medium',
  sx,
  onChange,
  getRowLabel,
  getGroupLabel,
  getOptionLabel,
}: CheckboxTableProps<Group, Option, Row>) => {
  const { t } = useTranslation();

  const groupedRows = useMemo(
    () =>
      rows.reduce<CheckboxTableGroupedRow<Group, Option, Row>[]>((acc, curr) => {
        const currentGroupIndex = acc.findIndex((group) => group.groupName === curr.groupName);
        const newRow: CheckboxTableGroupedRow<Group, Option, Row>['groupRows'][number] = {
          rowName: curr.rowName,
          optionValues: curr.optionValues,
        };

        if (currentGroupIndex === -1) return [...acc, { groupName: curr.groupName, groupRows: [{ ...newRow }] }];

        const updatedRows = [...acc[currentGroupIndex].groupRows, { ...newRow }];

        return acc.map((group) =>
          group.groupName === curr.groupName ? { ...group, groupRows: [...updatedRows] } : { ...group },
        );
      }, []),
    [rows],
  );

  return (
    <Table sx={sx}>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <TableHeadCell key={index} size={size}>
              {t(column)}
            </TableHeadCell>
          ))}
        </tr>
      </thead>
      <tbody>
        {groupedRows.map(({ groupName, groupRows }, groupIndex) => (
          <Fragment key={groupIndex}>
            <tr>
              <TableBodyCell size={size}>{getGroupLabel ? getGroupLabel(groupName) : groupName}</TableBodyCell>
              <TableBodyCell size={size}>
                <TableOptions
                  options={options}
                  rows={rows}
                  groupName={groupName}
                  onChange={onChange}
                  getOptionLabel={getOptionLabel}
                />
              </TableBodyCell>
            </tr>
            <tr>
              <TableCell colSpan={2}>
                <Box
                  sx={(theme) => ({
                    borderBottom: `1px solid ${theme.palette.grey[300]}`,
                  })}
                />
              </TableCell>
            </tr>
            {groupRows.map(({ rowName }, rowIndex) => (
              <tr key={rowIndex}>
                <TableBodyCell size={size} sx={{ paddingLeft: 5 }}>
                  {getRowLabel ? getRowLabel(rowName) : rowName}
                </TableBodyCell>
                <TableBodyCell size={size}>
                  <TableOptions
                    options={options}
                    rows={rows}
                    groupName={groupName}
                    rowName={rowName}
                    onChange={onChange}
                    getOptionLabel={getOptionLabel}
                  />
                </TableBodyCell>
              </tr>
            ))}
            <tr>
              <TableCell colSpan={2}>
                <Box sx={{ pt: `20px` }} />
              </TableCell>
            </tr>
          </Fragment>
        ))}
      </tbody>
    </Table>
  );
};
