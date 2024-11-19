import { Box, Checkbox } from '@mui/material';
import { Fragment, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { TableOptionsProps } from './Options.types';

export const TableOptions = <
  Group extends string = string,
  Option extends string = string,
  Row extends string = string,
>({
  options,
  rows,
  groupName,
  rowName,
  onChange,
  getOptionLabel,
}: TableOptionsProps<Group, Option, Row>) => {
  const { t } = useTranslation();

  const isRowChecked = useMemo(
    () =>
      rows
        .filter((row) => row.groupName === groupName && row.rowName === rowName)
        .every((row) => Object.values(row.optionValues).every((optionValue) => optionValue)),
    [groupName, rowName, rows],
  );

  const isRowIndeterminate = useMemo(
    () =>
      !isRowChecked &&
      rows
        .filter((row) => row.groupName === groupName && row.rowName === rowName)
        .some((row) => Object.values(row.optionValues).some((optionValue) => optionValue)),
    [isRowChecked, groupName, rowName, rows],
  );

  const isColumnChecked = useCallback(
    (optionName: Option) =>
      rows.filter((row) => row.groupName === groupName).every((row) => row.optionValues[optionName]),
    [groupName, rows],
  );

  const isColumnIndeterminate = useCallback(
    (optionName: Option) =>
      !isColumnChecked(optionName) &&
      rows.filter((row) => row.groupName === groupName).some((row) => row.optionValues[optionName]),
    [isColumnChecked, groupName, rows],
  );

  const isGroupChecked = useMemo(
    () =>
      rows
        .filter((row) => row.groupName === groupName)
        .every((row) => Object.values(row.optionValues).every((optionValue) => optionValue)),
    [groupName, rows],
  );

  const isGroupIndeterminate = useMemo(
    () =>
      !isGroupChecked &&
      rows
        .filter((row) => row.groupName === groupName)
        .some((row) => Object.values(row.optionValues).some((optionValue) => optionValue)),
    [isGroupChecked, groupName, rows],
  );

  const toggleRow = useCallback(
    (groupName: Group, rowName: Row) => {
      const newValue = !isRowChecked;

      const updatedRows = rows.map((row) => {
        if (row.groupName === groupName && row.rowName === rowName) {
          return {
            ...row,
            optionValues: Object.keys(row.optionValues).reduce(
              (acc, key) => ({ ...acc, [key]: newValue }),
              // eslint-disable-next-line
              {} as (typeof row)['optionValues'],
            ),
          };
        }

        return row;
      });

      onChange(updatedRows);
    },
    [isRowChecked, rows, onChange],
  );

  const toggleColumn = useCallback(
    (groupName: Group, optionName: Option) => {
      const newValue = !isColumnChecked(optionName);

      const updatedRows = rows.map((row) => {
        if (row.groupName === groupName) {
          return {
            ...row,
            optionValues: {
              ...row.optionValues,
              [optionName]: newValue,
            },
          };
        }

        return row;
      });

      onChange(updatedRows);
    },
    [isColumnChecked, rows, onChange],
  );

  const toggleGroup = useCallback(
    (groupName: Group) => {
      const newValue = !isGroupChecked;

      const updatedRows = rows.map((row) => {
        if (row.groupName === groupName) {
          return {
            ...row,
            optionValues: Object.keys(row.optionValues).reduce(
              (acc, key) => ({ ...acc, [key]: newValue }),
              // eslint-disable-next-line
              {} as (typeof row)['optionValues'],
            ),
          };
        }

        return row;
      });

      onChange(updatedRows);
    },
    [isGroupChecked, rows, onChange],
  );

  const handleItemChange = useCallback(
    (groupName: Group, rowName?: Row, optionName?: Option) => {
      const shouldToggleColumn = rowName === undefined && optionName !== undefined;
      const shouldToggleRow = optionName === undefined && rowName !== undefined;
      const shouldToggleGroup = rowName === undefined && optionName === undefined;

      if (shouldToggleGroup) {
        toggleGroup(groupName);
        return;
      }
      if (shouldToggleRow) {
        toggleRow(groupName, rowName);
        return;
      }
      if (shouldToggleColumn) {
        toggleColumn(groupName, optionName);
        return;
      }

      if (!optionName) return;

      const updatedRows = rows.map((row) => {
        if (row.groupName === groupName && row.rowName === rowName)
          return { ...row, optionValues: { ...row.optionValues, [optionName]: !row.optionValues[optionName] } };

        return { ...row };
      });

      onChange(updatedRows);
    },
    [onChange, rows, toggleColumn, toggleGroup, toggleRow],
  );

  return (
    <>
      <Checkbox
        sx={{ padding: 0 }}
        onChange={() => {
          handleItemChange(groupName, rowName);
        }}
        checked={(rowName === undefined && isGroupChecked) || (rowName !== undefined && isRowChecked)}
        indeterminate={(rowName === undefined && isGroupIndeterminate) || (rowName !== undefined && isRowIndeterminate)}
      />
      <Box sx={{ display: 'inline-block', marginLeft: 1, marginRight: 2 }}>{t('common.text.all')}</Box>
      {options.map((option, optionIndex) => (
        <Fragment key={optionIndex}>
          <Checkbox
            sx={{ padding: 0 }}
            onChange={() => {
              handleItemChange(groupName, rowName, option);
            }}
            checked={
              ((rowName === undefined && isColumnChecked(option)) ||
                (rowName !== undefined && rows.find((row) => row.rowName === rowName)?.optionValues[option])) ??
              false
            }
            indeterminate={rowName === undefined && isColumnIndeterminate(option)}
          />
          <Box sx={{ display: 'inline-block', marginLeft: 1, marginRight: 2 }}>
            {getOptionLabel ? getOptionLabel(option) : option}
          </Box>
        </Fragment>
      ))}
    </>
  );
};
