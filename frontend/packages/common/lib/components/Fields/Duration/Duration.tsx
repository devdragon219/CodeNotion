import { forwardRef, useCallback, useEffect, useState } from 'react';

import { TextField } from '../Text/Text';
import { DurationFieldProps } from './Duration.types';

const DurationField = forwardRef<HTMLDivElement, DurationFieldProps>(({ value, onChange, ...props }, ref) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (!value) return;

    const weeks = Math.floor(value / 10080);
    const days = Math.floor((value % 10080) / 1440);
    const hours = Math.floor(((value % 10080) % 1440) / 60);
    const minutes = Math.floor(((value % 10080) % 1440) % 60);

    setInputValue(
      [weeks && `${weeks}w`, days && `${days}d`, hours && `${hours}h`, minutes && `${minutes}m`]
        .filter((u) => !!u)
        .join(' '),
    );
  }, [value]);

  const handleBlur = useCallback(() => {
    const matches = inputValue.trim().match(/^(\d+w)?\s*(\d+d)?\s*(\d+h)?\s*(\d+m?)?$/);
    if (!matches) {
      onChange?.(parseFloat(inputValue));
      return;
    }

    const [weeks, days, hours, minutes] = matches.slice(1).map((x) => parseInt(x) || 0);
    const result = ((weeks * 7 + days) * 24 + hours) * 60 + minutes;
    onChange?.(result);
  }, [inputValue, onChange]);

  const handleChange = useCallback((value: string) => {
    if (/^\d*w?(\s\d*)?d?(\s\d*)?h?(\s\d*)?m?$/.test(value)) {
      setInputValue(value);
    }
  }, []);

  return <TextField {...props} ref={ref} value={inputValue} onBlur={handleBlur} onChange={handleChange} />;
});
DurationField.displayName = 'DurationField';

export { DurationField };
