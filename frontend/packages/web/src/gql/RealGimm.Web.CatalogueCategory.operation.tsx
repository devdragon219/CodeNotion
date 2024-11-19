// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { CatalogueCategoryFragmentDoc } from './RealGimm.Web.CatalogueCategory.fragment';
import { CatalogueSubCategoryFragmentDoc } from './RealGimm.Web.CatalogueSubCategory.fragment';
import {
  CatalogueCategoryCatalogueTypeDetailFragmentDoc,
  CatalogueTypeDetailFragmentDoc,
  FacilityCatalogueTypeFragmentDoc,
} from './RealGimm.Web.CatalogueType.fragment';
import { CatalogueTypeActivityFragmentDoc } from './RealGimm.Web.CatalogueTypeActivity.fragment';
import { CatalogueTypeFieldFragmentDoc } from './RealGimm.Web.CatalogueTypeField.fragment';
import { UsageTypeFragmentDoc } from './RealGimm.Web.EstateUsageType.fragment';
import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';

export type GetCatalogueCategoriesQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.CatalogueCategoryFilterInput>;
  order?: Types.InputMaybe<Array<Types.CatalogueCategorySortInput> | Types.CatalogueCategorySortInput>;
}>;

export type GetCatalogueCategoriesQuery = {
  __typename?: 'Query';
  catalogueCategory: {
    __typename?: 'CatalogueCategoryQueries';
    listCatalogueCategories?: {
      __typename?: 'ListCatalogueCategoriesConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
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
      }> | null;
    } | null;
  };
};

export type GetAllCatalogueCategoriesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.CatalogueCategoryFilterInput>;
  order?: Types.InputMaybe<Array<Types.CatalogueCategorySortInput> | Types.CatalogueCategorySortInput>;
}>;

export type GetAllCatalogueCategoriesQuery = {
  __typename?: 'Query';
  catalogueCategory: {
    __typename?: 'CatalogueCategoryQueries';
    listCatalogueCategoriesFull: Array<{
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
    }>;
  };
};

export type GetCatalogueCategoryQueryVariables = Types.Exact<{
  catalogueCategoryId: Types.Scalars['Int']['input'];
}>;

export type GetCatalogueCategoryQuery = {
  __typename?: 'Query';
  catalogueCategory: {
    __typename?: 'CatalogueCategoryQueries';
    get?: {
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
    } | null;
  };
};

export type CreateCatalogueCategoryMutationVariables = Types.Exact<{
  input: Types.CatalogueCategoryInput;
}>;

export type CreateCatalogueCategoryMutation = {
  __typename?: 'Mutation';
  catalogueCategory: {
    __typename?: 'CatalogueCategoryMutations';
    add: {
      __typename?: 'ResultOfCatalogueCategory';
      errors?: Array<string | null> | null;
      isSuccess: boolean;
      validationErrors?: Array<{
        __typename?: 'ValidationError';
        identifier?: string | null;
        errorMessage?: string | null;
        errorCode?: string | null;
        severity: Types.ValidationSeverity;
      } | null> | null;
      value?: {
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
      } | null;
    };
  };
};

export type DeleteCatalogueCategoryMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;

