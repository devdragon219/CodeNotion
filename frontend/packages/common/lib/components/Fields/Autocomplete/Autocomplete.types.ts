import { AutocompleteProps, AutocompleteValue, TextFieldProps } from '@mui/material';
import { ParseKeys } from 'i18next';

export type SpecializedAutocompleteOmits =
  | 'getOptionLabel'
  | 'inputValue'
  | 'isOptionEqualToValue'
  | 'loading'
  | 'onInputChange'
  | 'onLoadMore'
  | 'options';

export interface AutocompleteFieldProps<
  Value,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined,
> extends Omit<
      AutocompleteProps<Value, Multiple, DisableClearable, FreeSolo>,
      'isOptionEqualToValue' | 'onChange' | 'readOnly' | 'renderInput'
    >,
    Pick<TextFieldProps, 'error' | 'helperText' | 'label' | 'placeholder' | 'required'> {
  action?: {
    title: ParseKeys;
    onClick: () => void;
  };
  readonly?: boolean;
  selectAll?: ParseKeys;
  onChange?: (value: AutocompleteValue<Value, Multiple, DisableClearable, FreeSolo>) => void;
  onLoadMore?: () => void;
}
