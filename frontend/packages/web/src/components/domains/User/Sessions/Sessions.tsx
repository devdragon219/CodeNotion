import { Computer, Smartphone } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import { Loader, SecondaryTable } from '@realgimm5/frontend-common/components';
import { MOBILE_USER_AGENT_REGEX } from '@realgimm5/frontend-common/configs';
import { useSnackbar } from '@realgimm5/frontend-common/contexts';
import { parseStringToDate, parseStringToLocalizedDate } from '@realgimm5/frontend-common/utils';
import { useCallback, useMemo, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  useGetUserSessionsQuery,
  useRevokeAllUserSessionsMutation,
  useRevokeUserSessionMutation,
} from '../../../../gql/RealGimm.Web.Admin.operation';
import { UserSessionsProps } from './Sessions.types';

export const UserSessions = ({ control, readonly }: UserSessionsProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { showError } = useSnackbar();
  const userId = useWatch({ control, name: 'userId' });
  const [, revokeUserSessionMutation] = useRevokeUserSessionMutation();
  const [, revokeAllUserSessionsMutation] = useRevokeAllUserSessionsMutation();
  const [loading, setLoading] = useState(false);
  const [queryState, reexecuteQuery] = useGetUserSessionsQuery({
    variables: {
      userId: Number(userId),
    },
  });
  const sessions = useMemo(() => queryState.data?.admin.user?.sessions ?? [], [queryState.data?.admin.user?.sessions]);

  const handleRevoke = useCallback(
    async (index: number) => {
      setLoading(true);
      const result = await revokeUserSessionMutation({
        sessionId: sessions[index].id,
        userId: Number(userId),
      });
      setLoading(false);
      if (result.data?.admin.revokeSession.isSuccess) {
        reexecuteQuery();
      } else {
        showError(result.data?.admin.revokeSession.validationErrors);
      }
    },
    [reexecuteQuery, revokeUserSessionMutation, sessions, showError, userId],
  );

  const handleRevokeAll = useCallback(async () => {
    setLoading(true);
    const result = await revokeAllUserSessionsMutation({
      userId: Number(userId),
    });
    setLoading(false);
    if (result.data?.admin.revokeAllSessions.isSuccess) {
      reexecuteQuery();
    } else {
      showError(result.data?.admin.revokeAllSessions.validationErrors);
    }
  }, [reexecuteQuery, revokeAllUserSessionsMutation, showError, userId]);

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {(queryState.fetching || loading) && <Loader />}
      <Grid2 size={12}>
        <Button color="tertiary" variant="outlined" onClick={handleRevokeAll}>
          {t('user.action.revoke_all_sessions')}
        </Button>
      </Grid2>
      <Grid2 size={12}>
        <SecondaryTable
          columns={[
            'user.field.session_creation_date',
            'user.field.session_ip_address',
            'user.field.session_ip_location',
            'user.field.session_user_agent',
            'user.field.session_expiration_date',
          ]}
          rows={sessions.map((entry) => [
            parseStringToLocalizedDate(entry.creationDate, language, {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            }),
            entry.loginIPAddress,
            entry.loginLocation,
            MOBILE_USER_AGENT_REGEX.test(entry.loginUserAgent ?? '') ? (
              <Smartphone key={entry.id} />
            ) : (
              <Computer key={entry.id} />
            ),
            parseStringToDate(entry.refreshTokenExpiration),
          ])}
          onRowDelete={!readonly ? handleRevoke : undefined}
        />
      </Grid2>
    </Grid2>
  );
};
