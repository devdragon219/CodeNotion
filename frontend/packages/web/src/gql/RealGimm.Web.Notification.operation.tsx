// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { NotificationFragmentDoc } from './RealGimm.Web.Notification.fragment';
import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';

export type GetNotificationsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.NotificationFilterInput>;
  order?: Types.InputMaybe<Array<Types.NotificationSortInput> | Types.NotificationSortInput>;
}>;

export type GetNotificationsQuery = {
  __typename?: 'Query';
  notification: {
    __typename?: 'NotificationQueries';
    listNotifications?: {
      __typename?: 'ListNotificationsConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<
        | {
            __typename: 'CatalogueItemDocumentExpiredNotification';
            estateId: number;
            catalogueTypeId: number;
            entityId: number;
            username: string;
            timestamp: string;
            status: Types.NotificationStatus;
            id: number;
          }
        | {
            __typename: 'ContractDocumentExpiredNotification';
            isContractActive: boolean;
            isContractSublocated: boolean;
            entityId: number;
            username: string;
            timestamp: string;
            status: Types.NotificationStatus;
            id: number;
          }
        | {
            __typename: 'ContractsExpirationNotification';
            contractIds: Array<number>;
            daysToExpiration: number;
            isActiveContracts: boolean;
            username: string;
            timestamp: string;
            status: Types.NotificationStatus;
            id: number;
          }
        | {
            __typename: 'CostChargesExpirationNotification';
            costChargeIds: Array<number>;
            daysToExpiration: number;
            username: string;
            timestamp: string;
            status: Types.NotificationStatus;
            id: number;
          }
        | {
            __typename: 'EstateDocumentExpiredNotification';
            entityId: number;
            username: string;
            timestamp: string;
            status: Types.NotificationStatus;
            id: number;
          }
        | {
            __typename: 'EstatePortfolioExportIsReadyNotification';
            downloadGuid?: string | null;
            username: string;
            timestamp: string;
            status: Types.NotificationStatus;
            id: number;
          }
        | {
            __typename: 'EstateUnitDocumentExpiredNotification';
            entityId: number;
            username: string;
            timestamp: string;
            status: Types.NotificationStatus;
            id: number;
          }
        | {
            __typename: 'PasswordExpirationNotification';
            passwordExpirationDate: string;
            username: string;
            timestamp: string;
            status: Types.NotificationStatus;
            id: number;
          }
        | {
            __typename: 'SubjectDocumentExpiredNotification';
            entityId: number;
            username: string;
            timestamp: string;
            status: Types.NotificationStatus;
            id: number;
          }
      > | null;
    } | null;
  };
};

export type GetAllNotificationsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.NotificationFilterInput>;
  order?: Types.InputMaybe<Array<Types.NotificationSortInput> | Types.NotificationSortInput>;
}>;

export type GetAllNotificationsQuery = {
  __typename?: 'Query';
  notification: {
    __typename?: 'NotificationQueries';
    listNotificationsFull: Array<
      | {
          __typename: 'CatalogueItemDocumentExpiredNotification';
          estateId: number;
          catalogueTypeId: number;
          entityId: number;
          username: string;
          timestamp: string;
          status: Types.NotificationStatus;
          id: number;
        }
      | {
          __typename: 'ContractDocumentExpiredNotification';
          isContractActive: boolean;
          isContractSublocated: boolean;
          entityId: number;
          username: string;
          timestamp: string;
          status: Types.NotificationStatus;
          id: number;
        }
      | {
          __typename: 'ContractsExpirationNotification';
          contractIds: Array<number>;
          daysToExpiration: number;
          isActiveContracts: boolean;
          username: string;
          timestamp: string;
          status: Types.NotificationStatus;
          id: number;
        }
      | {
          __typename: 'CostChargesExpirationNotification';
          costChargeIds: Array<number>;
          daysToExpiration: number;
          username: string;
          timestamp: string;
          status: Types.NotificationStatus;
          id: number;
        }
      | {
          __typename: 'EstateDocumentExpiredNotification';
          entityId: number;
          username: string;
          timestamp: string;
          status: Types.NotificationStatus;
          id: number;
        }
      | {
          __typename: 'EstatePortfolioExportIsReadyNotification';
          downloadGuid?: string | null;
          username: string;
          timestamp: string;
          status: Types.NotificationStatus;
          id: number;
        }
      | {
          __typename: 'EstateUnitDocumentExpiredNotification';
          entityId: number;
          username: string;
          timestamp: string;
          status: Types.NotificationStatus;
          id: number;
        }
      | {
          __typename: 'PasswordExpirationNotification';
          passwordExpirationDate: string;
          username: string;
          timestamp: string;
          status: Types.NotificationStatus;
          id: number;
        }
      | {
          __typename: 'SubjectDocumentExpiredNotification';
          entityId: number;
          username: string;
          timestamp: string;
          status: Types.NotificationStatus;
          id: number;
        }
    >;
  };
};

