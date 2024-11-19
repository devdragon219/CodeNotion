import { ForwardedRef, ReactElement, forwardRef, useCallback, useEffect, useState } from 'react';

import { useDebounce } from '../../../hooks/useDebounce';
import { TextField } from '../Text/Text';
import { DebouncedTextFieldProps } from './DebouncedText.types';

const DebouncedTextField = <Value extends number | string | null>(
  { debounceDelay, value, onChange, ...props }: DebouncedTextFieldProps<Value>,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const [inputValue, setInputValue] = useState(value ?? (null as Value));
  const [isPristine, setPristine] = useState(true);
  const debouncedValue = useDebounce(inputValue, debounceDelay);

  useEffect(() => {
    if (!isPristine && onChange) {
      onChange(debouncedValue);
    }
    // eslint-disable-next-line
  }, [debouncedValue]);

  useEffect(() => {
    setInputValue(value as Value);
  }, [value]);

  const handleChange = useCallback((change: Value) => {
    setPristine(false);
    setInputValue(change);
  }, []);

  return <TextField {...props} ref={ref} value={inputValue} onChange={handleChange} />;
};
DebouncedTextField.displayName = 'DebouncedTextField';

const ForwardedTextField = forwardRef(DebouncedTextField) as <Value>(
  props: DebouncedTextFieldProps<Value>,
  ref: ForwardedRef<HTMLDivElement>,
) => ReactElement;

export { ForwardedTextField as DebouncedTextField };
