import { Cancel, Close, KeyboardArrowDown } from '@mui/icons-material';
import { Autocomplete, AutocompleteValue, List, MenuItem, Typography } from '@mui/material';
import classNames from 'classnames';
import {
  ForwardedRef,
  ReactElement,
  SyntheticEvent,
  UIEvent,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import { AutocompleteProvider } from '../../../contexts/autocomplete/provider';
import { DebouncedTextField } from '../DebouncedText/DebouncedText';
import { TextField } from '../Text/Text';
import { Action } from './Action/Action';
import { AutocompleteFieldProps } from './Autocomplete.types';
import { Listbox } from './Listbox/Listbox';
import { Option } from './Option/Option';

const AutocompleteField = <
  Value,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>(
  {
    action,
    disabled,
    error,
    helperText,
    label,
    multiple,
    options,
    placeholder,
    readonly,
    required,
    selectAll,
    size = 'large',
    value,
    filterOptions,
    getOptionKey,
    onChange,
    onLoadMore,
    ...props
  }: AutocompleteFieldProps<Value, Multiple, DisableClearable, FreeSolo>,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleClose);

    return () => {
      window.removeEventListener('scroll', handleClose);
    };
    // eslint-disable-next-line
  }, []);

  const handleChange = useCallback(
    (_: SyntheticEvent, value: AutocompleteValue<Value, Multiple, DisableClearable, FreeSolo>) => {
      if (onChange) {
        onChange(value);
      }
    },
    [onChange],
  );

  const hasOptionSelected = useCallback(
    (option: Value) => {
      if (!value) {
        return false;
      }
      if (getOptionKey) {
        return (value as Value[]).map(getOptionKey).includes(getOptionKey(option));
      }
      return (value as Value[]).includes(option);
    },
    [value, getOptionKey],
  );

  const hasAllOptionsSelected = useCallback(
    (options: readonly Value[]): boolean => options.every(hasOptionSelected),
    [hasOptionSelected],
  );
  const hasSomeOptionsSelected = useCallback(
    (options: readonly Value[]): boolean => options.some(hasOptionSelected),
    [hasOptionSelected],
  );

  const handleSelectAll = useCallback(() => {
    if (onChange) {
      if (hasAllOptionsSelected(options)) {
        onChange([] as AutocompleteValue<Value, Multiple, DisableClearable, FreeSolo>);
      } else {
        onChange(options as AutocompleteValue<Value, Multiple, DisableClearable, FreeSolo>);
      }
    }
  }, [hasAllOptionsSelected, options, onChange]);

  const filter = useMemo(() => {
    if (onLoadMore) {
      return (options: Value[]) => options;
    }
    return filterOptions;
  }, [filterOptions, onLoadMore]);

  const isOptionEqualToValue = useCallback(
    (option: Value, value: Value) => {
      if (getOptionKey) {
        return getOptionKey(option) === getOptionKey(value);
      }
      return option === value;
    },
    [getOptionKey],
  );

  return (
    <AutocompleteProvider
      action={action}
      hasAllOptionsSelected={multiple ? hasAllOptionsSelected(options) : false}
      hasSomeOptionsSelected={multiple ? hasSomeOptionsSelected(options) : false}
      selectAll={
        multiple && selectAll
          ? {
              title: selectAll,
              onClick: handleSelectAll,
            }
          : undefined
      }
    >
      <Autocomplete
        {...props}
        ref={ref}
        open={isOpen}
        onOpen={handleOpen}
        onClose={handleClose}
        className={classNames({
          'Mui-multiple': multiple,
        })}
        clearIcon={<Close sx={{ fontSize: '16px !important', right: '16px !important' }} />}
        clearText=""
        disabled={disabled || readonly}
        disableCloseOnSelect={multiple}
        multiple={multiple}
        options={options}
        isOptionEqualToValue={isOptionEqualToValue}
        value={value}
        openText=""
        closeText=""
        filterOptions={filter}
        loadingText={
          <List disablePadding>
            <MenuItem sx={{ m: '6px', '&:hover': { background: 'initial', cursor: 'default' } }}>
              <Typography variant="bodySm">{t('common.text.loading')}</Typography>
            </MenuItem>
            <Action />
          </List>
        }
        noOptionsText={
          <List disablePadding>
            <MenuItem sx={{ m: '6px', '&:hover': { background: 'initial', cursor: 'default' } }}>
              <Typography variant="bodySm">{t('common.text.no_options')}</Typography>
            </MenuItem>
            <Action />
          </List>
        }
        onChange={handleChange}
        popupIcon={
          <KeyboardArrowDown
            sx={{
              fontSize: '16px !important',
              right: '16px !important',
              ...(disabled || readonly ? { display: 'none' } : {}),
            }}
          />
        }
        renderInput={({ InputLabelProps, InputProps, ...params }) => {
          const Input = onLoadMore ? DebouncedTextField : TextField;
          return (
            <Input
              {...params}
              readonly={readonly}
              error={error}
              helperText={helperText}
              label={label}
              placeholder={placeholder}
              required={required}
              size={size}
              slotProps={{
                input: InputProps,
                inputLabel: InputLabelProps,
              }}
              {...(onLoadMore ? { debounceDelay: 300 } : {})}
            />
          );
        }}
        renderOption={Option}
        size={size}
        slots={{
          listbox: Listbox,
        }}
        slotProps={{
          chip: {
            className: classNames('MuiChip-select', {
              'Mui-readonly': readonly,
            }),
            deleteIcon: <Cancel sx={{ fontSize: '16px !important', right: '16px !important' }} />,
            size,
          },
          clearIndicator: {
            color: 'inherit',
            disableFocusRipple: true,
            size,
          },
          listbox: {
            onScroll: (event: UIEvent) => {
              event.stopPropagation();
              const listboxNode = event.currentTarget;
              if (listboxNode.scrollTop + listboxNode.clientHeight > listboxNode.scrollHeight - 100) {
                onLoadMore?.();
              }
            },
          },
          paper: {
            variant: 'select',
            ...(size === 'small' ? { sx: { borderRadius: '5px' } } : {}),
          },
          popupIndicator: {
            color: 'inherit',
            disableFocusRipple: true,
            size,
          },
        }}
      />
    </AutocompleteProvider>
  );
};
AutocompleteField.displayName = 'AutocompleteField';

const ForwardedAutocompleteField = forwardRef(AutocompleteField) as <
  Value,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined,
>(
  props: AutocompleteFieldProps<Value, Multiple, DisableClearable, FreeSolo>,
  ref: ForwardedRef<HTMLDivElement>,
) => ReactElement;

export { ForwardedAutocompleteField as AutocompleteField };
