// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { CatalogueCategoryFragmentDoc } from './RealGimm.Web.CatalogueCategory.fragment';
import { CatalogueSubCategoryFragmentDoc } from './RealGimm.Web.CatalogueSubCategory.fragment';
import {
  CatalogueCategoryCatalogueTypeDetailFragmentDoc,
  CatalogueTypeDetailFragmentDoc,
  CatalogueTypeFragmentDoc,
  FacilityCatalogueTypeFragmentDoc,
} from './RealGimm.Web.CatalogueType.fragment';
import { CatalogueTypeActivityFragmentDoc } from './RealGimm.Web.CatalogueTypeActivity.fragment';
import { CatalogueTypeFieldFragmentDoc } from './RealGimm.Web.CatalogueTypeField.fragment';
import { UsageTypeFragmentDoc } from './RealGimm.Web.EstateUsageType.fragment';
import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';

export type GetCatalogueTypesQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.CatalogueTypeFilterInput>;
  order?: Types.InputMaybe<Array<Types.CatalogueTypeSortInput> | Types.CatalogueTypeSortInput>;
}>;

export type GetCatalogueTypesQuery = {
  __typename?: 'Query';
  catalogueType: {
    __typename?: 'CatalogueTypeQueries';
    listCatalogueTypes?: {
      __typename?: 'ListCatalogueTypesConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'CatalogueType';
        id: number;
        internalCode: string;
        name: string;
        category: { __typename?: 'CatalogueCategory'; id: number; name: string };
        subCategory?: { __typename?: 'CatalogueSubCategory'; id: number; name: string } | null;
        usageTypes: Array<{ __typename?: 'EstateUsageType'; id: number; name: string }>;
      }> | null;
    } | null;
  };
};

export type GetFullCatalogueTypesQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.CatalogueTypeFilterInput>;
  order?: Types.InputMaybe<Array<Types.CatalogueTypeSortInput> | Types.CatalogueTypeSortInput>;
}>;

export type GetFullCatalogueTypesQuery = {
  __typename?: 'Query';
  catalogueType: {
    __typename?: 'CatalogueTypeQueries';
    listCatalogueTypes?: {
      __typename?: 'ListCatalogueTypesConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'CatalogueType';
        id: number;
        internalCode: string;
        name: string;
        notes?: string | null;
        category: {
          __typename?: 'CatalogueCategory';
          name: string;
          internalCode: string;
          id: number;
          subCategories: Array<{ __typename?: 'CatalogueSubCategory'; name: string; internalCode: string; id: number }>;
          catalogueTypes: Array<{
            __typename?: 'CatalogueType';
            id: number;
            internalCode: string;
            name: string;
            notes?: string | null;
            subCategory?: {
              __typename?: 'CatalogueSubCategory';
              name: string;
              internalCode: string;
              id: number;
            } | null;
            activities: Array<{
              __typename?: 'CatalogueTypeActivity';
              activityType: Types.CatalogueTypeActivityType;
              id: number;
              name: string;
              isMandatoryByLaw: boolean;
            }>;
            usageTypes: Array<{
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
            fields?: Array<
              Array<{
                __typename?: 'CatalogueTypeField';
                name: string;
                isMandatory: boolean;
                type: Types.CustomFieldType;
                validValues?: Array<string> | null;
                id: string;
              }>
            > | null;
          }>;
        };
        subCategory?: { __typename?: 'CatalogueSubCategory'; name: string; internalCode: string; id: number } | null;
        activities: Array<{
          __typename?: 'CatalogueTypeActivity';
          activityType: Types.CatalogueTypeActivityType;
          id: number;
          name: string;
          isMandatoryByLaw: boolean;
        }>;
        usageTypes: Array<{
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
        fields?: Array<
          Array<{
            __typename?: 'CatalogueTypeField';
            name: string;
            isMandatory: boolean;
            type: Types.CustomFieldType;
            validValues?: Array<string> | null;
            id: string;
          }>
        > | null;
      }> | null;
    } | null;
  };
};

export type GetAllCatalogueTypesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.CatalogueTypeFilterInput>;
  order?: Types.InputMaybe<Array<Types.CatalogueTypeSortInput> | Types.CatalogueTypeSortInput>;
}>;

