/* eslint-disable no-restricted-imports */
import { Cancel, Close, ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, Chip, IconButton, InputAdornment, MenuItem, TextField, Typography } from '@mui/material';
import classNames from 'classnames';
import {
  ChangeEvent,
  ForwardedRef,
  MouseEvent,
  ReactElement,
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState,
} from 'react';
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';

import { SelectGroupOption, SelectLabelValueOption, SelectOption } from '../../../interfaces/SelectOption';
import { isOfType } from '../../../utils/typeNarrowings/isOfType';
import { Transition } from '../../Transition/Transition';
import { CheckboxField } from '../Checkbox/Checkbox';
import { SelectFieldProps, SelectValue } from './Select.types';

const SelectField = <Value, Multiple extends boolean | undefined>(
  {
    action,
    clearable,
    columns,
    disabled,
    max,
    multiple,
    options,
    placeholder,
    readonly,
    selectAll,
    size = 'large',
    useSortedOptions = true,
    value,
    variant,
    getOptionKey,
    getOptionLabel,
    onChange,
    renderValue,
    ...props
  }: SelectFieldProps<Value, Multiple>,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState(false);
  const [isGroupOptionOpen, setGroupOptionOpen] = useState<string[]>([]);
  const [width, setWidth] = useState(0);
  const id = useId();

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setGroupOptionOpen([]);
    setOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleClose);

    return () => {
      window.removeEventListener('scroll', handleClose);
    };
    // eslint-disable-next-line
  }, []);

  const isCheckboxOptionDisabled = useMemo(
    () => Array.isArray(value) && max !== undefined && value.length === max,
    [max, value],
  );

  const isGroupOption = useCallback(
    (option: SelectOption<Value>): option is SelectGroupOption<Value> =>
      isOfType<SelectGroupOption<Value>>(option, ['options']),
    [],
  );

  const isLabelValueOption = useCallback(
    (option: SelectOption<Value>): option is SelectLabelValueOption<Value> =>
      isOfType<SelectLabelValueOption<Value>>(option, ['label']),
    [],
  );

  const handleToggleOpen = useCallback(
    (id: string) => (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      setGroupOptionOpen((open) => (open.includes(id) ? open.filter((it) => it !== id) : [...open, id]));
    },
    [],
  );

  const handleRef = useCallback(
    (el: HTMLDivElement | null) => {
      if (el) {
        setWidth(el.clientWidth);
      }
      if (ref) {
        if (typeof ref === 'function') {
          ref(el);
        } else {
          ref.current = el;
        }
      }
    },
    [ref],
  );

  const checkHasNoValue = useCallback(
    (value?: Value | Value[] | null) =>
      value === null ||
      value === undefined ||
      (Array.isArray(value) && value.length === 0) ||
      (typeof value === 'string' && value === ''),
    [],
  );
  const hasNoValue = useMemo(() => checkHasNoValue(value), [value, checkHasNoValue]);

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
    (options: SelectOption<Value>[]): boolean =>
      options.every((option) => {
        if (isGroupOption(option)) {
          return hasAllOptionsSelected(option.options);
        }
        if (isLabelValueOption(option)) {
          return hasOptionSelected(option.value);
        }
        return hasOptionSelected(option);
      }),
    [hasOptionSelected, isGroupOption, isLabelValueOption],
  );
  const hasSomeOptionsSelected = useCallback(
    (options: SelectOption<Value>[]): boolean =>
      options.some((option) => {
        if (isGroupOption(option)) {
          return hasSomeOptionsSelected(option.options);
        }
        if (isLabelValueOption(option)) {
          return hasOptionSelected(option.value);
        }
        return hasOptionSelected(option);
      }),
    [hasOptionSelected, isGroupOption, isLabelValueOption],
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value as unknown as SelectValue<Value, Multiple>;
      if (onChange) {
        onChange(value);
      }
    },
    [onChange],
  );

  const handleSelectAll = useCallback(() => {
    if (onChange) {
      if (hasAllOptionsSelected(options)) {
        onChange([] as SelectValue<Value, Multiple>);
      } else {
        onChange(options as SelectValue<Value, Multiple>);
      }
    }
  }, [hasAllOptionsSelected, options, onChange]);

  const getFlatOptions = useCallback(
    (options: SelectOption<Value>[]): Value[] =>
      options.reduce<Value[]>((acc, option) => {
        if (isGroupOption(option)) {
          return [...acc, ...getFlatOptions(option.options)];
        }
        if (isLabelValueOption(option)) {
          return [...acc, option.value];
        }
        return [...acc, option];
      }, []),
    [isGroupOption, isLabelValueOption],
  );

  const removeOptionFromValue = useCallback(
    (option: SelectOption<Value>, value: Value[]): Value[] => {
      if (isGroupOption(option)) {
        const options = getFlatOptions(option.options);
        return options.reduce((acc, option) => removeOptionFromValue(option, acc), value);
      }
      if (isLabelValueOption(option)) {
        return removeOptionFromValue(option.value, value);
      }
      if (getOptionKey) {
        return value.filter((it) => !isEqual(getOptionKey(it), getOptionKey(option)));
      }
      return value.filter((it) => !isEqual(it, option));
    },
    [getFlatOptions, getOptionKey, isGroupOption, isLabelValueOption],
  );

  const handleOptionClick = useCallback(
    (option: SelectOption<Value>) => () => {
      if (isGroupOption(option)) {
        const change = (
          multiple
            ? hasAllOptionsSelected(option.options)
              ? removeOptionFromValue(option, value as Value[])
              : [...(value as Value[]), ...getFlatOptions(option.options)]
            : option
        ) as SelectValue<Value, Multiple>;
        if (onChange) {
          onChange(change);
        }
        return;
      }

      if (isLabelValueOption(option)) {
        handleOptionClick(option.value);
        return;
      }

      const arrayValue = value as Value[];
      const change = (
        multiple
          ? hasOptionSelected(option)
            ? removeOptionFromValue(option, arrayValue)
            : !max || arrayValue.length < max
              ? [...arrayValue, option]
              : value
          : option
      ) as SelectValue<Value, Multiple>;
      if (onChange) {
        onChange(change);
      }
    },
    [
      isGroupOption,
      isLabelValueOption,
      multiple,
      hasOptionSelected,
      removeOptionFromValue,
      value,
      max,
      onChange,
      hasAllOptionsSelected,
      getFlatOptions,
    ],
  );

  const handleRenderValue = useMemo(() => {
    if (placeholder && hasNoValue) {
      return () => placeholder;
    }
    if (renderValue) {
      return (value: unknown) => renderValue(value as SelectValue<Value, Multiple>);
    }
    if (multiple) {
      const renderValue = (value: unknown) => {
        const handleDelete = (item: Value) => () => {
          const change = removeOptionFromValue(item, value as Value[]) as SelectValue<Value, Multiple>;
          if (onChange) {
            onChange(change);
          }
        };

        return (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {(value as Value[]).map((it, index) => (
              <Chip
                key={index}
                className={classNames('MuiChip-select', {
                  'Mui-readonly': readonly,
                })}
                label={getOptionLabel ? getOptionLabel(it) : (it as string)}
                deleteIcon={<Cancel sx={{ fontSize: '16px !important', right: '16px !important' }} />}
                onDelete={handleDelete(it)}
                onMouseDown={(event) => {
                  event.stopPropagation();
                }}
                size={size}
              />
            ))}
          </Box>
        );
      };
      return renderValue;
    }
    if (getOptionLabel) {
      return (value: unknown) => getOptionLabel(value as Value);
    }

    const _renderValue = (value: unknown) => <>{value}</>;
    return _renderValue;
  }, [placeholder, hasNoValue, multiple, readonly, size, getOptionLabel, renderValue, onChange, removeOptionFromValue]);

  const handleClearValue = useCallback(() => {
    const change = (multiple ? [] : null) as SelectValue<Value, Multiple>;
    if (onChange) {
      onChange(change);
    }
  }, [multiple, onChange]);

  const optionsToRender = useMemo(() => {
    if (useSortedOptions) {
      const sortOptions = (options: SelectOption<Value>[]): SelectOption<Value>[] => {
        const sorted = options.sort((a, b) => {
          const left = isLabelValueOption(a)
            ? a.label
            : getOptionLabel
              ? getOptionLabel(isGroupOption(a) ? a.value : a)
              : isGroupOption(a)
                ? a.value
                : a;
          const right = isLabelValueOption(b)
            ? b.label
            : getOptionLabel
              ? getOptionLabel(isGroupOption(b) ? b.value : b)
              : isGroupOption(b)
                ? b.value
                : b;

          return left > right ? 1 : -1;
        });
        return sorted.map((option) =>
          isGroupOption(option)
            ? {
                ...option,
                options: sortOptions(option.options),
              }
            : option,
        );
      };
      return sortOptions(options);
    }
    return options;
  }, [useSortedOptions, options, isGroupOption, isLabelValueOption, getOptionLabel]);

  const mapOptionsToRender = useCallback(
    (options: SelectOption<Value>[], index = 0) =>
      options.map((option, idx) => {
        const key = `${index}_${idx}`;
        if (isGroupOption(option)) {
          const isOpen = isGroupOptionOpen.includes(key);
          const ToggleIcon = () =>
            isOpen ? (
              <ExpandLess sx={{ fontSize: '16px !important', right: '16px !important' }} />
            ) : (
              <ExpandMore sx={{ fontSize: '16px !important', right: '16px !important' }} />
            );

          return [
            <MenuItem
              key={key}
              sx={{ ml: index * 4 }}
              {...(multiple || option.selectable
                ? { value: option.value as string, onClick: handleOptionClick(option) }
                : { onClick: handleToggleOpen(key) })}
            >
              {multiple && (
                <CheckboxField
                  checked={hasAllOptionsSelected(option.options)}
                  indeterminate={hasSomeOptionsSelected(option.options)}
                  disableRipple
                />
              )}
              <Typography variant={size === 'small' ? 'bodySm' : 'bodyMd'}>
                {getOptionLabel ? getOptionLabel(option.value) : <>{option.value}</>}
              </Typography>
              {multiple || option.selectable ? (
                <IconButton sx={{ ml: 'auto', mr: '-8px' }} onClick={handleToggleOpen(key)}>
                  <ToggleIcon />
                </IconButton>
              ) : (
                <ToggleIcon />
              )}
            </MenuItem>,
            <Transition key={`${key}_collapse`} type="collapse" in={isOpen} unmountOnExit>
              {mapOptionsToRender(option.options, index + 1)}
            </Transition>,
          ];
        }

        const checked = multiple
          ? isLabelValueOption(option)
            ? hasOptionSelected(option.value)
            : hasOptionSelected(option)
          : false;
        const label = isLabelValueOption(option)
          ? option.label
          : getOptionLabel
            ? getOptionLabel(option)
            : (option as string);
        const value = (isLabelValueOption(option) ? option.value : option) as string;
        const disabled = isLabelValueOption(option) ? option.disabled : false;

        return (
          <MenuItem
            key={key}
            sx={{ ml: index * 4 }}
            disabled={disabled}
            value={value}
            onClick={handleOptionClick(option)}
          >
            {multiple && <CheckboxField checked={checked} disableRipple disabled={isCheckboxOptionDisabled} />}
            <Typography variant={size === 'small' ? 'bodySm' : 'bodyMd'}>{label}</Typography>
          </MenuItem>
        );
      }),
    [
      getOptionLabel,
      handleOptionClick,
      handleToggleOpen,
      hasAllOptionsSelected,
      hasOptionSelected,
      hasSomeOptionsSelected,
      isCheckboxOptionDisabled,
      isGroupOption,
      isLabelValueOption,
      multiple,
      isGroupOptionOpen,
      size,
    ],
  );

  return (
    <TextField
      {...props}
      size={size}
      variant={variant}
      ref={handleRef}
      select
      className={classNames({
        'Mui-readonly': readonly,
      })}
      disabled={disabled || readonly}
      value={value ?? (multiple ? [] : '')}
      onChange={multiple ? undefined : handleChange}
      slotProps={{
        input: {
          ...(variant === 'standard' ? { disableUnderline: true } : {}),
          id,
          className: classNames({
            'Mui-readonly': readonly,
          }),
          endAdornment: clearable && !disabled && !readonly && !hasNoValue && (
            <InputAdornment position="end" sx={{ marginLeft: 0, marginRight: size === 'small' ? 1 : 2 }}>
              <IconButton onClick={handleClearValue} size={size}>
                <Close sx={{ fontSize: '16px !important', right: '16px !important' }} />
              </IconButton>
            </InputAdornment>
          ),
          size,
        },
        inputLabel: {
          htmlFor: id,
          className: classNames({
            'Mui-readonly': readonly,
            'MuiInputLabel-sizeLarge': size === 'large',
          }),
          size,
        },
        select: {
          open: isOpen,
          displayEmpty: !!placeholder,
          multiple,
          MenuProps: {
            disableScrollLock: true,
            MenuListProps: {
              sx: {
                ...(columns
                  ? {
                      display: 'grid',
                      gridAutoFlow: columns.direction,
                      gridTemplateColumns: `repeat(${columns.size}, 1fr)`,
                      gridTemplateRows: `repeat(${Math.round(options.length / 2) + 1} , auto)`,
                      maxHeight: 'none !important',
                    }
                  : {}),
              },
            },
            slotProps: {
              paper: {
                sx: { minWidth: width, ...(size === 'small' ? { borderRadius: '5px' } : {}) },
                variant: 'select',
              },
            },
          },
          SelectDisplayProps: {
            className: classNames({
              'MuiInputBase-inputSizeLarge': size === 'large',
            }),
          },
          slotProps: {
            input: {
              className: classNames({
                'Mui-clearable': clearable,
                'Mui-empty': hasNoValue || !!renderValue,
                'Mui-readonly': readonly,
              }),
            },
          },
          size,
          onOpen: handleOpen,
          onClose: handleClose,
          renderValue: handleRenderValue,
        },
      }}
    >
      {multiple && selectAll && (
        <MenuItem
          key="select_all"
          sx={(theme) => ({
            ...(columns ? { gridColumn: `span ${columns.size}` } : {}),
            borderBottom: `1px solid ${theme.palette.divider}`,
          })}
          value="select_all"
          onClick={handleSelectAll}
        >
          <CheckboxField
            checked={hasAllOptionsSelected(options)}
            indeterminate={hasSomeOptionsSelected(options)}
            disableRipple
          />
          <Typography variant={size === 'small' ? 'bodySm' : 'bodyMd'}>{t(selectAll)}</Typography>
        </MenuItem>
      )}
      {mapOptionsToRender(optionsToRender)}
      {action && (
        <MenuItem
          key="action"
          sx={(theme) => ({
            ...(columns ? { gridColumn: `span ${columns.size}` } : {}),
            borderTop: `1px solid ${theme.palette.divider}`,
          })}
          value="action"
          onClick={action.onClick}
        >
          <Typography variant={size === 'small' ? 'bodySm' : 'bodyMd'}>{t(action.title)}</Typography>
        </MenuItem>
      )}
    </TextField>
  );
};
SelectField.displayName = 'SelectField';

const ForwardedSelectField = forwardRef(SelectField) as <Value, Multiple extends boolean | undefined = undefined>(
  props: SelectFieldProps<Value, Multiple>,
  ref: ForwardedRef<HTMLDivElement>,
) => ReactElement;

export { ForwardedSelectField as SelectField };
