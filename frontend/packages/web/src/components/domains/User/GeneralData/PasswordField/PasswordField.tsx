import { Grid2 } from '@mui/material';
import { PasswordField } from '@realgimm5/frontend-common/components';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { UserPasswordFieldProps } from './PasswordField.types';

export const UserPasswordField = ({ control, errors }: UserPasswordFieldProps) => {
  const { t } = useTranslation();

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name={'password.newPassword'}
          control={control}
          render={({ field }) => (
            <PasswordField
              {...field}
              label={t('user.field.new_password')}
              error={!!errors.password?.newPassword}
              helperText={errors.password?.newPassword?.message}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name={'password.confirmPassword'}
          control={control}
          render={({ field }) => (
            <PasswordField
              {...field}
              label={t('user.field.confirm_password')}
              error={!!errors.password?.confirmPassword}
              helperText={errors.password?.confirmPassword?.message}
              required
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
