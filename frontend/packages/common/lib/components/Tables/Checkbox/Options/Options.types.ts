import { CheckboxTableRow } from '../Checkbox.types';

export interface TableOptionsProps<
  Group extends string = string,
  Option extends string = string,
  Row extends string = string,
> {
  groupName: Group;
  options: Option[];
  rows: CheckboxTableRow<Group, Option, Row>[];
  rowName?: Row;
  getOptionLabel?: (optionName: Option) => string;
  onChange: (updatedRows: CheckboxTableRow<Group, Option, Row>[]) => void;
}
