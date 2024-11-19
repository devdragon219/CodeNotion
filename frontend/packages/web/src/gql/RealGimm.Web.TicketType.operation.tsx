// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { TicketTypeFragmentDoc } from './RealGimm.Web.TicketType.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';

export type GetTicketTypesQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.TicketTypeFilterInput>;
  order?: Types.InputMaybe<Array<Types.TicketTypeSortInput> | Types.TicketTypeSortInput>;
}>;

export type GetTicketTypesQuery = {
  __typename?: 'Query';
  ticketType: {
    __typename?: 'TicketTypeQueries';
    listTicketTypes?: {
      __typename?: 'ListTicketTypesConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'TicketType';
        internalCode: string;
        description: string;
        ordering: number;
        id: number;
      }> | null;
    } | null;
  };
};

export type AddTicketTypeMutationVariables = Types.Exact<{
  input: Types.TicketTypeInput;
}>;

export type AddTicketTypeMutation = {
  __typename?: 'Mutation';
  ticketType: {
    __typename?: 'TicketTypeMutations';
    add: {
      __typename?: 'ResultOfTicketType';
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

export type UpdateTicketTypeMutationVariables = Types.Exact<{
  ticketTypeId: Types.Scalars['Int']['input'];
  input: Types.TicketTypeInput;
}>;

export type UpdateTicketTypeMutation = {
  __typename?: 'Mutation';
  ticketType: {
    __typename?: 'TicketTypeMutations';
    update: {
      __typename?: 'ResultOfTicketType';
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

export type DeleteTicketTypesMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeleteTicketTypesMutation = {
  __typename?: 'Mutation';
  ticketType: {
    __typename?: 'TicketTypeMutations';
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

export type GetTicketTypeInternalCodeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetTicketTypeInternalCodeQuery = {
  __typename?: 'Query';
  ticketType: { __typename?: 'TicketTypeQueries'; proposeNewInternalCode?: string | null };
};

export type CanUseTicketTypeInternalCodeQueryVariables = Types.Exact<{
  internalCode: Types.Scalars['String']['input'];
  currentTicketTypeId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CanUseTicketTypeInternalCodeQuery = {
  __typename?: 'Query';
  ticketType: { __typename?: 'TicketTypeQueries'; canUseInternalCode: boolean };
};

export type ExportTicketTypesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.TicketTypeFilterInput>;
  order?: Types.InputMaybe<Array<Types.TicketTypeSortInput> | Types.TicketTypeSortInput>;
}>;

export type ExportTicketTypesQuery = {
  __typename?: 'Query';
  ticketType: {
    __typename?: 'TicketTypeQueries';
    exportToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string };
  };
};

export const GetTicketTypesDocument = gql`
  query getTicketTypes(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: TicketTypeFilterInput
    $order: [TicketTypeSortInput!]
  ) {
    ticketType {
      listTicketTypes(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...TicketTypeFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${TicketTypeFragmentDoc}
`;

export function useGetTicketTypesQuery(options?: Omit<Urql.UseQueryArgs<GetTicketTypesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetTicketTypesQuery, GetTicketTypesQueryVariables>({
    query: GetTicketTypesDocument,
    ...options,
  });
}
export const AddTicketTypeDocument = gql`
  mutation addTicketType($input: TicketTypeInput!) {
    ticketType {
      add(input: $input) {
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

export function useAddTicketTypeMutation() {
  return Urql.useMutation<AddTicketTypeMutation, AddTicketTypeMutationVariables>(AddTicketTypeDocument);
}
export const UpdateTicketTypeDocument = gql`
  mutation updateTicketType($ticketTypeId: Int!, $input: TicketTypeInput!) {
    ticketType {
      update(id: $ticketTypeId, input: $input) {
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

export function useUpdateTicketTypeMutation() {
  return Urql.useMutation<UpdateTicketTypeMutation, UpdateTicketTypeMutationVariables>(UpdateTicketTypeDocument);
}
export const DeleteTicketTypesDocument = gql`
  mutation deleteTicketTypes($ids: [Int!]!) {
    ticketType {
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

export function useDeleteTicketTypesMutation() {
  return Urql.useMutation<DeleteTicketTypesMutation, DeleteTicketTypesMutationVariables>(DeleteTicketTypesDocument);
}
export const GetTicketTypeInternalCodeDocument = gql`
  query getTicketTypeInternalCode {
    ticketType {
      proposeNewInternalCode
    }
  }
`;

export function useGetTicketTypeInternalCodeQuery(
  options?: Omit<Urql.UseQueryArgs<GetTicketTypeInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetTicketTypeInternalCodeQuery, GetTicketTypeInternalCodeQueryVariables>({
    query: GetTicketTypeInternalCodeDocument,
    ...options,
  });
}
export const CanUseTicketTypeInternalCodeDocument = gql`
  query canUseTicketTypeInternalCode($internalCode: String!, $currentTicketTypeId: Int) {
    ticketType {
      canUseInternalCode(internalCode: $internalCode, currentTicketTypeId: $currentTicketTypeId)
    }
  }
`;

export function useCanUseTicketTypeInternalCodeQuery(
  options: Omit<Urql.UseQueryArgs<CanUseTicketTypeInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<CanUseTicketTypeInternalCodeQuery, CanUseTicketTypeInternalCodeQueryVariables>({
    query: CanUseTicketTypeInternalCodeDocument,
    ...options,
  });
}
export const ExportTicketTypesDocument = gql`
  query exportTicketTypes($where: TicketTypeFilterInput, $order: [TicketTypeSortInput!]) {
    ticketType {
      exportToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportTicketTypesQuery(options?: Omit<Urql.UseQueryArgs<ExportTicketTypesQueryVariables>, 'query'>) {
  return Urql.useQuery<ExportTicketTypesQuery, ExportTicketTypesQueryVariables>({
    query: ExportTicketTypesDocument,
    ...options,
  });
}