export type GetAllCatalogueTypesQuery = {
  __typename?: 'Query';
  catalogueType: {
    __typename?: 'CatalogueTypeQueries';
    listCatalogueTypesFull: Array<{
      __typename?: 'CatalogueType';
      id: number;
      internalCode: string;
      name: string;
      category: { __typename?: 'CatalogueCategory'; id: number; name: string };
      subCategory?: { __typename?: 'CatalogueSubCategory'; id: number; name: string } | null;
      usageTypes: Array<{ __typename?: 'EstateUsageType'; id: number; name: string }>;
    }>;
  };
};

export type DeleteCatalogueTypeMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;

export type DeleteCatalogueTypeMutation = {
  __typename?: 'Mutation';
  catalogueType: {
    __typename?: 'CatalogueTypeMutations';
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

export type DeleteCatalogueTypesMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeleteCatalogueTypesMutation = {
  __typename?: 'Mutation';
  catalogueType: {
    __typename?: 'CatalogueTypeMutations';
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

export type ExportCatalogueTypesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.CatalogueTypeFilterInput>;
  order?: Types.InputMaybe<Array<Types.CatalogueTypeSortInput> | Types.CatalogueTypeSortInput>;
}>;

export type ExportCatalogueTypesQuery = {
  __typename?: 'Query';
  catalogueType: {
    __typename?: 'CatalogueTypeQueries';
    exportToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string };
  };
};

export type GetCatalogueTypeQueryVariables = Types.Exact<{
  catalogueTypeId: Types.Scalars['Int']['input'];
}>;

export type GetCatalogueTypeQuery = {
  __typename?: 'Query';
  catalogueType: {
    __typename?: 'CatalogueTypeQueries';
    get?: {
      __typename?: 'CatalogueType';
      id: number;
      internalCode: string;
      name: string;
      notes?: string | null;
      category: {
        __typename?: 'CatalogueCategory';
        name: string;
        internalCode: string;
        id: number;
        subCategories: Array<{ __typename?: 'CatalogueSubCategory'; name: string; internalCode: string; id: number }>;
        catalogueTypes: Array<{
          __typename?: 'CatalogueType';
          id: number;
          internalCode: string;
          name: string;
          notes?: string | null;
          subCategory?: { __typename?: 'CatalogueSubCategory'; name: string; internalCode: string; id: number } | null;
          activities: Array<{
            __typename?: 'CatalogueTypeActivity';
            activityType: Types.CatalogueTypeActivityType;
            id: number;
            name: string;
            isMandatoryByLaw: boolean;
          }>;
          usageTypes: Array<{
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
          fields?: Array<
            Array<{
              __typename?: 'CatalogueTypeField';
              name: string;
              isMandatory: boolean;
              type: Types.CustomFieldType;
              validValues?: Array<string> | null;
              id: string;
            }>
          > | null;
        }>;
      };
      subCategory?: { __typename?: 'CatalogueSubCategory'; name: string; internalCode: string; id: number } | null;
      activities: Array<{
        __typename?: 'CatalogueTypeActivity';
        activityType: Types.CatalogueTypeActivityType;
        id: number;
        name: string;
        isMandatoryByLaw: boolean;
      }>;
      usageTypes: Array<{
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
      fields?: Array<
        Array<{
          __typename?: 'CatalogueTypeField';
          name: string;
          isMandatory: boolean;
          type: Types.CustomFieldType;
          validValues?: Array<string> | null;
          id: string;
        }>
      > | null;
    } | null;
  };
};

export type CreateCatalogueTypeMutationVariables = Types.Exact<{
  catalogueTypeInput: Types.CatalogueTypeInput;
}>;

export type CreateCatalogueTypeMutation = {
  __typename?: 'Mutation';
  catalogueType: {
    __typename?: 'CatalogueTypeMutations';
    add: {
      __typename?: 'ResultOfCatalogueType';
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

export type UpdateCatalogueTypeMutationVariables = Types.Exact<{
  catalogueTypeId: Types.Scalars['Int']['input'];
  catalogueTypeInput: Types.CatalogueTypeInput;
}>;

export type UpdateCatalogueTypeMutation = {
  __typename?: 'Mutation';
  catalogueType: {
    __typename?: 'CatalogueTypeMutations';
    update: {
      __typename?: 'ResultOfCatalogueType';
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

export type GetCatalogueTypeInternalCodeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetCatalogueTypeInternalCodeQuery = {
  __typename?: 'Query';
  catalogueType: { __typename?: 'CatalogueTypeQueries'; proposeNewInternalCode?: string | null };
};

export type CanUseCatalogueTypeInternalCodeQueryVariables = Types.Exact<{
  internalCode: Types.Scalars['String']['input'];
  currentCatalogueTypeId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CanUseCatalogueTypeInternalCodeQuery = {
  __typename?: 'Query';
  catalogueType: { __typename?: 'CatalogueTypeQueries'; canUseInternalCode: boolean };
};

export const GetCatalogueTypesDocument = gql`
  query getCatalogueTypes(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: CatalogueTypeFilterInput
    $order: [CatalogueTypeSortInput!]
  ) {
    catalogueType {
      listCatalogueTypes(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...CatalogueTypeFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${CatalogueTypeFragmentDoc}
`;

export function useGetCatalogueTypesQuery(options?: Omit<Urql.UseQueryArgs<GetCatalogueTypesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCatalogueTypesQuery, GetCatalogueTypesQueryVariables>({
    query: GetCatalogueTypesDocument,
    ...options,
  });
}
export const GetFullCatalogueTypesDocument = gql`
  query getFullCatalogueTypes(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: CatalogueTypeFilterInput
    $order: [CatalogueTypeSortInput!]
  ) {
    catalogueType {
      listCatalogueTypes(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...CatalogueTypeDetailFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${CatalogueTypeDetailFragmentDoc}
  ${CatalogueCategoryCatalogueTypeDetailFragmentDoc}
  ${CatalogueSubCategoryFragmentDoc}
  ${CatalogueTypeActivityFragmentDoc}
  ${UsageTypeFragmentDoc}
  ${CatalogueTypeFieldFragmentDoc}
  ${CatalogueCategoryFragmentDoc}
`;

export function useGetFullCatalogueTypesQuery(
  options?: Omit<Urql.UseQueryArgs<GetFullCatalogueTypesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetFullCatalogueTypesQuery, GetFullCatalogueTypesQueryVariables>({
    query: GetFullCatalogueTypesDocument,
    ...options,
  });
}
export const GetAllCatalogueTypesDocument = gql`
  query getAllCatalogueTypes($where: CatalogueTypeFilterInput, $order: [CatalogueTypeSortInput!]) {
    catalogueType {
      listCatalogueTypesFull(where: $where, order: $order) {
        ...CatalogueTypeFragment
      }
    }
  }
  ${CatalogueTypeFragmentDoc}
`;

export function useGetAllCatalogueTypesQuery(
  options?: Omit<Urql.UseQueryArgs<GetAllCatalogueTypesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetAllCatalogueTypesQuery, GetAllCatalogueTypesQueryVariables>({
    query: GetAllCatalogueTypesDocument,
    ...options,
  });
}
export const DeleteCatalogueTypeDocument = gql`
  mutation deleteCatalogueType($id: Int!) {
    catalogueType {
      delete(id: $id) {
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

export function useDeleteCatalogueTypeMutation() {
  return Urql.useMutation<DeleteCatalogueTypeMutation, DeleteCatalogueTypeMutationVariables>(
    DeleteCatalogueTypeDocument,
  );
}
export const DeleteCatalogueTypesDocument = gql`
  mutation deleteCatalogueTypes($ids: [Int!]!) {
    catalogueType {
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

export function useDeleteCatalogueTypesMutation() {
  return Urql.useMutation<DeleteCatalogueTypesMutation, DeleteCatalogueTypesMutationVariables>(
    DeleteCatalogueTypesDocument,
  );
}
export const ExportCatalogueTypesDocument = gql`
  query exportCatalogueTypes($where: CatalogueTypeFilterInput, $order: [CatalogueTypeSortInput!]) {
    catalogueType {
      exportToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportCatalogueTypesQuery(
  options?: Omit<Urql.UseQueryArgs<ExportCatalogueTypesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ExportCatalogueTypesQuery, ExportCatalogueTypesQueryVariables>({
    query: ExportCatalogueTypesDocument,
    ...options,
  });
}
export const GetCatalogueTypeDocument = gql`
  query getCatalogueType($catalogueTypeId: Int!) {
    catalogueType {
      get(id: $catalogueTypeId) {
        ...CatalogueTypeDetailFragment
      }
    }
  }
  ${CatalogueTypeDetailFragmentDoc}
  ${CatalogueCategoryCatalogueTypeDetailFragmentDoc}
  ${CatalogueSubCategoryFragmentDoc}
  ${CatalogueTypeActivityFragmentDoc}
  ${UsageTypeFragmentDoc}
  ${CatalogueTypeFieldFragmentDoc}
  ${CatalogueCategoryFragmentDoc}
`;

export function useGetCatalogueTypeQuery(options: Omit<Urql.UseQueryArgs<GetCatalogueTypeQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCatalogueTypeQuery, GetCatalogueTypeQueryVariables>({
    query: GetCatalogueTypeDocument,
    ...options,
  });
}
export const CreateCatalogueTypeDocument = gql`
  mutation createCatalogueType($catalogueTypeInput: CatalogueTypeInput!) {
    catalogueType {
      add(input: $catalogueTypeInput) {
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

export function useCreateCatalogueTypeMutation() {
  return Urql.useMutation<CreateCatalogueTypeMutation, CreateCatalogueTypeMutationVariables>(
    CreateCatalogueTypeDocument,
  );
}
export const UpdateCatalogueTypeDocument = gql`
  mutation updateCatalogueType($catalogueTypeId: Int!, $catalogueTypeInput: CatalogueTypeInput!) {
    catalogueType {
      update(id: $catalogueTypeId, input: $catalogueTypeInput) {
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

export function useUpdateCatalogueTypeMutation() {
  return Urql.useMutation<UpdateCatalogueTypeMutation, UpdateCatalogueTypeMutationVariables>(
    UpdateCatalogueTypeDocument,
  );
}
export const GetCatalogueTypeInternalCodeDocument = gql`
  query getCatalogueTypeInternalCode {
    catalogueType {
      proposeNewInternalCode
    }
  }
`;

export function useGetCatalogueTypeInternalCodeQuery(
  options?: Omit<Urql.UseQueryArgs<GetCatalogueTypeInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetCatalogueTypeInternalCodeQuery, GetCatalogueTypeInternalCodeQueryVariables>({
    query: GetCatalogueTypeInternalCodeDocument,
    ...options,
  });
}
export const CanUseCatalogueTypeInternalCodeDocument = gql`
  query canUseCatalogueTypeInternalCode($internalCode: String!, $currentCatalogueTypeId: Int) {
    catalogueType {
      canUseInternalCode(internalCode: $internalCode, currentCatalogueTypeId: $currentCatalogueTypeId)
    }
  }
`;

export function useCanUseCatalogueTypeInternalCodeQuery(
  options: Omit<Urql.UseQueryArgs<CanUseCatalogueTypeInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<CanUseCatalogueTypeInternalCodeQuery, CanUseCatalogueTypeInternalCodeQueryVariables>({
    query: CanUseCatalogueTypeInternalCodeDocument,
    ...options,
  });
}
