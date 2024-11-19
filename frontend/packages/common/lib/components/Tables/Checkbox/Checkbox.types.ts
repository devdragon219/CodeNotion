import { SxProps, Theme } from '@mui/material';
import { ParseKeys } from 'i18next';

export interface CheckboxTableGroupedRow<
  Group extends string = string,
  Option extends string = string,
  Row extends string = string,
> {
  groupName: Group;
  groupRows: { rowName: Row; optionValues: CheckboxTableOptions<Option> }[];
}

export type CheckboxTableOptions<Option extends string = string> = Record<Option, boolean>;

export interface CheckboxTableRow<
  Group extends string = string,
  Option extends string = string,
  Row extends string = string,
> {
  groupName: Group;
  rowName: Row;
  optionValues: CheckboxTableOptions<Option>;
}

export interface CheckboxTableProps<
  Group extends string = string,
  Option extends string = string,
  Row extends string = string,
> {
  columns: [ParseKeys, ParseKeys];
  options: Option[];
  rows: CheckboxTableRow<Group, Option, Row>[];
  size?: 'small' | 'medium';
  sx?: SxProps<Theme>;
  getGroupLabel?: (groupName: Group) => string;
  getOptionLabel?: (optionName: Option) => string;
  getRowLabel?: (rowName: Row) => string;
  onChange: (updatedRows: CheckboxTableRow<Group, Option, Row>[]) => void;
}
