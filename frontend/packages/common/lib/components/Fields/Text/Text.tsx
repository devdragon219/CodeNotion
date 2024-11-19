/* eslint-disable no-restricted-imports */
import { Close } from '@mui/icons-material';
import {
  Box,
  IconButton,
  InputAdornment,
  InputLabelProps,
  InputProps,
  TextField as MuiTextField,
  Theme,
} from '@mui/material';
import classNames from 'classnames';
import { ChangeEvent, ForwardedRef, KeyboardEvent, ReactElement, forwardRef, useCallback, useId, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { parseSxPropsToArray } from '../../../utils/muiUtils';
import { TextFieldProps } from './Text.types';

const TextField = <Value,>(
  {
    className,
    clearable,
    disabled,
    slotProps,
    link,
    maxLength,
    readonly,
    size = 'large',
    sx,
    type,
    value,
    variant,
    onChange,
    ...props
  }: TextFieldProps<Value>,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const id = useId();
  const navigate = useNavigate();

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value =
        maxLength !== undefined && event.target.value.length > maxLength
          ? event.target.value.slice(0, maxLength)
          : event.target.value;
      const change = (type === 'number' ? (value === '' ? null : +value) : value) as Value;
      onChange?.(change);
    },
    [maxLength, type, onChange],
  );

  const checkHasValue = useCallback(
    (value?: Value) =>
      value !== null && (typeof value === 'number' || (typeof value === 'string' && value.length !== 0)),
    [],
  );
  const hasValue = useMemo(() => checkHasValue(value), [value, checkHasValue]);

  const handleClearValue = useCallback(() => {
    if (onChange) {
      onChange((type === 'number' ? null : '') as Value);
    }
  }, [onChange, type]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (type === 'number' && ['ArrowDown', 'ArrowUp'].includes(event.key)) {
        event.preventDefault();
      }
    },
    [type],
  );

  const handleClick = useCallback(() => {
    if (link) navigate(link);
  }, [link, navigate]);

  // TODO: check why this casting is needed
  const inputProps = slotProps?.input as InputProps | undefined;
  const inputLabelProps = slotProps?.inputLabel as InputLabelProps | undefined;
  return (
    <Box sx={[...parseSxPropsToArray(sx), { position: 'relative' }]}>
      <MuiTextField
        {...props}
        sx={[
          ...(link
            ? [
                (theme: Theme) => ({
                  '.MuiInputBase-input': {
                    color: `${theme.palette.blue['500']} !important`,
                    WebkitTextFillColor: `${theme.palette.blue['500']} !important`,
                  },
                }),
              ]
            : []),
        ]}
        ref={ref}
        id={id}
        type={type}
        variant={variant}
        className={classNames(className, {
          'Mui-readonly': readonly,
        })}
        disabled={disabled || readonly}
        size={size}
        value={value ?? ''}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        slotProps={{
          ...(slotProps ?? {}),
          input: {
            ...(inputProps ?? {}),
            ...(variant === 'standard' ? { disableUnderline: true } : {}),
            className: classNames(inputProps?.className, {
              'Mui-readonly': readonly,
            }),
            endAdornment:
              (clearable && (!disabled || !readonly) && hasValue) || inputProps?.endAdornment ? (
                <>
                  {clearable && (!disabled || !readonly) && hasValue && (
                    <InputAdornment position="end" sx={{ marginLeft: 0 }}>
                      <IconButton onClick={handleClearValue} size={size}>
                        <Close sx={{ fontSize: '16px !important', right: '16px !important' }} />
                      </IconButton>
                    </InputAdornment>
                  )}
                  {inputProps?.endAdornment}
                </>
              ) : undefined,
            size,
            sx: size === 'small' ? { pr: 0.5 } : undefined,
          },
          inputLabel: {
            ...(inputLabelProps ?? {}),
            className: classNames(inputLabelProps?.className, {
              'Mui-readonly': readonly,
              'MuiInputLabel-sizeLarge': size === 'large',
            }),
            size,
          },
        }}
      />
      {link && (
        <Box
          sx={{
            backgroundColor: 'transparent',
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            cursor: 'pointer',
          }}
          onClick={handleClick}
        />
      )}
    </Box>
  );
};
TextField.displayName = 'TextField';

const ForwardedTextField = forwardRef(TextField) as <Value>(
  props: TextFieldProps<Value>,
  ref: ForwardedRef<HTMLDivElement>,
) => ReactElement;

export { ForwardedTextField as TextField };
