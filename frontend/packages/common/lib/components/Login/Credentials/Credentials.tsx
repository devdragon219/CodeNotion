import { yupResolver } from '@hookform/resolvers/yup';
import { Button, FormHelperText, Grid2, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useLogin } from '../../../contexts/login/hook';
import { LoginError } from '../../../enums/LoginError';
import { LoginFormInput } from '../../../interfaces/FormInputs/Login';
import { getEmptyLoginFormInput } from '../../../utils/login/initialValues';
import { getLoginSchema } from '../../../utils/login/schemas/login';
import { CheckboxField } from '../../Fields/Checkbox/Checkbox';
import { PasswordField } from '../../Fields/Password/Password';
import { TextField } from '../../Fields/Text/Text';
import { Form } from '../../Form/Form';
import { LoginWithCredentialsProps } from './Credentials.types';

export const LoginWithCredentials = ({ onLogin }: LoginWithCredentialsProps) => {
  const { t } = useTranslation();
  const { loginWithCredentials } = useLogin();
  const [error, setError] = useState<LoginError | null>(null);
  const [rememberMe, setRememberMe] = useState(true);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormInput>({
    defaultValues: getEmptyLoginFormInput(),
    resolver: yupResolver(getLoginSchema(t)),
  });

  const onSubmit = useCallback(
    async (credentials: LoginFormInput) => {
      setError(null);
      try {
        const tenants = await loginWithCredentials(credentials, rememberMe);
        onLogin(tenants);
      } catch (error) {
        setError(error as LoginError);
      }
    },
    [loginWithCredentials, rememberMe, onLogin],
  );

  return (
    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Grid2 container spacing={{ xs: 2, sm: 3 }}>
        <Grid2 size={12} sx={{ textAlign: 'center' }}>
          <Typography variant="bodyLg" sx={(theme) => ({ color: theme.palette.grey[600] })}>
            {t('common.component.login.text.use_credentials')}
          </Typography>
        </Grid2>
        <Grid2 size={12}>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <TextField
                label={t('common.component.login.field.username')}
                type="email"
                autoComplete="username"
                error={!!errors.username}
                helperText={errors.username?.message}
                {...field}
              />
            )}
          />
        </Grid2>
        <Grid2 size={12}>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <PasswordField
                label={t('common.component.login.field.password')}
                autoComplete="current-password"
                error={!!errors.password}
                helperText={errors.password?.message}
                {...field}
              />
            )}
          />
        </Grid2>
        <Grid2 size={12}>
          <CheckboxField
            checked={rememberMe}
            label={t('common.component.login.field.remember_me')}
            labelVariant="h5"
            onChange={(event) => {
              setRememberMe(event.target.checked);
            }}
          />
        </Grid2>
        {error && (
          <Grid2 size={12}>
            <FormHelperText error>{t(`common.enum.login_error.${error}`)}</FormHelperText>
          </Grid2>
        )}
        <Grid2 size={12}>
          <Button fullWidth type="submit">
            {t('common.component.login.action.sign_in')}
          </Button>
        </Grid2>
      </Grid2>
    </Form>
  );
};
