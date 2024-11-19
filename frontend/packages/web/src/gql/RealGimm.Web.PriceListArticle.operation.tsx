// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { PriceListDetailFragmentDoc, PriceListFragmentDoc } from './RealGimm.Web.PriceList.fragment';
import {
  PriceListArticleDetailFragmentDoc,
  PriceListArticleFragmentDoc,
  TicketPriceListArticleFragmentDoc,
} from './RealGimm.Web.PriceListArticle.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';

export type GetPriceListArticlesQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.PriceListArticleFilterInput>;
  order?: Types.InputMaybe<Array<Types.PriceListArticleSortInput> | Types.PriceListArticleSortInput>;
}>;

export type GetPriceListArticlesQuery = {
  __typename?: 'Query';
  priceListArticle: {
    __typename?: 'PriceListArticleQueries';
    listPriceListArticles?: {
      __typename?: 'ListPriceListArticlesConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'PriceListArticle';
        internalCode: string;
        name: string;
        actualPrice?: number | null;
        actualPriceSince?: string | null;
        actualPriceUntil?: string | null;
        id: number;
        priceList: { __typename?: 'PriceList'; internalCode: string; name: string; ordering: number; id: number };
        measurementUnit: { __typename?: 'PriceListMeasurementUnit'; id: number; name: string };
        catalogueTypes: Array<{
          __typename?: 'CatalogueType';
          id: number;
          name: string;
          category: { __typename?: 'CatalogueCategory'; id: number; name: string };
          subCategory?: { __typename?: 'CatalogueSubCategory'; id: number; name: string } | null;
        }>;
      }> | null;
    } | null;
  };
};

export type AddPriceListArticleMutationVariables = Types.Exact<{
  input: Types.AddPriceListArticleInput;
}>;

