import { CheckboxProps, FormControlProps, TypographyProps } from '@mui/material';

export interface CheckboxFieldProps
  extends Omit<CheckboxProps, 'readOnly'>,
    Pick<FormControlProps, 'error' | 'required'> {
  helperText?: string;
  label?: string;
  labelVariant?: TypographyProps['variant'];
  readonly?: boolean;
  value?: CheckboxProps['checked'];
}
