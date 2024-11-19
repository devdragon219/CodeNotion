import { Button, FormHelperText, Stack } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useLogin } from '../../../contexts/login/hook';
import { LoginWithOidcProps } from './OIDC.types';

export const LoginWithOidc = ({ onLogin }: LoginWithOidcProps) => {
  const { t } = useTranslation();
  const { loginWithOidc, loginWithOidcCallback } = useLogin();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    loginWithOidcCallback()
      .then(onLogin)
      .catch(() => ({}));
    // eslint-disable-next-line
  }, []);

  const handleLogin = useCallback(async () => {
    setHasError(false);
    try {
      await loginWithOidc();
    } catch {
      setHasError(true);
    }
  }, [loginWithOidc]);

  return (
    <Stack spacing={{ xs: 2, sm: 3 }}>
      <Button fullWidth onClick={handleLogin}>
        {t('common.component.login.action.sign_in_with_oidc')}
      </Button>
      {hasError && <FormHelperText error>{t('common.component.login.error.invalid_oidc')}</FormHelperText>}
    </Stack>
  );
};
