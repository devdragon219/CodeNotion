import { TextFieldProps } from '@mui/material';
import { TimePickerProps } from '@mui/x-date-pickers';

export interface TimeFieldProps
  extends Omit<TimePickerProps<Date>, 'readOnly' | 'onChange'>,
    Pick<TextFieldProps, 'error' | 'helperText' | 'placeholder' | 'required' | 'size'> {
  clearable?: boolean;
  readonly?: boolean;
  onChange?: (value: Date | null) => void;
}
