import { TextFieldProps as MuiTextFieldProps } from '@mui/material';

export interface CurrencyFieldProps extends Omit<MuiTextFieldProps, 'onChange' | 'value' | 'type'> {
  readonly?: boolean;
  value?: number | null;
  onChange?: (value: number | null) => void;
}
