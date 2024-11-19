// @ts-nocheck
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { ValidationErrorFragmentDoc } from './RealGimm.WebCommon.ValidationError.fragment';
import * as Types from './types';

export type MarkNotificationsAsViewMutationVariables = Types.Exact<{ [key: string]: never }>;

export type MarkNotificationsAsViewMutation = {
  __typename?: 'Mutation';
  notification: {
    __typename?: 'NotificationMutations';
    markNewAsUnread: {
      __typename?: 'Result';
      errors?: Array<string | null> | null;
      isSuccess: boolean;
      validationErrors?: Array<{
        __typename?: 'ValidationError';
        identifier?: string | null;
        errorMessage?: string | null;
        errorCode?: string | null;
        severity: Types.ValidationSeverity;
      } | null> | null;
    };
  };
};

export type MarkNotificationsAsReadMutationVariables = Types.Exact<{
  ids?: Types.InputMaybe<Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input']>;
}>;

export type MarkNotificationsAsReadMutation = {
  __typename?: 'Mutation';
  notification: {
    __typename?: 'NotificationMutations';
    markAsRead: {
      __typename?: 'Result';
      errors?: Array<string | null> | null;
      isSuccess: boolean;
      validationErrors?: Array<{
        __typename?: 'ValidationError';
        identifier?: string | null;
        errorMessage?: string | null;
        errorCode?: string | null;
        severity: Types.ValidationSeverity;
      } | null> | null;
    };
  };
};

export const MarkNotificationsAsViewDocument = gql`
  mutation markNotificationsAsView {
    notification {
      markNewAsUnread {
        errors
        isSuccess
        validationErrors {
          ...ValidationErrorFragment
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
`;

export function useMarkNotificationsAsViewMutation() {
  return Urql.useMutation<MarkNotificationsAsViewMutation, MarkNotificationsAsViewMutationVariables>(
    MarkNotificationsAsViewDocument,
  );
}
export const MarkNotificationsAsReadDocument = gql`
  mutation markNotificationsAsRead($ids: [Int!]) {
    notification {
      markAsRead(ids: $ids) {
        errors
        isSuccess
        validationErrors {
          ...ValidationErrorFragment
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
`;

export function useMarkNotificationsAsReadMutation() {
  return Urql.useMutation<MarkNotificationsAsReadMutation, MarkNotificationsAsReadMutationVariables>(
    MarkNotificationsAsReadDocument,
  );
}
