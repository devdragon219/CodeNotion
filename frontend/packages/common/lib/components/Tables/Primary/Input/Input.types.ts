import { SxProps, Theme } from '@mui/material';
import { Schema } from 'yup';

export interface TableInputProps {
  clearable?: boolean;
  debounceDelay?: number;
  disabled?: boolean;
  multiple?: boolean;
  options?: unknown[];
  readonly?: boolean;
  schema?: Schema;
  sx?: SxProps<Theme>;
  type?: 'boolean' | 'currency' | 'date' | 'number';
  useSortedOptions?: boolean;
  value?: unknown;
  variant: 'header' | 'row';
  getOptionLabel?: (option: unknown) => string;
  onChange: (value: unknown) => void;
}
