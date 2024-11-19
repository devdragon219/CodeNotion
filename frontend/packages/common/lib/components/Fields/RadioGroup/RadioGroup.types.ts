import { FormControlProps, RadioGroupProps, TypographyProps } from '@mui/material';

export interface RadioGroupFieldProps<Value>
  extends Omit<RadioGroupProps, 'value' | 'onChange'>,
    Pick<FormControlProps, 'disabled' | 'error' | 'required'> {
  helperText?: string;
  labelVariant?: TypographyProps['variant'];
  options: {
    label: string;
    value: Value;
  }[];
  readonly?: boolean;
  value?: Value;
  onChange?: (value: Value) => void;
}
