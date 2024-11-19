// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';
import { VatRateFragmentDoc } from './RealGimm.Web.VatRate.fragment';

export type GetVatRatesQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.VatRateFilterInput>;
  order?: Types.InputMaybe<Array<Types.VatRateSortInput> | Types.VatRateSortInput>;
}>;

export type GetVatRatesQuery = {
  __typename?: 'Query';
  vatRate: {
    __typename?: 'VATRateQueries';
    listVATRates?: {
      __typename?: 'ListVATRatesConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'VATRate';
        id: number;
        internalCode: string;
        description: string;
        type: Types.VatRateType;
        ratePercent: number;
      }> | null;
    } | null;
  };
};

export type GetVatRateInternalCodeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetVatRateInternalCodeQuery = {
  __typename?: 'Query';
  vatRate: { __typename?: 'VATRateQueries'; proposeNewInternalCode?: string | null };
};

export type CanUseVatRateInternalCodeQueryVariables = Types.Exact<{
  internalCode: Types.Scalars['String']['input'];
  currentVatRateId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CanUseVatRateInternalCodeQuery = {
  __typename?: 'Query';
  vatRate: { __typename?: 'VATRateQueries'; canUseInternalCode: boolean };
};

export type AddVatRateMutationVariables = Types.Exact<{
  input: Types.VatRateInput;
}>;

export type AddVatRateMutation = {
  __typename?: 'Mutation';
  vatRate: {
    __typename?: 'VATRateMutations';
    add: {
      __typename?: 'ResultOfVATRate';
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

export type UpdateVatRateMutationVariables = Types.Exact<{
  vatRateId: Types.Scalars['Int']['input'];
  input: Types.VatRateInput;
}>;

export type UpdateVatRateMutation = {
  __typename?: 'Mutation';
  vatRate: {
    __typename?: 'VATRateMutations';
    update: {
      __typename?: 'ResultOfVATRate';
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

export type DeleteVatRatesMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeleteVatRatesMutation = {
  __typename?: 'Mutation';
  vatRate: {
    __typename?: 'VATRateMutations';
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

export type ExportVatRatesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.VatRateFilterInput>;
  order?: Types.InputMaybe<Array<Types.VatRateSortInput> | Types.VatRateSortInput>;
}>;

export type ExportVatRatesQuery = {
  __typename?: 'Query';
  vatRate: { __typename?: 'VATRateQueries'; exportToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string } };
};

export const GetVatRatesDocument = gql`
  query getVATRates(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: VATRateFilterInput
    $order: [VATRateSortInput!]
  ) {
    vatRate {
      listVATRates(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...VatRateFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${VatRateFragmentDoc}
`;

export function useGetVatRatesQuery(options?: Omit<Urql.UseQueryArgs<GetVatRatesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetVatRatesQuery, GetVatRatesQueryVariables>({ query: GetVatRatesDocument, ...options });
}
export const GetVatRateInternalCodeDocument = gql`
  query getVatRateInternalCode {
    vatRate {
      proposeNewInternalCode
    }
  }
`;

export function useGetVatRateInternalCodeQuery(
  options?: Omit<Urql.UseQueryArgs<GetVatRateInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetVatRateInternalCodeQuery, GetVatRateInternalCodeQueryVariables>({
    query: GetVatRateInternalCodeDocument,
    ...options,
  });
}
export const CanUseVatRateInternalCodeDocument = gql`
  query canUseVatRateInternalCode($internalCode: String!, $currentVatRateId: Int) {
    vatRate {
      canUseInternalCode(internalCode: $internalCode, currentVATRateId: $currentVatRateId)
    }
  }
`;

export function useCanUseVatRateInternalCodeQuery(
  options: Omit<Urql.UseQueryArgs<CanUseVatRateInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<CanUseVatRateInternalCodeQuery, CanUseVatRateInternalCodeQueryVariables>({
    query: CanUseVatRateInternalCodeDocument,
    ...options,
  });
}
export const AddVatRateDocument = gql`
  mutation addVatRate($input: VATRateInput!) {
    vatRate {
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

export function useAddVatRateMutation() {
  return Urql.useMutation<AddVatRateMutation, AddVatRateMutationVariables>(AddVatRateDocument);
}
export const UpdateVatRateDocument = gql`
  mutation updateVatRate($vatRateId: Int!, $input: VATRateInput!) {
    vatRate {
      update(id: $vatRateId, input: $input) {
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

export function useUpdateVatRateMutation() {
  return Urql.useMutation<UpdateVatRateMutation, UpdateVatRateMutationVariables>(UpdateVatRateDocument);
}
export const DeleteVatRatesDocument = gql`
  mutation deleteVatRates($ids: [Int!]!) {
    vatRate {
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

export function useDeleteVatRatesMutation() {
  return Urql.useMutation<DeleteVatRatesMutation, DeleteVatRatesMutationVariables>(DeleteVatRatesDocument);
}
export const ExportVatRatesDocument = gql`
  query exportVatRates($where: VATRateFilterInput, $order: [VATRateSortInput!]) {
    vatRate {
      exportToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportVatRatesQuery(options?: Omit<Urql.UseQueryArgs<ExportVatRatesQueryVariables>, 'query'>) {
  return Urql.useQuery<ExportVatRatesQuery, ExportVatRatesQueryVariables>({
    query: ExportVatRatesDocument,
    ...options,
  });
}
