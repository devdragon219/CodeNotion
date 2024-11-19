import { TextFieldProps as MuiTextFieldProps } from '@mui/material';

export interface TextFieldProps<Value> extends Omit<MuiTextFieldProps, 'onChange' | 'value'> {
  clearable?: boolean;
  link?: string;
  maxLength?: number;
  readonly?: boolean;
  value?: Value;
  onChange?: (value: Value) => void;
}
