/* eslint-disable no-restricted-imports */
import { InputLabelProps, InputProps, TextField } from '@mui/material';
import classNames from 'classnames';
import { KeyboardEvent, forwardRef, useCallback, useId, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { NumericFormat } from 'react-number-format';

import { CURRENCY } from '../../../configs/currency';
import { CurrencyFieldProps } from './Currency.types';

const CurrencyField = forwardRef<HTMLDivElement, CurrencyFieldProps>(
  ({ onChange, readonly, disabled, slotProps, size = 'large', value, variant, ...props }, ref) => {
    const id = useId();
    const {
      i18n: { language },
    } = useTranslation();

    const handleKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
      if (['ArrowDown', 'ArrowUp'].includes(event.key)) {
        event.preventDefault();
      }
    }, []);

    const suffix = useMemo(
      () =>
        Intl.NumberFormat(language, { style: 'currency', currency: CURRENCY, currencyDisplay: 'narrowSymbol' })
          .formatToParts(0)
          .find((p) => p.type === 'currency')?.value,
      [language],
    );

    // TODO: check why this casting is needed
    const inputProps = slotProps?.input as InputProps | undefined;
    const inputLabelProps = slotProps?.inputLabel as InputLabelProps | undefined;
    return (
      <NumericFormat
        {...props}
        id={id}
        getInputRef={ref}
        decimalScale={2}
        defaultValue={null}
        value={value ?? ''}
        onKeyDown={handleKeyDown}
        thousandSeparator={language === 'it' ? '.' : ','}
        decimalSeparator={language === 'it' ? ',' : '.'}
        valueIsNumericString
        suffix={` ${suffix}`}
        customInput={TextField}
        disabled={disabled || readonly}
        size={size}
        variant={variant}
        onValueChange={(values) => {
          onChange?.(values.floatValue ?? null);
        }}
        className={classNames({
          'Mui-readonly': readonly,
        })}
        slotProps={{
          ...(slotProps ?? {}),
          input: {
            ...(inputProps ?? {}),
            ...(variant === 'standard' ? { disableUnderline: true } : {}),
            className: classNames(inputProps?.className, {
              'Mui-readonly': readonly,
            }),
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
    );
  },
);
CurrencyField.displayName = 'CurrencyField';

export { CurrencyField };