export type DeleteCatalogueCategoryMutation = {
  __typename?: 'Mutation';
  catalogueCategory: {
    __typename?: 'CatalogueCategoryMutations';
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

export type DeleteCatalogueCategoriesMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeleteCatalogueCategoriesMutation = {
  __typename?: 'Mutation';
  catalogueCategory: {
    __typename?: 'CatalogueCategoryMutations';
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

export type UpdateCatalogueCategoryMutationVariables = Types.Exact<{
  catalogueCategoryId: Types.Scalars['Int']['input'];
  input: Types.CatalogueCategoryInput;
}>;

export type UpdateCatalogueCategoryMutation = {
  __typename?: 'Mutation';
  catalogueCategory: {
    __typename?: 'CatalogueCategoryMutations';
    update: {
      __typename?: 'ResultOfCatalogueCategory';
      errors?: Array<string | null> | null;
      isSuccess: boolean;
      validationErrors?: Array<{
        __typename?: 'ValidationError';
        identifier?: string | null;
        errorMessage?: string | null;
        errorCode?: string | null;
        severity: Types.ValidationSeverity;
      } | null> | null;
      value?: {
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
      } | null;
    };
  };
};

export type GetCatalogueCategoryInternalCodeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetCatalogueCategoryInternalCodeQuery = {
  __typename?: 'Query';
  catalogueCategory: { __typename?: 'CatalogueCategoryQueries'; proposeNewInternalCode?: string | null };
};

export type CanUseCatalogueCategoryInternalCodeQueryVariables = Types.Exact<{
  internalCode: Types.Scalars['String']['input'];
  currentCatalogueCategoryId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CanUseCatalogueCategoryInternalCodeQuery = {
  __typename?: 'Query';
  catalogueCategory: { __typename?: 'CatalogueCategoryQueries'; canUseInternalCode: boolean };
};

export type GetCatalogueSubCategoryInternalCodeQueryVariables = Types.Exact<{
  parentInternalCode: Types.Scalars['String']['input'];
  additionallyOccupiedCodes: Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input'];
}>;

export type GetCatalogueSubCategoryInternalCodeQuery = {
  __typename?: 'Query';
  catalogueCategory: { __typename?: 'CatalogueCategoryQueries'; proposeNewInternalCodeSubCategory?: string | null };
};

export type CanUseCatalogueSubCategoryInternalCodeQueryVariables = Types.Exact<{
  internalCode: Types.Scalars['String']['input'];
  catalogueCategoryId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  currentCatalogueSubCategoryId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CanUseCatalogueSubCategoryInternalCodeQuery = {
  __typename?: 'Query';
  catalogueCategory: { __typename?: 'CatalogueCategoryQueries'; canUseInternalCodeSubCategory: boolean };
};

export type GetCatalogueSubCategoriesQueryVariables = Types.Exact<{
  catalogueCategoryId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.CatalogueSubCategoryFilterInput>;
  order?: Types.InputMaybe<Array<Types.CatalogueSubCategorySortInput> | Types.CatalogueSubCategorySortInput>;
}>;

export type GetCatalogueSubCategoriesQuery = {
  __typename?: 'Query';
  catalogueCategory: {
    __typename?: 'CatalogueCategoryQueries';
    listCatalogueSubCategories?: {
      __typename?: 'ListCatalogueSubCategoriesConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{ __typename?: 'CatalogueSubCategory'; name: string; internalCode: string; id: number }> | null;
    } | null;
  };
};

export type GetAllCatalogueSubCategoriesQueryVariables = Types.Exact<{
  catalogueCategoryId: Types.Scalars['Int']['input'];
  where?: Types.InputMaybe<Types.CatalogueSubCategoryFilterInput>;
  order?: Types.InputMaybe<Array<Types.CatalogueSubCategorySortInput> | Types.CatalogueSubCategorySortInput>;
}>;

export type GetAllCatalogueSubCategoriesQuery = {
  __typename?: 'Query';
  catalogueCategory: {
    __typename?: 'CatalogueCategoryQueries';
    listCatalogueSubCategoriesFull: Array<{
      __typename?: 'CatalogueSubCategory';
      name: string;
      internalCode: string;
      id: number;
    }>;
  };
};

export const GetCatalogueCategoriesDocument = gql`
  query getCatalogueCategories(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: CatalogueCategoryFilterInput
    $order: [CatalogueCategorySortInput!]
  ) {
    catalogueCategory {
      listCatalogueCategories(
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
          ...CatalogueCategoryFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${CatalogueCategoryFragmentDoc}
  ${CatalogueSubCategoryFragmentDoc}
  ${CatalogueCategoryCatalogueTypeDetailFragmentDoc}
  ${CatalogueTypeActivityFragmentDoc}
  ${UsageTypeFragmentDoc}
  ${CatalogueTypeFieldFragmentDoc}
`;

export function useGetCatalogueCategoriesQuery(
  options?: Omit<Urql.UseQueryArgs<GetCatalogueCategoriesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetCatalogueCategoriesQuery, GetCatalogueCategoriesQueryVariables>({
    query: GetCatalogueCategoriesDocument,
    ...options,
  });
}
export const GetAllCatalogueCategoriesDocument = gql`
  query getAllCatalogueCategories($where: CatalogueCategoryFilterInput, $order: [CatalogueCategorySortInput!]) {
    catalogueCategory {
      listCatalogueCategoriesFull(where: $where, order: $order) {
        ...CatalogueCategoryFragment
      }
    }
  }
  ${CatalogueCategoryFragmentDoc}
  ${CatalogueSubCategoryFragmentDoc}
  ${CatalogueCategoryCatalogueTypeDetailFragmentDoc}
  ${CatalogueTypeActivityFragmentDoc}
  ${UsageTypeFragmentDoc}
  ${CatalogueTypeFieldFragmentDoc}
`;

export function useGetAllCatalogueCategoriesQuery(
  options?: Omit<Urql.UseQueryArgs<GetAllCatalogueCategoriesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetAllCatalogueCategoriesQuery, GetAllCatalogueCategoriesQueryVariables>({
    query: GetAllCatalogueCategoriesDocument,
    ...options,
  });
}
export const GetCatalogueCategoryDocument = gql`
  query getCatalogueCategory($catalogueCategoryId: Int!) {
    catalogueCategory {
      get(id: $catalogueCategoryId) {
        ...CatalogueCategoryFragment
      }
    }
  }
  ${CatalogueCategoryFragmentDoc}
  ${CatalogueSubCategoryFragmentDoc}
  ${CatalogueCategoryCatalogueTypeDetailFragmentDoc}
  ${CatalogueTypeActivityFragmentDoc}
  ${UsageTypeFragmentDoc}
  ${CatalogueTypeFieldFragmentDoc}
`;

export function useGetCatalogueCategoryQuery(
  options: Omit<Urql.UseQueryArgs<GetCatalogueCategoryQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetCatalogueCategoryQuery, GetCatalogueCategoryQueryVariables>({
    query: GetCatalogueCategoryDocument,
    ...options,
  });
}
export const CreateCatalogueCategoryDocument = gql`
  mutation createCatalogueCategory($input: CatalogueCategoryInput!) {
    catalogueCategory {
      add(input: $input) {
        errors
        isSuccess
        validationErrors {
          ...ValidationErrorFragment
        }
        value {
          ...CatalogueCategoryFragment
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
  ${CatalogueCategoryFragmentDoc}
  ${CatalogueSubCategoryFragmentDoc}
  ${CatalogueCategoryCatalogueTypeDetailFragmentDoc}
  ${CatalogueTypeActivityFragmentDoc}
  ${UsageTypeFragmentDoc}
  ${CatalogueTypeFieldFragmentDoc}
`;

export function useCreateCatalogueCategoryMutation() {
  return Urql.useMutation<CreateCatalogueCategoryMutation, CreateCatalogueCategoryMutationVariables>(
    CreateCatalogueCategoryDocument,
  );
}
export const DeleteCatalogueCategoryDocument = gql`
  mutation deleteCatalogueCategory($id: Int!) {
    catalogueCategory {
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

export function useDeleteCatalogueCategoryMutation() {
  return Urql.useMutation<DeleteCatalogueCategoryMutation, DeleteCatalogueCategoryMutationVariables>(
    DeleteCatalogueCategoryDocument,
  );
}
export const DeleteCatalogueCategoriesDocument = gql`
  mutation deleteCatalogueCategories($ids: [Int!]!) {
    catalogueCategory {
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

export function useDeleteCatalogueCategoriesMutation() {
  return Urql.useMutation<DeleteCatalogueCategoriesMutation, DeleteCatalogueCategoriesMutationVariables>(
    DeleteCatalogueCategoriesDocument,
  );
}
export const UpdateCatalogueCategoryDocument = gql`
  mutation updateCatalogueCategory($catalogueCategoryId: Int!, $input: CatalogueCategoryInput!) {
    catalogueCategory {
      update(id: $catalogueCategoryId, input: $input) {
        errors
        isSuccess
        validationErrors {
          ...ValidationErrorFragment
        }
        value {
          ...CatalogueCategoryFragment
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
  ${CatalogueCategoryFragmentDoc}
  ${CatalogueSubCategoryFragmentDoc}
  ${CatalogueCategoryCatalogueTypeDetailFragmentDoc}
  ${CatalogueTypeActivityFragmentDoc}
  ${UsageTypeFragmentDoc}
  ${CatalogueTypeFieldFragmentDoc}
`;

export function useUpdateCatalogueCategoryMutation() {
  return Urql.useMutation<UpdateCatalogueCategoryMutation, UpdateCatalogueCategoryMutationVariables>(
    UpdateCatalogueCategoryDocument,
  );
}
export const GetCatalogueCategoryInternalCodeDocument = gql`
  query getCatalogueCategoryInternalCode {
    catalogueCategory {
      proposeNewInternalCode
    }
  }
`;

export function useGetCatalogueCategoryInternalCodeQuery(
  options?: Omit<Urql.UseQueryArgs<GetCatalogueCategoryInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetCatalogueCategoryInternalCodeQuery, GetCatalogueCategoryInternalCodeQueryVariables>({
    query: GetCatalogueCategoryInternalCodeDocument,
    ...options,
  });
}
export const CanUseCatalogueCategoryInternalCodeDocument = gql`
  query canUseCatalogueCategoryInternalCode($internalCode: String!, $currentCatalogueCategoryId: Int) {
    catalogueCategory {
      canUseInternalCode(internalCode: $internalCode, currentCatalogueCategoryId: $currentCatalogueCategoryId)
    }
  }
`;

export function useCanUseCatalogueCategoryInternalCodeQuery(
  options: Omit<Urql.UseQueryArgs<CanUseCatalogueCategoryInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<CanUseCatalogueCategoryInternalCodeQuery, CanUseCatalogueCategoryInternalCodeQueryVariables>({
    query: CanUseCatalogueCategoryInternalCodeDocument,
    ...options,
  });
}
export const GetCatalogueSubCategoryInternalCodeDocument = gql`
  query getCatalogueSubCategoryInternalCode($parentInternalCode: String!, $additionallyOccupiedCodes: [String!]!) {
    catalogueCategory {
      proposeNewInternalCodeSubCategory(
        parentInternalCode: $parentInternalCode
        additionallyOccupiedCodes: $additionallyOccupiedCodes
      )
    }
  }
`;

export function useGetCatalogueSubCategoryInternalCodeQuery(
  options: Omit<Urql.UseQueryArgs<GetCatalogueSubCategoryInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetCatalogueSubCategoryInternalCodeQuery, GetCatalogueSubCategoryInternalCodeQueryVariables>({
    query: GetCatalogueSubCategoryInternalCodeDocument,
    ...options,
  });
}
export const CanUseCatalogueSubCategoryInternalCodeDocument = gql`
  query canUseCatalogueSubCategoryInternalCode(
    $internalCode: String!
    $catalogueCategoryId: Int
    $currentCatalogueSubCategoryId: Int
  ) {
    catalogueCategory {
      canUseInternalCodeSubCategory(
        internalCode: $internalCode
        catalogueCategoryId: $catalogueCategoryId
        currentCatalogueSubCategoryId: $currentCatalogueSubCategoryId
      )
    }
  }
`;

export function useCanUseCatalogueSubCategoryInternalCodeQuery(
  options: Omit<Urql.UseQueryArgs<CanUseCatalogueSubCategoryInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<
    CanUseCatalogueSubCategoryInternalCodeQuery,
    CanUseCatalogueSubCategoryInternalCodeQueryVariables
  >({ query: CanUseCatalogueSubCategoryInternalCodeDocument, ...options });
}
export const GetCatalogueSubCategoriesDocument = gql`
  query getCatalogueSubCategories(
    $catalogueCategoryId: Int
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: CatalogueSubCategoryFilterInput
    $order: [CatalogueSubCategorySortInput!]
  ) {
    catalogueCategory {
      listCatalogueSubCategories(
        catalogueCategoryId: $catalogueCategoryId
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
          ...CatalogueSubCategoryFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${CatalogueSubCategoryFragmentDoc}
`;

export function useGetCatalogueSubCategoriesQuery(
  options?: Omit<Urql.UseQueryArgs<GetCatalogueSubCategoriesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetCatalogueSubCategoriesQuery, GetCatalogueSubCategoriesQueryVariables>({
    query: GetCatalogueSubCategoriesDocument,
    ...options,
  });
}
export const GetAllCatalogueSubCategoriesDocument = gql`
  query getAllCatalogueSubCategories(
    $catalogueCategoryId: Int!
    $where: CatalogueSubCategoryFilterInput
    $order: [CatalogueSubCategorySortInput!]
  ) {
    catalogueCategory {
      listCatalogueSubCategoriesFull(catalogueCategoryId: $catalogueCategoryId, where: $where, order: $order) {
        ...CatalogueSubCategoryFragment
      }
    }
  }
  ${CatalogueSubCategoryFragmentDoc}
`;

export function useGetAllCatalogueSubCategoriesQuery(
  options: Omit<Urql.UseQueryArgs<GetAllCatalogueSubCategoriesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetAllCatalogueSubCategoriesQuery, GetAllCatalogueSubCategoriesQueryVariables>({
    query: GetAllCatalogueSubCategoriesDocument,
    ...options,
  });
}
