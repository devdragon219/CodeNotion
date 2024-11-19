// @ts-nocheck
import gql from 'graphql-tag';
import * as Urql from 'urql';

import * as Types from './types';

export type NotificationsSubscriptionVariables = Types.Exact<{ [key: string]: never }>;

export type NotificationsSubscription = {
  __typename?: 'Subscription';
  notifyUser:
    | { __typename?: 'CatalogueItemDocumentExpiredNotification'; id: number }
    | { __typename?: 'ContractDocumentExpiredNotification'; id: number }
    | { __typename?: 'ContractsExpirationNotification'; id: number }
    | { __typename?: 'CostChargesExpirationNotification'; id: number }
    | { __typename?: 'EstateDocumentExpiredNotification'; id: number }
    | { __typename?: 'EstatePortfolioExportIsReadyNotification'; id: number }
    | { __typename?: 'EstateUnitDocumentExpiredNotification'; id: number }
    | { __typename?: 'PasswordExpirationNotification'; id: number }
    | { __typename?: 'SubjectDocumentExpiredNotification'; id: number };
};

export const NotificationsDocument = gql`
  subscription notifications {
    notifyUser {
      id
    }
  }
`;

export function useNotificationsSubscription<TData = NotificationsSubscription>(
  options?: Omit<Urql.UseSubscriptionArgs<NotificationsSubscriptionVariables>, 'query'>,
  handler?: Urql.SubscriptionHandler<NotificationsSubscription, TData>,
) {
  return Urql.useSubscription<NotificationsSubscription, TData, NotificationsSubscriptionVariables>(
    { query: NotificationsDocument, ...options },
    handler,
  );
}
