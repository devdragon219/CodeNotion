import { Search } from '@mui/icons-material';
import { InputAdornment } from '@mui/material';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';

import { parseSxPropsToArray } from '../../../utils/muiUtils';
import { DebouncedTextField } from '../DebouncedText/DebouncedText';
import { DebouncedTextFieldProps } from '../DebouncedText/DebouncedText.types';
import { TextField } from '../Text/Text';

const SearchField = forwardRef<HTMLDivElement, DebouncedTextFieldProps<string>>(
  ({ debounceDelay, slotProps, placeholder, sx, ...props }, ref) => {
    const { t } = useTranslation();
    const Input = debounceDelay ? DebouncedTextField : TextField;

    return (
      <Input
        {...props}
        ref={ref}
        clearable
        {...(debounceDelay ? { debounceDelay } : {})}
        placeholder={placeholder ?? t('common.text.search')}
        slotProps={{
          ...(slotProps ?? {}),
          input: {
            ...(slotProps?.input ?? {}),
            className: 'MuiOutlinedInput-search',
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ strokeWidth: 1.5, fontSize: '16px' }} />
              </InputAdornment>
            ),
          },
        }}
        sx={[{ width: '100%' }, ...parseSxPropsToArray(sx)]}
      />
    );
  },
);
SearchField.displayName = 'SearchField';

export { SearchField };