export type AddPriceListArticleMutation = {
  __typename?: 'Mutation';
  priceListArticle: {
    __typename?: 'PriceListArticleMutations';
    add: {
      __typename?: 'ResultOfPriceListArticle';
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

export type UpdatePriceListArticleMutationVariables = Types.Exact<{
  priceListArticleId: Types.Scalars['Int']['input'];
  input: Types.UpdatePriceListArticleInput;
}>;

export type UpdatePriceListArticleMutation = {
  __typename?: 'Mutation';
  priceListArticle: {
    __typename?: 'PriceListArticleMutations';
    update: {
      __typename?: 'ResultOfPriceListArticle';
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

export type DeletePriceListArticlesMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeletePriceListArticlesMutation = {
  __typename?: 'Mutation';
  priceListArticle: {
    __typename?: 'PriceListArticleMutations';
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

export type GetPriceListArticleInternalCodeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetPriceListArticleInternalCodeQuery = {
  __typename?: 'Query';
  priceListArticle: { __typename?: 'PriceListArticleQueries'; proposeNewInternalCode?: string | null };
};

export type CanUsePriceListArticleInternalCodeQueryVariables = Types.Exact<{
  internalCode: Types.Scalars['String']['input'];
  currentPriceListArticleId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CanUsePriceListArticleInternalCodeQuery = {
  __typename?: 'Query';
  priceListArticle: { __typename?: 'PriceListArticleQueries'; canUseInternalCode: boolean };
};

export type ExportPriceListArticlesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.PriceListArticleFilterInput>;
  order?: Types.InputMaybe<Array<Types.PriceListArticleSortInput> | Types.PriceListArticleSortInput>;
}>;

export type ExportPriceListArticlesQuery = {
  __typename?: 'Query';
  priceListArticle: {
    __typename?: 'PriceListArticleQueries';
    exportToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string };
  };
};

export type GetPriceListArticleQueryVariables = Types.Exact<{
  priceListArticleId: Types.Scalars['Int']['input'];
}>;

export type GetPriceListArticleQuery = {
  __typename?: 'Query';
  priceListArticle: {
    __typename?: 'PriceListArticleQueries';
    get?: {
      __typename?: 'PriceListArticle';
      internalCode: string;
      name: string;
      actualPrice?: number | null;
      actualPriceSince?: string | null;
      actualPriceUntil?: string | null;
      id: number;
      pricePeriods: Array<{
        __typename?: 'ArticlePricePeriod';
        id: number;
        since: string;
        until?: string | null;
        price: number;
      }>;
      priceList: { __typename?: 'PriceList'; internalCode: string; name: string; ordering: number; id: number };
      measurementUnit: { __typename?: 'PriceListMeasurementUnit'; id: number; name: string };
      catalogueTypes: Array<{
        __typename?: 'CatalogueType';
        id: number;
        name: string;
        category: { __typename?: 'CatalogueCategory'; id: number; name: string };
        subCategory?: { __typename?: 'CatalogueSubCategory'; id: number; name: string } | null;
      }>;
    } | null;
  };
};

export type DeletePriceListArticleMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;

export type DeletePriceListArticleMutation = {
  __typename?: 'Mutation';
  priceListArticle: {
    __typename?: 'PriceListArticleMutations';
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

export type GetAllPriceListArticlesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.PriceListArticleFilterInput>;
  order?: Types.InputMaybe<Array<Types.PriceListArticleSortInput> | Types.PriceListArticleSortInput>;
}>;

export type GetAllPriceListArticlesQuery = {
  __typename?: 'Query';
  priceListArticle: {
    __typename?: 'PriceListArticleQueries';
    listPriceListArticlesFull: Array<{
      __typename?: 'PriceListArticle';
      id: number;
      internalCode: string;
      name: string;
      actualPrice?: number | null;
      priceList: { __typename?: 'PriceList'; internalCode: string; name: string; ordering: number; id: number };
      measurementUnit: { __typename?: 'PriceListMeasurementUnit'; id: number; name: string };
    }>;
  };
};

export type GetPriceListArticleExcelImportTemplateQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetPriceListArticleExcelImportTemplateQuery = {
  __typename?: 'Query';
  priceListArticle: {
    __typename?: 'PriceListArticleQueries';
    templateOfImportFromExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string };
  };
};

export type ImportPriceListArticlesMutationVariables = Types.Exact<{
  file: Types.Scalars['Upload']['input'];
}>;

export type ImportPriceListArticlesMutation = {
  __typename?: 'Mutation';
  priceListArticle: {
    __typename?: 'PriceListArticleMutations';
    importFromExcel: {
      __typename?: 'ResultOfInt32';
      errors?: Array<string | null> | null;
      isSuccess: boolean;
      value: number;
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

export const GetPriceListArticlesDocument = gql`
  query getPriceListArticles(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: PriceListArticleFilterInput
    $order: [PriceListArticleSortInput!]
  ) {
    priceListArticle {
      listPriceListArticles(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...PriceListArticleFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${PriceListArticleFragmentDoc}
  ${PriceListFragmentDoc}
`;

export function useGetPriceListArticlesQuery(
  options?: Omit<Urql.UseQueryArgs<GetPriceListArticlesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetPriceListArticlesQuery, GetPriceListArticlesQueryVariables>({
    query: GetPriceListArticlesDocument,
    ...options,
  });
}
export const AddPriceListArticleDocument = gql`
  mutation addPriceListArticle($input: AddPriceListArticleInput!) {
    priceListArticle {
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

export function useAddPriceListArticleMutation() {
  return Urql.useMutation<AddPriceListArticleMutation, AddPriceListArticleMutationVariables>(
    AddPriceListArticleDocument,
  );
}
export const UpdatePriceListArticleDocument = gql`
  mutation updatePriceListArticle($priceListArticleId: Int!, $input: UpdatePriceListArticleInput!) {
    priceListArticle {
      update(id: $priceListArticleId, input: $input) {
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

export function useUpdatePriceListArticleMutation() {
  return Urql.useMutation<UpdatePriceListArticleMutation, UpdatePriceListArticleMutationVariables>(
    UpdatePriceListArticleDocument,
  );
}
export const DeletePriceListArticlesDocument = gql`
  mutation deletePriceListArticles($ids: [Int!]!) {
    priceListArticle {
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

export function useDeletePriceListArticlesMutation() {
  return Urql.useMutation<DeletePriceListArticlesMutation, DeletePriceListArticlesMutationVariables>(
    DeletePriceListArticlesDocument,
  );
}
export const GetPriceListArticleInternalCodeDocument = gql`
  query getPriceListArticleInternalCode {
    priceListArticle {
      proposeNewInternalCode
    }
  }
`;

export function useGetPriceListArticleInternalCodeQuery(
  options?: Omit<Urql.UseQueryArgs<GetPriceListArticleInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetPriceListArticleInternalCodeQuery, GetPriceListArticleInternalCodeQueryVariables>({
    query: GetPriceListArticleInternalCodeDocument,
    ...options,
  });
}
export const CanUsePriceListArticleInternalCodeDocument = gql`
  query canUsePriceListArticleInternalCode($internalCode: String!, $currentPriceListArticleId: Int) {
    priceListArticle {
      canUseInternalCode(internalCode: $internalCode, currentPriceListArticleId: $currentPriceListArticleId)
    }
  }
`;

export function useCanUsePriceListArticleInternalCodeQuery(
  options: Omit<Urql.UseQueryArgs<CanUsePriceListArticleInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<CanUsePriceListArticleInternalCodeQuery, CanUsePriceListArticleInternalCodeQueryVariables>({
    query: CanUsePriceListArticleInternalCodeDocument,
    ...options,
  });
}
export const ExportPriceListArticlesDocument = gql`
  query exportPriceListArticles($where: PriceListArticleFilterInput, $order: [PriceListArticleSortInput!]) {
    priceListArticle {
      exportToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportPriceListArticlesQuery(
  options?: Omit<Urql.UseQueryArgs<ExportPriceListArticlesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ExportPriceListArticlesQuery, ExportPriceListArticlesQueryVariables>({
    query: ExportPriceListArticlesDocument,
    ...options,
  });
}
export const GetPriceListArticleDocument = gql`
  query getPriceListArticle($priceListArticleId: Int!) {
    priceListArticle {
      get(id: $priceListArticleId) {
        ...PriceListArticleDetailFragment
      }
    }
  }
  ${PriceListArticleDetailFragmentDoc}
  ${PriceListArticleFragmentDoc}
  ${PriceListFragmentDoc}
`;

export function useGetPriceListArticleQuery(
  options: Omit<Urql.UseQueryArgs<GetPriceListArticleQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetPriceListArticleQuery, GetPriceListArticleQueryVariables>({
    query: GetPriceListArticleDocument,
    ...options,
  });
}
export const DeletePriceListArticleDocument = gql`
  mutation deletePriceListArticle($id: Int!) {
    priceListArticle {
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

export function useDeletePriceListArticleMutation() {
  return Urql.useMutation<DeletePriceListArticleMutation, DeletePriceListArticleMutationVariables>(
    DeletePriceListArticleDocument,
  );
}
export const GetAllPriceListArticlesDocument = gql`
  query getAllPriceListArticles($where: PriceListArticleFilterInput, $order: [PriceListArticleSortInput!]) {
    priceListArticle {
      listPriceListArticlesFull(where: $where, order: $order) {
        ...TicketPriceListArticleFragment
      }
    }
  }
  ${TicketPriceListArticleFragmentDoc}
  ${PriceListFragmentDoc}
`;

export function useGetAllPriceListArticlesQuery(
  options?: Omit<Urql.UseQueryArgs<GetAllPriceListArticlesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetAllPriceListArticlesQuery, GetAllPriceListArticlesQueryVariables>({
    query: GetAllPriceListArticlesDocument,
    ...options,
  });
}
export const GetPriceListArticleExcelImportTemplateDocument = gql`
  query getPriceListArticleExcelImportTemplate {
    priceListArticle {
      templateOfImportFromExcel {
        resourceUrl
      }
    }
  }
`;

export function useGetPriceListArticleExcelImportTemplateQuery(
  options?: Omit<Urql.UseQueryArgs<GetPriceListArticleExcelImportTemplateQueryVariables>, 'query'>,
) {
  return Urql.useQuery<
    GetPriceListArticleExcelImportTemplateQuery,
    GetPriceListArticleExcelImportTemplateQueryVariables
  >({ query: GetPriceListArticleExcelImportTemplateDocument, ...options });
}
export const ImportPriceListArticlesDocument = gql`
  mutation importPriceListArticles($file: Upload!) {
    priceListArticle {
      importFromExcel(file: $file) {
        errors
        isSuccess
        value
        validationErrors {
          ...ValidationErrorFragment
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
`;

export function useImportPriceListArticlesMutation() {
  return Urql.useMutation<ImportPriceListArticlesMutation, ImportPriceListArticlesMutationVariables>(
    ImportPriceListArticlesDocument,
  );
}
