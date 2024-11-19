// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { ServiceCategoryFragmentDoc } from './RealGimm.Web.ServiceCategory.fragment';
import { ServiceSubCategoryFragmentDoc } from './RealGimm.Web.ServiceSubCategory.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';

export type GetServiceCategoriesQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.ServiceCategoryFilterInput>;
  order?: Types.InputMaybe<Array<Types.ServiceCategorySortInput> | Types.ServiceCategorySortInput>;
}>;

export type GetServiceCategoriesQuery = {
  __typename?: 'Query';
  serviceCategory: {
    __typename?: 'ServiceCategoryQueries';
    listServiceCategories?: {
      __typename?: 'ListServiceCategoriesConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'ServiceCategory';
        id: number;
        name: string;
        internalCode: string;
        subCategories: Array<{ __typename?: 'ServiceSubCategory'; id: number; name: string; internalCode: string }>;
      }> | null;
    } | null;
  };
};

export type AddServiceCategoryMutationVariables = Types.Exact<{
  input: Types.ServiceCategoryInput;
}>;

export type AddServiceCategoryMutation = {
  __typename?: 'Mutation';
  serviceCategory: {
    __typename?: 'ServiceCategoryMutations';
    add: {
      __typename?: 'ResultOfServiceCategory';
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

export type UpdateServiceCategoryMutationVariables = Types.Exact<{
  serviceCategoryId: Types.Scalars['Int']['input'];
  input: Types.ServiceCategoryInput;
}>;

export type UpdateServiceCategoryMutation = {
  __typename?: 'Mutation';
  serviceCategory: {
    __typename?: 'ServiceCategoryMutations';
    update: {
      __typename?: 'ResultOfServiceCategory';
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

export type DeleteServiceCategoriesMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeleteServiceCategoriesMutation = {
  __typename?: 'Mutation';
  serviceCategory: {
    __typename?: 'ServiceCategoryMutations';
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

export type GetServiceCategoryInternalCodeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetServiceCategoryInternalCodeQuery = {
  __typename?: 'Query';
  serviceCategory: { __typename?: 'ServiceCategoryQueries'; proposeNewInternalCode?: string | null };
};

export type CanUseServiceCategoryInternalCodeQueryVariables = Types.Exact<{
  internalCode: Types.Scalars['String']['input'];
  currentServiceCategoryId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CanUseServiceCategoryInternalCodeQuery = {
  __typename?: 'Query';
  serviceCategory: { __typename?: 'ServiceCategoryQueries'; canUseInternalCode: boolean };
};

export type GetServiceSubCategoryInternalCodeQueryVariables = Types.Exact<{
  parentInternalCode: Types.Scalars['String']['input'];
  additionallyOccupiedCodes: Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input'];
}>;

export type GetServiceSubCategoryInternalCodeQuery = {
  __typename?: 'Query';
  serviceCategory: { __typename?: 'ServiceCategoryQueries'; proposeNewInternalCodeSubCategory?: string | null };
};

export type CanUseServiceSubCategoryInternalCodeQueryVariables = Types.Exact<{
  internalCode: Types.Scalars['String']['input'];
  serviceCategoryId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  currentServiceCategoryId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CanUseServiceSubCategoryInternalCodeQuery = {
  __typename?: 'Query';
  serviceCategory: { __typename?: 'ServiceCategoryQueries'; canUseInternalCodeSubCategory: boolean };
};

export type ExportServiceCategoriesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ServiceCategoryFilterInput>;
  order?: Types.InputMaybe<Array<Types.ServiceCategorySortInput> | Types.ServiceCategorySortInput>;
}>;

export type ExportServiceCategoriesQuery = {
  __typename?: 'Query';
  serviceCategory: {
    __typename?: 'ServiceCategoryQueries';
    exportToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string };
  };
};

export type GetServiceCategoryQueryVariables = Types.Exact<{
  serviceCategoryId: Types.Scalars['Int']['input'];
}>;

export type GetServiceCategoryQuery = {
  __typename?: 'Query';
  serviceCategory: {
    __typename?: 'ServiceCategoryQueries';
    get?: {
      __typename?: 'ServiceCategory';
      id: number;
      name: string;
      internalCode: string;
      subCategories: Array<{ __typename?: 'ServiceSubCategory'; id: number; name: string; internalCode: string }>;
    } | null;
  };
};

export type DeleteServiceCategoryMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;

export type DeleteServiceCategoryMutation = {
  __typename?: 'Mutation';
  serviceCategory: {
    __typename?: 'ServiceCategoryMutations';
    delete: {
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

export const GetServiceCategoriesDocument = gql`
  query getServiceCategories(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: ServiceCategoryFilterInput
    $order: [ServiceCategorySortInput!]
  ) {
    serviceCategory {
      listServiceCategories(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...ServiceCategoryFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${ServiceCategoryFragmentDoc}
  ${ServiceSubCategoryFragmentDoc}
`;

export function useGetServiceCategoriesQuery(
  options?: Omit<Urql.UseQueryArgs<GetServiceCategoriesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetServiceCategoriesQuery, GetServiceCategoriesQueryVariables>({
    query: GetServiceCategoriesDocument,
    ...options,
  });
}
export const AddServiceCategoryDocument = gql`
  mutation addServiceCategory($input: ServiceCategoryInput!) {
    serviceCategory {
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

export function useAddServiceCategoryMutation() {
  return Urql.useMutation<AddServiceCategoryMutation, AddServiceCategoryMutationVariables>(AddServiceCategoryDocument);
}
export const UpdateServiceCategoryDocument = gql`
  mutation updateServiceCategory($serviceCategoryId: Int!, $input: ServiceCategoryInput!) {
    serviceCategory {
      update(id: $serviceCategoryId, input: $input) {
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

export function useUpdateServiceCategoryMutation() {
  return Urql.useMutation<UpdateServiceCategoryMutation, UpdateServiceCategoryMutationVariables>(
    UpdateServiceCategoryDocument,
  );
}
export const DeleteServiceCategoriesDocument = gql`
  mutation deleteServiceCategories($ids: [Int!]!) {
    serviceCategory {
      deleteRange(serviceCategoryIds: $ids) {
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

export function useDeleteServiceCategoriesMutation() {
  return Urql.useMutation<DeleteServiceCategoriesMutation, DeleteServiceCategoriesMutationVariables>(
    DeleteServiceCategoriesDocument,
  );
}
export const GetServiceCategoryInternalCodeDocument = gql`
  query getServiceCategoryInternalCode {
    serviceCategory {
      proposeNewInternalCode
    }
  }
`;

export function useGetServiceCategoryInternalCodeQuery(
  options?: Omit<Urql.UseQueryArgs<GetServiceCategoryInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetServiceCategoryInternalCodeQuery, GetServiceCategoryInternalCodeQueryVariables>({
    query: GetServiceCategoryInternalCodeDocument,
    ...options,
  });
}
export const CanUseServiceCategoryInternalCodeDocument = gql`
  query canUseServiceCategoryInternalCode($internalCode: String!, $currentServiceCategoryId: Int) {
    serviceCategory {
      canUseInternalCode(internalCode: $internalCode, currentServiceCategoryId: $currentServiceCategoryId)
    }
  }
`;

export function useCanUseServiceCategoryInternalCodeQuery(
  options: Omit<Urql.UseQueryArgs<CanUseServiceCategoryInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<CanUseServiceCategoryInternalCodeQuery, CanUseServiceCategoryInternalCodeQueryVariables>({
    query: CanUseServiceCategoryInternalCodeDocument,
    ...options,
  });
}
export const GetServiceSubCategoryInternalCodeDocument = gql`
  query getServiceSubCategoryInternalCode($parentInternalCode: String!, $additionallyOccupiedCodes: [String!]!) {
    serviceCategory {
      proposeNewInternalCodeSubCategory(
        parentInternalCode: $parentInternalCode
        additionallyOccupiedCodes: $additionallyOccupiedCodes
      )
    }
  }
`;

export function useGetServiceSubCategoryInternalCodeQuery(
  options: Omit<Urql.UseQueryArgs<GetServiceSubCategoryInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetServiceSubCategoryInternalCodeQuery, GetServiceSubCategoryInternalCodeQueryVariables>({
    query: GetServiceSubCategoryInternalCodeDocument,
    ...options,
  });
}
export const CanUseServiceSubCategoryInternalCodeDocument = gql`
  query canUseServiceSubCategoryInternalCode(
    $internalCode: String!
    $serviceCategoryId: Int
    $currentServiceCategoryId: Int
  ) {
    serviceCategory {
      canUseInternalCodeSubCategory(
        internalCode: $internalCode
        serviceCategoryId: $serviceCategoryId
        currentServiceSubCategoryId: $currentServiceCategoryId
      )
    }
  }
`;

export function useCanUseServiceSubCategoryInternalCodeQuery(
  options: Omit<Urql.UseQueryArgs<CanUseServiceSubCategoryInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<CanUseServiceSubCategoryInternalCodeQuery, CanUseServiceSubCategoryInternalCodeQueryVariables>({
    query: CanUseServiceSubCategoryInternalCodeDocument,
    ...options,
  });
}
export const ExportServiceCategoriesDocument = gql`
  query exportServiceCategories($where: ServiceCategoryFilterInput, $order: [ServiceCategorySortInput!]) {
    serviceCategory {
      exportToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportServiceCategoriesQuery(
  options?: Omit<Urql.UseQueryArgs<ExportServiceCategoriesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ExportServiceCategoriesQuery, ExportServiceCategoriesQueryVariables>({
    query: ExportServiceCategoriesDocument,
    ...options,
  });
}
export const GetServiceCategoryDocument = gql`
  query getServiceCategory($serviceCategoryId: Int!) {
    serviceCategory {
      get(id: $serviceCategoryId) {
        ...ServiceCategoryFragment
      }
    }
  }
  ${ServiceCategoryFragmentDoc}
  ${ServiceSubCategoryFragmentDoc}
`;

export function useGetServiceCategoryQuery(
  options: Omit<Urql.UseQueryArgs<GetServiceCategoryQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetServiceCategoryQuery, GetServiceCategoryQueryVariables>({
    query: GetServiceCategoryDocument,
    ...options,
  });
}
export const DeleteServiceCategoryDocument = gql`
  mutation deleteServiceCategory($id: Int!) {
    serviceCategory {
      delete(serviceCategoryId: $id) {
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

export function useDeleteServiceCategoryMutation() {
  return Urql.useMutation<DeleteServiceCategoryMutation, DeleteServiceCategoryMutationVariables>(
    DeleteServiceCategoryDocument,
  );
}
