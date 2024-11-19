import { EventTwoTone, ExpandMore } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';
import classNames from 'classnames';
import { forwardRef, useCallback } from 'react';

import { isValidDate } from '../../../utils/typeNarrowings/isValidDate';
import { DateFieldProps } from './Date.types';

const DateField = forwardRef<HTMLDivElement, DateFieldProps>(
  (
    {
      clearable,
      disabled,
      error,
      fullWidth,
      helperText,
      placeholder,
      readonly,
      required,
      size = 'large',
      onChange,
      ...props
    },
    ref,
  ) => {
    const handleChange = useCallback(
      (value: Date | null) => {
        onChange?.(isValidDate(value) ? value : null);
      },
      [onChange],
    );

    return (
      <DatePicker
        {...props}
        ref={ref}
        onChange={handleChange}
        closeOnSelect
        defaultValue={null}
        disabled={disabled || readonly}
        disableOpenPicker={disabled || readonly}
        orientation="portrait"
        showDaysOutsideCurrentMonth
        slots={{
          openPickerIcon: EventTwoTone,
          switchViewIcon: ExpandMore,
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
          layout: {
            sx: (theme) => ({
              '& .MuiPickersCalendarHeader-labelContainer': {
                ...theme.typography.bodySm,
                height: '36px',
                backgroundColor: theme.palette.blue[50],
                borderRadius: '24px',
                padding: '8px',
                textTransform: 'capitalize',
              },
              '& .MuiDayCalendar-weekDayLabel': {
                ...theme.typography.caption,
                color: theme.palette.blue[500],
                textTransform: 'capitalize',
              },
              '& .MuiPickersDay-root': {
                ...theme.typography.bodySm,
                color: theme.palette.grey[700],
                '&[aria-current="date"]': {
                  backgroundColor: 'transparent',
                },
                '&.MuiPickersDay-dayOutsideMonth': {
                  color: theme.palette.grey[500],
                },
                '&.Mui-selected': {
                  backgroundColor: theme.palette.blue[500],
                  color: 'white',
                },
              },
            }),
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
            fullWidth,
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
        views={['year', 'day']}
        yearsPerRow={3}
      />
    );
  },
);
DateField.displayName = 'DateField';

export { DateField };
