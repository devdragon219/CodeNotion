/* eslint-disable no-restricted-imports */
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { forwardRef, useCallback, useState } from 'react';

import { PasswordFieldProps } from './Password.types';

const PasswordField = forwardRef<HTMLDivElement, PasswordFieldProps>(({ size = 'large', ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = useCallback(() => {
    setShowPassword((showPassword) => !showPassword);
  }, []);

  return (
    <TextField
      {...props}
      ref={ref}
      size={size}
      type={showPassword ? 'text' : 'password'}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword} size={size}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
});
PasswordField.displayName = 'PasswordField';

export { PasswordField };
