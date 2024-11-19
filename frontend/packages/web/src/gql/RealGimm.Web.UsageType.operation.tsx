// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { UsageTypeFragmentDoc } from './RealGimm.Web.EstateUsageType.fragment';
import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { UsageTypeDistributionFragmentDoc } from './RealGimm.Web.UsageTypeDistribution.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';

export type GetUsageTypesQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.EstateUsageTypeFilterInput>;
  order?: Types.InputMaybe<Array<Types.EstateUsageTypeSortInput> | Types.EstateUsageTypeSortInput>;
}>;

export type GetUsageTypesQuery = {
  __typename?: 'Query';
  estateUsageType: {
    __typename?: 'EstateUsageTypeQueries';
    listEstateUsageTypes?: {
      __typename?: 'ListEstateUsageTypesConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'EstateUsageType';
        id: number;
        name: string;
        internalCode: string;
        ordering: number;
        isForEstate: boolean;
        isForEstateUnit: boolean;
        isForEstateSubUnit: boolean;
        isForContracts: boolean;
      }> | null;
    } | null;
  };
};

export type AddUsageTypeMutationVariables = Types.Exact<{
  input: Types.EstateUsageTypeInput;
}>;

export type AddUsageTypeMutation = {
  __typename?: 'Mutation';
  estateUsageType: {
    __typename?: 'EstateUsageTypeMutations';
    add: {
      __typename?: 'ResultOfEstateUsageType';
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

export type UpdateUsageTypeMutationVariables = Types.Exact<{
  usageTypeId: Types.Scalars['Int']['input'];
  input: Types.EstateUsageTypeInput;
}>;

export type UpdateUsageTypeMutation = {
  __typename?: 'Mutation';
  estateUsageType: {
    __typename?: 'EstateUsageTypeMutations';
    update: {
      __typename?: 'ResultOfEstateUsageType';
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

export type DeleteUsageTypesMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeleteUsageTypesMutation = {
  __typename?: 'Mutation';
  estateUsageType: {
    __typename?: 'EstateUsageTypeMutations';
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

export type ExportUsageTypesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.EstateUsageTypeFilterInput>;
  order?: Types.InputMaybe<Array<Types.EstateUsageTypeSortInput> | Types.EstateUsageTypeSortInput>;
}>;

export type ExportUsageTypesQuery = {
  __typename?: 'Query';
  estateUsageType: {
    __typename?: 'EstateUsageTypeQueries';
    exportToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string };
  };
};

export type GetUsageTypeInternalCodeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetUsageTypeInternalCodeQuery = {
  __typename?: 'Query';
  estateUsageType: { __typename?: 'EstateUsageTypeQueries'; proposeNewInternalCode?: string | null };
};

export type CanUseUsageTypeInternalCodeQueryVariables = Types.Exact<{
  internalCode: Types.Scalars['String']['input'];
  currentUsageTypeId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CanUseUsageTypeInternalCodeQuery = {
  __typename?: 'Query';
  estateUsageType: { __typename?: 'EstateUsageTypeQueries'; canUseInternalCode: boolean };
};

export type GetUsageTypeDistributionQueryVariables = Types.Exact<{
  showAll: Types.Scalars['Boolean']['input'];
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.UsageTypeDistributionFilterInput>;
  order?: Types.InputMaybe<Array<Types.UsageTypeDistributionSortInput> | Types.UsageTypeDistributionSortInput>;
}>;

export type GetUsageTypeDistributionQuery = {
  __typename?: 'Query';
  estateUsageType: {
    __typename?: 'EstateUsageTypeQueries';
    usageTypeDistribution?: {
      __typename?: 'UsageTypeDistributionConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{ __typename?: 'UsageTypeDistribution'; percentage: number; usageTypeName: string }> | null;
    } | null;
  };
};

export type GetAllUsageTypesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.EstateUsageTypeFilterInput>;
  order?: Types.InputMaybe<Array<Types.EstateUsageTypeSortInput> | Types.EstateUsageTypeSortInput>;
}>;

export type GetAllUsageTypesQuery = {
  __typename?: 'Query';
  estateUsageType: {
    __typename?: 'EstateUsageTypeQueries';
    listEstateUsageTypesFull: Array<{
      __typename?: 'EstateUsageType';
      id: number;
      name: string;
      internalCode: string;
      ordering: number;
      isForEstate: boolean;
      isForEstateUnit: boolean;
      isForEstateSubUnit: boolean;
      isForContracts: boolean;
    }>;
  };
};

export const GetUsageTypesDocument = gql`
  query getUsageTypes(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: EstateUsageTypeFilterInput
    $order: [EstateUsageTypeSortInput!]
  ) {
    estateUsageType {
      listEstateUsageTypes(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...UsageTypeFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${UsageTypeFragmentDoc}
`;

export function useGetUsageTypesQuery(options?: Omit<Urql.UseQueryArgs<GetUsageTypesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUsageTypesQuery, GetUsageTypesQueryVariables>({ query: GetUsageTypesDocument, ...options });
}
export const AddUsageTypeDocument = gql`
  mutation addUsageType($input: EstateUsageTypeInput!) {
    estateUsageType {
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

export function useAddUsageTypeMutation() {
  return Urql.useMutation<AddUsageTypeMutation, AddUsageTypeMutationVariables>(AddUsageTypeDocument);
}
export const UpdateUsageTypeDocument = gql`
  mutation updateUsageType($usageTypeId: Int!, $input: EstateUsageTypeInput!) {
    estateUsageType {
      update(id: $usageTypeId, input: $input) {
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

export function useUpdateUsageTypeMutation() {
  return Urql.useMutation<UpdateUsageTypeMutation, UpdateUsageTypeMutationVariables>(UpdateUsageTypeDocument);
}
export const DeleteUsageTypesDocument = gql`
  mutation deleteUsageTypes($ids: [Int!]!) {
    estateUsageType {
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

export function useDeleteUsageTypesMutation() {
  return Urql.useMutation<DeleteUsageTypesMutation, DeleteUsageTypesMutationVariables>(DeleteUsageTypesDocument);
}
export const ExportUsageTypesDocument = gql`
  query exportUsageTypes($where: EstateUsageTypeFilterInput, $order: [EstateUsageTypeSortInput!]) {
    estateUsageType {
      exportToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportUsageTypesQuery(options?: Omit<Urql.UseQueryArgs<ExportUsageTypesQueryVariables>, 'query'>) {
  return Urql.useQuery<ExportUsageTypesQuery, ExportUsageTypesQueryVariables>({
    query: ExportUsageTypesDocument,
    ...options,
  });
}
export const GetUsageTypeInternalCodeDocument = gql`
  query getUsageTypeInternalCode {
    estateUsageType {
      proposeNewInternalCode
    }
  }
`;

export function useGetUsageTypeInternalCodeQuery(
  options?: Omit<Urql.UseQueryArgs<GetUsageTypeInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetUsageTypeInternalCodeQuery, GetUsageTypeInternalCodeQueryVariables>({
    query: GetUsageTypeInternalCodeDocument,
    ...options,
  });
}
export const CanUseUsageTypeInternalCodeDocument = gql`
  query canUseUsageTypeInternalCode($internalCode: String!, $currentUsageTypeId: Int) {
    estateUsageType {
      canUseInternalCode(internalCode: $internalCode, currentEstateUsageTypeId: $currentUsageTypeId)
    }
  }
`;

export function useCanUseUsageTypeInternalCodeQuery(
  options: Omit<Urql.UseQueryArgs<CanUseUsageTypeInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<CanUseUsageTypeInternalCodeQuery, CanUseUsageTypeInternalCodeQueryVariables>({
    query: CanUseUsageTypeInternalCodeDocument,
    ...options,
  });
}
export const GetUsageTypeDistributionDocument = gql`
  query getUsageTypeDistribution(
    $showAll: Boolean!
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: UsageTypeDistributionFilterInput
    $order: [UsageTypeDistributionSortInput!]
  ) {
    estateUsageType {
      usageTypeDistribution(
        showAll: $showAll
        first: $first
        after: $after
        last: $last
        before: $before
        where: $where
        order: $order
      ) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...UsageTypeDistributionFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${UsageTypeDistributionFragmentDoc}
`;

export function useGetUsageTypeDistributionQuery(
  options: Omit<Urql.UseQueryArgs<GetUsageTypeDistributionQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetUsageTypeDistributionQuery, GetUsageTypeDistributionQueryVariables>({
    query: GetUsageTypeDistributionDocument,
    ...options,
  });
}
export const GetAllUsageTypesDocument = gql`
  query getAllUsageTypes($where: EstateUsageTypeFilterInput, $order: [EstateUsageTypeSortInput!]) {
    estateUsageType {
      listEstateUsageTypesFull(where: $where, order: $order) {
        ...UsageTypeFragment
      }
    }
  }
  ${UsageTypeFragmentDoc}
`;

export function useGetAllUsageTypesQuery(options?: Omit<Urql.UseQueryArgs<GetAllUsageTypesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllUsageTypesQuery, GetAllUsageTypesQueryVariables>({
    query: GetAllUsageTypesDocument,
    ...options,
  });
}
