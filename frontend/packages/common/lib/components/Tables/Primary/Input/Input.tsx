import { Box, Typography } from '@mui/material';
import { ChangeEvent, memo, useCallback, useMemo } from 'react';
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';
import { ValidationError } from 'yup';

import { parseDateToLocalizedString, parseDateToString } from '../../../../utils/dateUtils';
import { parseSxPropsToArray } from '../../../../utils/muiUtils';
import { parseNumberToCurrency } from '../../../../utils/numberUtils';
import { parseStringToDate, parseStringToLocalizedDate } from '../../../../utils/stringUtils';
import { isValidDate } from '../../../../utils/typeNarrowings/isValidDate';
import { CheckboxField } from '../../../Fields/Checkbox/Checkbox';
import { CurrencyField } from '../../../Fields/Currency/Currency';
import { DateField } from '../../../Fields/Date/Date';
import { DebouncedTextField } from '../../../Fields/DebouncedText/DebouncedText';
import { SelectField } from '../../../Fields/Select/Select';
import { TextField } from '../../../Fields/Text/Text';
import { TableInputProps } from './Input.types';

const TableInput = ({
  clearable,
  debounceDelay,
  disabled,
  multiple,
  options,
  readonly,
  schema,
  sx,
  type,
  useSortedOptions = true,
  value,
  variant,
  getOptionLabel,
  onChange,
}: TableInputProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();

  const error = useMemo(() => {
    if (!schema) {
      return {};
    }

    try {
      schema.validateSync(value);
      return {};
    } catch (error) {
      const { message } = error as ValidationError;
      return {
        error: true,
        helperText: message,
      };
    }
  }, [schema, value]);

  const checkIsRangeValueNull = useCallback(
    (key: 'min' | 'max') =>
      !Array.isArray(value) || (key === 'min' && value[1] === null) || (key === 'max' && value[0] === null),
    [value],
  );

  const handleCheckboxChange = useCallback(
    (_: ChangeEvent<HTMLInputElement>, checked: boolean) => {
      onChange(checked);
    },
    [onChange],
  );

  const handleDateChange = useCallback(
    (value: Date | null) => {
      if (value === null || isValidDate(value)) {
        onChange(parseDateToString(value));
      }
    },
    [onChange],
  );

  const handleDateRangeChange = useCallback(
    (key: 'min' | 'max') => (inputValue: Date | null) => {
      if (inputValue === null && checkIsRangeValueNull(key)) {
        onChange(null);
        return;
      }

      const date = parseDateToString(inputValue);
      if (Array.isArray(value)) {
        onChange(key === 'min' ? [date, value[1]] : [value[0], date]);
      } else {
        onChange(key === 'min' ? [date, null] : [null, date]);
      }
    },
    [checkIsRangeValueNull, value, onChange],
  );

  const handleNumberChange = useCallback(
    (key: 'min' | 'max') => (inputValue: number | null) => {
      if (inputValue === null && checkIsRangeValueNull(key)) {
        onChange(null);
        return;
      }

      if (Array.isArray(value)) {
        onChange(key === 'min' ? [inputValue, value[1]] : [value[0], inputValue]);
      } else {
        onChange(key === 'min' ? [inputValue, null] : [null, inputValue]);
      }
    },
    [checkIsRangeValueNull, value, onChange],
  );

  const handleSelectChange = useCallback(
    (value: unknown) => {
      if (variant === 'header') {
        onChange(Array.isArray(value) && value.length === 0 ? null : value);
      } else {
        onChange(value);
      }
    },
    [variant, onChange],
  );

  if (readonly) {
    const getText = () => {
      if (type === 'boolean') {
        return value !== undefined && value !== null ? t(`common.text.${value as boolean}`) : '';
      }
      if (type === 'currency') {
        return parseNumberToCurrency(Number(value), language);
      }
      if (type === 'date') {
        if (typeof value === 'string') {
          return parseStringToLocalizedDate(value, language);
        }
        return parseDateToLocalizedString(value as Date | null, language);
      }
      if (options) {
        if (Array.isArray(value)) {
          return (getOptionLabel ? value.map(getOptionLabel) : value).join(', ');
        }
        return getOptionLabel ? getOptionLabel(value) : value;
      }
      return value;
    };

    return (
      <Typography variant="bodySm" sx={(theme) => ({ color: theme.palette.grey[700], whiteSpace: 'pre-wrap' })}>
        <>{getText()}</>
      </Typography>
    );
  }

  const Input = debounceDelay ? DebouncedTextField : TextField;

  if (variant === 'header') {
    if (type === 'boolean') {
      return (
        <SelectField
          sx={sx}
          size="small"
          clearable
          {...error}
          value={value}
          onChange={onChange}
          options={[true, false]}
          getOptionLabel={(option) => getOptionLabel?.(option) ?? t(`common.text.${option as boolean}`)}
        />
      );
    }

    if (type === 'date') {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <DateField
            sx={[...parseSxPropsToArray(sx), { minWidth: '180px' }]}
            size="small"
            disabled={disabled}
            clearable
            {...error}
            value={Array.isArray(value) ? parseStringToDate(value[0] as string) : null}
            onChange={handleDateRangeChange('min')}
          />
          -
          <DateField
            sx={[...parseSxPropsToArray(sx), { minWidth: '180px' }]}
            size="small"
            disabled={disabled}
            clearable
            {...error}
            value={Array.isArray(value) ? parseStringToDate(value[1] as string) : null}
            onChange={handleDateRangeChange('max')}
          />
        </Box>
      );
    }

    if (type === 'currency' || type === 'number') {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Input
            sx={[...parseSxPropsToArray(sx), { minWidth: '120px' }]}
            type="number"
            size="small"
            disabled={disabled}
            clearable
            {...(debounceDelay ? { debounceDelay } : {})}
            {...error}
            value={Array.isArray(value) ? (value[0] as number) : null}
            onChange={handleNumberChange('min')}
          />
          -
          <Input
            sx={[...parseSxPropsToArray(sx), { minWidth: '120px' }]}
            type="number"
            size="small"
            disabled={disabled}
            clearable
            {...(debounceDelay ? { debounceDelay } : {})}
            {...error}
            value={Array.isArray(value) ? (value[1] as number) : null}
            onChange={handleNumberChange('max')}
          />
        </Box>
      );
    }
  }

  if (type === 'boolean') {
    return <CheckboxField sx={sx} checked={Boolean(value)} disabled={disabled} onChange={handleCheckboxChange} />;
  }

  if (type === 'currency') {
    return (
      <CurrencyField sx={sx} size="small" disabled={disabled} {...error} value={value as number} onChange={onChange} />
    );
  }

  if (type === 'date') {
    return (
      <DateField
        sx={sx}
        size="small"
        disabled={disabled}
        clearable={clearable}
        {...error}
        value={parseStringToDate(value as string | null)}
        onChange={handleDateChange}
      />
    );
  }

  if (options) {
    return (
      <SelectField
        sx={sx}
        size="small"
        disabled={disabled}
        clearable={clearable}
        useSortedOptions={useSortedOptions}
        {...error}
        value={!multiple || Array.isArray(value) ? value : []}
        multiple={multiple}
        onChange={handleSelectChange}
        options={options}
        getOptionLabel={getOptionLabel}
        renderValue={
          multiple && Array.isArray(value)
            ? () => t('common.component.table.options_selected', { count: value.length })
            : undefined
        }
      />
    );
  }

  return (
    <Input
      sx={sx}
      type={type}
      size="small"
      disabled={disabled}
      clearable={clearable}
      {...(debounceDelay ? { debounceDelay } : {})}
      {...error}
      value={value as string}
      onChange={onChange}
    />
  );
};

const memoized = memo(TableInput, isEqual) as typeof TableInput;
export { memoized as TableInput };