export type GetLastNotificationsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetLastNotificationsQuery = {
  __typename?: 'Query';
  notification: {
    __typename?: 'NotificationQueries';
    lastNotifications: Array<
      | {
          __typename: 'CatalogueItemDocumentExpiredNotification';
          estateId: number;
          catalogueTypeId: number;
          entityId: number;
          username: string;
          timestamp: string;
          status: Types.NotificationStatus;
          id: number;
        }
      | {
          __typename: 'ContractDocumentExpiredNotification';
          isContractActive: boolean;
          isContractSublocated: boolean;
          entityId: number;
          username: string;
          timestamp: string;
          status: Types.NotificationStatus;
          id: number;
        }
      | {
          __typename: 'ContractsExpirationNotification';
          contractIds: Array<number>;
          daysToExpiration: number;
          isActiveContracts: boolean;
          username: string;
          timestamp: string;
          status: Types.NotificationStatus;
          id: number;
        }
      | {
          __typename: 'CostChargesExpirationNotification';
          costChargeIds: Array<number>;
          daysToExpiration: number;
          username: string;
          timestamp: string;
          status: Types.NotificationStatus;
          id: number;
        }
      | {
          __typename: 'EstateDocumentExpiredNotification';
          entityId: number;
          username: string;
          timestamp: string;
          status: Types.NotificationStatus;
          id: number;
        }
      | {
          __typename: 'EstatePortfolioExportIsReadyNotification';
          downloadGuid?: string | null;
          username: string;
          timestamp: string;
          status: Types.NotificationStatus;
          id: number;
        }
      | {
          __typename: 'EstateUnitDocumentExpiredNotification';
          entityId: number;
          username: string;
          timestamp: string;
          status: Types.NotificationStatus;
          id: number;
        }
      | {
          __typename: 'PasswordExpirationNotification';
          passwordExpirationDate: string;
          username: string;
          timestamp: string;
          status: Types.NotificationStatus;
          id: number;
        }
      | {
          __typename: 'SubjectDocumentExpiredNotification';
          entityId: number;
          username: string;
          timestamp: string;
          status: Types.NotificationStatus;
          id: number;
        }
    >;
  };
};

export type DeleteNotificationsMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeleteNotificationsMutation = {
  __typename?: 'Mutation';
  notification: {
    __typename?: 'NotificationMutations';
    deleteRange: {
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

export const GetNotificationsDocument = gql`
  query getNotifications(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: NotificationFilterInput
    $order: [NotificationSortInput!]
  ) {
    notification {
      listNotifications(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...NotificationFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${NotificationFragmentDoc}
`;

export function useGetNotificationsQuery(options?: Omit<Urql.UseQueryArgs<GetNotificationsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetNotificationsQuery, GetNotificationsQueryVariables>({
    query: GetNotificationsDocument,
    ...options,
  });
}
export const GetAllNotificationsDocument = gql`
  query getAllNotifications($where: NotificationFilterInput, $order: [NotificationSortInput!]) {
    notification {
      listNotificationsFull(where: $where, order: $order) {
        ...NotificationFragment
      }
    }
  }
  ${NotificationFragmentDoc}
`;

export function useGetAllNotificationsQuery(
  options?: Omit<Urql.UseQueryArgs<GetAllNotificationsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetAllNotificationsQuery, GetAllNotificationsQueryVariables>({
    query: GetAllNotificationsDocument,
    ...options,
  });
}
export const GetLastNotificationsDocument = gql`
  query getLastNotifications {
    notification {
      lastNotifications {
        ...NotificationFragment
      }
    }
  }
  ${NotificationFragmentDoc}
`;

export function useGetLastNotificationsQuery(
  options?: Omit<Urql.UseQueryArgs<GetLastNotificationsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetLastNotificationsQuery, GetLastNotificationsQueryVariables>({
    query: GetLastNotificationsDocument,
    ...options,
  });
}
export const DeleteNotificationsDocument = gql`
  mutation deleteNotifications($ids: [Int!]!) {
    notification {
      deleteRange(ids: $ids) {
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

export function useDeleteNotificationsMutation() {
  return Urql.useMutation<DeleteNotificationsMutation, DeleteNotificationsMutationVariables>(
    DeleteNotificationsDocument,
  );
}
