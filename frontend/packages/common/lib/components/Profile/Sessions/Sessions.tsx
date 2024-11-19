import { Computer, Smartphone } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { MOBILE_USER_AGENT_REGEX } from '../../../configs/regex';
import { useSnackbar } from '../../../contexts/snackbar/hook';
import {
  useGetSessionsQuery,
  useRevokeAllSessionsMutation,
  useRevokeSessionMutation,
} from '../../../gql/RealGimm.WebCommon.User.operation';
import { parseStringToLocalizedDate } from '../../../utils/stringUtils';
import { Loader } from '../../Loader/Loader';
import { SecondaryTable } from '../../Tables/Secondary/Secondary';

export const ProfileSessions = () => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { showError } = useSnackbar();
  const [, revokeSessionMutation] = useRevokeSessionMutation();
  const [, revokeAllSessionsMutation] = useRevokeAllSessionsMutation();
  const [loading, setLoading] = useState(false);
  const [queryState, reexecuteQuery] = useGetSessionsQuery();
  const sessions = useMemo(() => queryState.data?.user.sessions ?? [], [queryState.data?.user.sessions]);

  const handleRevoke = useCallback(
    async (index: number) => {
      setLoading(true);
      const result = await revokeSessionMutation({
        sessionId: sessions[index].id,
      });
      setLoading(false);
      if (result.data?.user.revokeSession.isSuccess) {
        reexecuteQuery();
      } else {
        showError(result.data?.user.revokeSession.validationErrors);
      }
    },
    [reexecuteQuery, revokeSessionMutation, sessions, showError],
  );

  const handleRevokeAll = useCallback(async () => {
    setLoading(true);
    const result = await revokeAllSessionsMutation({});
    setLoading(false);
    if (result.data?.user.revokeAllSessions.isSuccess) {
      reexecuteQuery();
    } else {
      showError(result.data?.user.revokeAllSessions.validationErrors);
    }
  }, [reexecuteQuery, revokeAllSessionsMutation, showError]);

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {(queryState.fetching || loading) && <Loader />}
      <Grid2 size={12}>
        <Button color="tertiary" variant="outlined" onClick={handleRevokeAll}>
          {t('common.component.profile.action.revoke_all_sessions')}
        </Button>
      </Grid2>
      <Grid2 size={12}>
        <SecondaryTable
          columns={[
            'common.component.profile.field.session_creation_date',
            'common.component.profile.field.session_ip_address',
            'common.component.profile.field.session_ip_location',
            'common.component.profile.field.session_user_agent',
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
          ])}
          onRowDelete={handleRevoke}
        />
      </Grid2>
    </Grid2>
  );
};
