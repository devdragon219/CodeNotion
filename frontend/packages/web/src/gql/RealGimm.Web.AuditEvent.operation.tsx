// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { AuditLogFragmentDoc } from './RealGimm.Web.AuditLog.fragment';
import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';

export type GetAuditEventsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.AuditLogFilterInput>;
  order?: Types.InputMaybe<Array<Types.AuditLogSortInput> | Types.AuditLogSortInput>;
}>;

export type GetAuditEventsQuery = {
  __typename?: 'Query';
  admin: {
    __typename?: 'AdminQueries';
    listAuditEvents?: {
      __typename?: 'ListAuditEventsConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'AuditLog';
        id: number;
        tablePk: string;
        entityType: string;
        auditUser: string;
        action: string;
        auditDate: string;
        auditData?: string | null;
      }> | null;
    } | null;
  };
};

export const GetAuditEventsDocument = gql`
  query getAuditEvents(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: AuditLogFilterInput
    $order: [AuditLogSortInput!]
  ) {
    admin {
      listAuditEvents(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...AuditLogFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${AuditLogFragmentDoc}
`;

export function useGetAuditEventsQuery(options?: Omit<Urql.UseQueryArgs<GetAuditEventsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAuditEventsQuery, GetAuditEventsQueryVariables>({
    query: GetAuditEventsDocument,
    ...options,
  });
}
