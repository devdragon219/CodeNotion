import { Divider, Grid2, Stack, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import logo from '../../assets/images/logo.png';
import { useLogin } from '../../contexts/login/hook.ts';
import { LoginMethod } from '../../enums/LoginMethod.ts';
import { JwtTenant } from '../../interfaces/JWT.ts';
import { LoginWithCredentials } from './Credentials/Credentials';
import { TenantsDialog } from './Dialog/Dialog';
import { LoginWithOidc } from './OIDC/OIDC';

export const Login = () => {
  const { t } = useTranslation();
  const { loginMethods, selectTenant } = useLogin();
  const [hasTenantError, setHasTenantError] = useState(false);
  const [tenants, setTenants] = useState<JwtTenant[]>([]);

  const handleCloseDialog = useCallback(() => {
    setTenants([]);
    setHasTenantError(false);
  }, []);

  const handleSelectTenant = useCallback(
    (tenant: string) => async () => {
      setHasTenantError(false);
      try {
        await selectTenant(tenant);
        setTenants([]);
      } catch {
        setHasTenantError(true);
      }
    },
    [selectTenant],
  );

  return (
    <Grid2 container spacing={2.5} sx={{ alignItems: 'center', justifyContent: 'center' }}>
      <Grid2 size={12}>
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Stack>
            <Typography variant="h2" sx={(theme) => ({ color: theme.palette.blue[500] })}>
              {t('common.component.login.title')}
            </Typography>
            <Typography variant="bodyMd" sx={(theme) => ({ color: theme.palette.grey[700] })}>
              {t('common.component.login.text.description')}
            </Typography>
          </Stack>
          <img src={logo} style={{ height: '39px' }} />
        </Stack>
      </Grid2>
      {loginMethods.length !== 0 && (
        <Grid2 size={12}>
          <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
            {loginMethods.includes(LoginMethod.Jwt) && <LoginWithCredentials onLogin={setTenants} />}
            {loginMethods.includes(LoginMethod.Oidc) && <LoginWithOidc onLogin={setTenants} />}
          </Stack>
        </Grid2>
      )}
      {tenants.length > 1 && (
        <TenantsDialog
          hasError={hasTenantError}
          tenants={tenants}
          onClose={handleCloseDialog}
          onSelect={handleSelectTenant}
        />
      )}
    </Grid2>
  );
};
