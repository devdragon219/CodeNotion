import { TextFieldProps } from '@mui/material';
import { ParseKeys } from 'i18next';
import { ReactNode } from 'react';

import { SelectOption } from '../../../interfaces/SelectOption';

export type SelectValue<Value, Multiple extends boolean | undefined = undefined> = Multiple extends true
  ? Value[]
  : Value | null;

export interface SelectFieldProps<Value, Multiple extends boolean | undefined = undefined>
  extends Omit<TextFieldProps, 'children' | 'multiline' | 'onChange' | 'select' | 'value'> {
  action?: {
    title: ParseKeys;
    onClick: () => void;
  };
  clearable?: boolean;
  columns?: {
    direction: 'column' | 'row';
    size: number;
  };
  max?: number;
  multiple?: Multiple;
  options: SelectOption<Value>[];
  readonly?: boolean;
  selectAll?: ParseKeys;
  useSortedOptions?: boolean;
  value?: SelectValue<Value, Multiple>;
  getOptionKey?: (option: Value) => string;
  getOptionLabel?: (option: Value) => string;
  onChange?: (value: SelectValue<Value, Multiple>) => void;
  renderValue?: (value: SelectValue<Value, Multiple>) => ReactNode;
}
