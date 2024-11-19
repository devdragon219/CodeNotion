import { Checkbox, FormControl, FormControlLabel, FormHelperText } from '@mui/material';
import classNames from 'classnames';
import { forwardRef, useId, useMemo } from 'react';

import { parseSxPropsToArray } from '../../../utils/muiUtils';
import { CheckboxFieldProps } from './Checkbox.types';

const CheckboxField = forwardRef<HTMLDivElement, CheckboxFieldProps>(
  (
    {
      checked,
      disabled,
      error,
      helperText,
      indeterminate,
      label,
      labelVariant,
      readonly,
      required,
      sx,
      value,
      ...props
    },
    ref,
  ) => {
    const id = useId();

    const control = useMemo(
      () => (
        <Checkbox
          {...props}
          id={id}
          checked={checked ?? value}
          className={classNames({
            'Mui-readonly': readonly,
          })}
          disabled={disabled || readonly}
          indeterminate={indeterminate && !checked}
        />
      ),
      [checked, disabled, id, indeterminate, props, readonly, value],
    );

    return (
      <FormControl
        error={error}
        ref={ref}
        required={required}
        sx={[{ height: '100%', justifyContent: 'center' }, ...parseSxPropsToArray(sx)]}
      >
        {label ? (
          <FormControlLabel
            className={classNames('MuiFormControlLabel-checkbox', {
              'Mui-readonly': readonly,
            })}
            control={control}
            label={label}
            slotProps={{
              typography: {
                className: classNames({
                  'Mui-readonly': readonly,
                }),
                variant: labelVariant ?? 'bodyMd',
              },
            }}
          />
        ) : (
          control
        )}
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  },
);
CheckboxField.displayName = 'CheckboxField';

export { CheckboxField };
