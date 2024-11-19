import { TextFieldProps } from '@mui/material';
import { DatePickerProps } from '@mui/x-date-pickers';

export interface DateFieldProps
  extends Omit<DatePickerProps<Date>, 'readOnly' | 'onChange'>,
    Pick<TextFieldProps, 'error' | 'fullWidth' | 'helperText' | 'placeholder' | 'required' | 'size'> {
  clearable?: boolean;
  readonly?: boolean;
  onChange?: (value: Date | null) => void;
}
