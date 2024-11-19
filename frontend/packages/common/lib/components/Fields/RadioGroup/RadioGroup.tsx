import { FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup } from '@mui/material';
import classNames from 'classnames';
import { ChangeEvent, ForwardedRef, ReactElement, forwardRef, useCallback } from 'react';

import { RadioGroupFieldProps } from './RadioGroup.types';

const RadioGroupField = <Value,>(
  {
    disabled,
    error,
    helperText,
    labelVariant,
    options,
    readonly,
    required,
    sx,
    onChange,
    ...props
  }: RadioGroupFieldProps<Value>,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(options[Number(event.target.id)].value);
    },
    [onChange, options],
  );

  return (
    <FormControl error={error} ref={ref} required={required} sx={sx}>
      <RadioGroup {...props} onChange={handleChange}>
        {options.map((option, index) => (
          <FormControlLabel
            key={index}
            {...option}
            className={classNames('MuiFormControlLabel-radio', {
              'Mui-readonly': readonly,
            })}
            control={<Radio id={String(index)} disabled={disabled || readonly} />}
            slotProps={{
              typography: {
                className: classNames({
                  'Mui-readonly': readonly,
                }),
                variant: labelVariant ?? 'bodyMd',
              },
            }}
          />
        ))}
      </RadioGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
RadioGroupField.displayName = 'RadioGroupField';

const ForwardedRadioGroupField = forwardRef(RadioGroupField) as <Value>(
  props: RadioGroupFieldProps<Value>,
  ref: ForwardedRef<HTMLDivElement>,
) => ReactElement;

export { ForwardedRadioGroupField as RadioGroupField };
