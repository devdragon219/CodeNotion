import { TextFieldProps } from '../Text/Text.types';

export interface DebouncedTextFieldProps<Value> extends TextFieldProps<Value> {
  debounceDelay?: number;
}
