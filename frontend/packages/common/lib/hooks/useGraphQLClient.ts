import { devtoolsExchange } from '@urql/devtools';
import { authExchange } from '@urql/exchange-auth';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Client, OperationResult, fetchExchange } from 'urql';

import { useAuth } from '../contexts/auth/hook';
import { RefreshTokenDocument, RefreshTokenMutation } from '../gql/RealGimm.WebCommon.Login.operation';

export const useGraphQlClient = (navigate: (to: string) => Promise<void>) => {
  const { accessToken, isSignedIn, refreshToken, signOut, updateAuth } = useAuth();
  const {
    i18n: { language },
  } = useTranslation();

  const client = useMemo(
    () =>
      new Client({
        url: '/api/v1/graphql',
        exchanges: [
          devtoolsExchange,
          authExchange((utilities) =>
            Promise.resolve({
              addAuthToOperation(operation) {
                return accessToken
                  ? utilities.appendHeaders(operation, {
                      Authorization: `Bearer ${accessToken}`,
                    })
                  : operation;
              },
              didAuthError(error) {
                return error.graphQLErrors.some((e) => e.extensions.code === 'AUTH_NOT_AUTHORIZED');
              },
              async refreshAuth() {
                if (accessToken && refreshToken) {
                  const result: OperationResult<RefreshTokenMutation> = await utilities.mutate(RefreshTokenDocument, {
                    accessToken,
                    refreshToken,
                  });

                  const auth = result.data?.login.refreshAccessToken;
                  if (auth) {
                    updateAuth(auth);
                    return;
                  }
                }

                if (isSignedIn) {
                  signOut();
                  return navigate('/');
                }
              },
            }),
          ),
          fetchExchange,
        ],
        fetchOptions: {
          headers: {
            'Accept-Language': language,
            'Graphql-Preflight': '1',
          },
        },
        fetchSubscriptions: true,
        requestPolicy: 'network-only',
      }),
    [language, accessToken, refreshToken, isSignedIn, updateAuth, signOut, navigate],
  );

  return client;
};
