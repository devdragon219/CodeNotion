import { AccessTimeOutlined } from '@mui/icons-material';
import { TimePicker, renderTimeViewClock } from '@mui/x-date-pickers';
import classNames from 'classnames';
import { Fragment, forwardRef, useCallback } from 'react';

import { isValidDate } from '../../../utils/typeNarrowings/isValidDate';
import { TimeFieldProps } from './Time.types';

const TimeField = forwardRef<HTMLDivElement, TimeFieldProps>(
  (
    { clearable, disabled, error, helperText, placeholder, readonly, required, size = 'large', onChange, ...props },
    ref,
  ) => {
    const handleChange = useCallback(
      (value: Date | null) => {
        onChange?.(isValidDate(value) ? value : null);
      },
      [onChange],
    );

    return (
      <TimePicker
        {...props}
        ref={ref}
        onChange={handleChange}
        closeOnSelect
        defaultValue={null}
        disabled={disabled || readonly}
        disableOpenPicker={disabled || readonly}
        orientation="portrait"
        slots={{
          actionBar: Fragment,
          openPickerIcon: AccessTimeOutlined,
        }}
        slotProps={{
          clearButton: {
            size,
          },
          desktopPaper: {
            variant: 'elevation',
          },
          field: {
            clearable,
          },
          popper: {
            placement: 'bottom-end',
          },
          mobilePaper: {
            variant: 'elevation',
          },
          openPickerButton: {
            size,
          },
          textField: {
            className: classNames({
              'Mui-readonly': readonly,
            }),
            error,
            helperText,
            InputLabelProps: {
              className: classNames({
                'Mui-readonly': readonly,
                'MuiInputLabel-sizeLarge': size === 'large',
              }),
              size,
            },
            InputProps: {
              className: classNames('MuiOutlinedInput-date', {
                'Mui-readonly': readonly,
              }),
              size,
            },
            placeholder,
            required,
            size,
          },
          toolbar: {
            hidden: true,
          },
        }}
        viewRenderers={{
          hours: renderTimeViewClock,
          minutes: renderTimeViewClock,
          seconds: renderTimeViewClock,
        }}
      />
    );
  },
);
TimeField.displayName = 'TimeField';

export { TimeField };
