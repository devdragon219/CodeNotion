// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { AccountingItemFragmentDoc } from './RealGimm.Web.AccountingItem.fragment';
import { BillItemTypeFragmentDoc } from './RealGimm.Web.BillItemType.fragment';
import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';
import { VatRateFragmentDoc } from './RealGimm.Web.VatRate.fragment';

export type GetBillItemTypesQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.BillItemTypeFilterInput>;
  order?: Types.InputMaybe<Array<Types.BillItemTypeSortInput> | Types.BillItemTypeSortInput>;
}>;

export type GetBillItemTypesQuery = {
  __typename?: 'Query';
  billItemType: {
    __typename?: 'BillItemTypeQueries';
    listBillItemTypes?: {
      __typename?: 'ListBillItemTypesConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'BillItemType';
        id: number;
        internalCode: string;
        description: string;
        isPositive: boolean;
        isForContractFee: boolean;
        isForContractCosts: boolean;
        isForAdministration: boolean;
        isForTax: boolean;
        defaultAccountingItem?: {
          __typename?: 'AccountingItem';
          id: number;
          description: string;
          internalCode: string;
          externalCode: string;
        } | null;
        activeSubjectVR: {
          __typename?: 'VATRate';
          id: number;
          internalCode: string;
          description: string;
          type: Types.VatRateType;
          ratePercent: number;
        };
        activeExemptVR: {
          __typename?: 'VATRate';
          id: number;
          internalCode: string;
          description: string;
          type: Types.VatRateType;
          ratePercent: number;
        };
        activeNonTaxableVR: {
          __typename?: 'VATRate';
          id: number;
          internalCode: string;
          description: string;
          type: Types.VatRateType;
          ratePercent: number;
        };
        passiveSubjectVR: {
          __typename?: 'VATRate';
          id: number;
          internalCode: string;
          description: string;
          type: Types.VatRateType;
          ratePercent: number;
        };
        passiveExemptVR: {
          __typename?: 'VATRate';
          id: number;
          internalCode: string;
          description: string;
          type: Types.VatRateType;
          ratePercent: number;
        };
        passiveNonTaxableVR: {
          __typename?: 'VATRate';
          id: number;
          internalCode: string;
          description: string;
          type: Types.VatRateType;
          ratePercent: number;
        };
        administrationVR: {
          __typename?: 'VATRate';
          id: number;
          internalCode: string;
          description: string;
          type: Types.VatRateType;
          ratePercent: number;
        };
      }> | null;
    } | null;
  };
};

export type GetBillItemTypeQueryVariables = Types.Exact<{
  billItemTypeId: Types.Scalars['Int']['input'];
}>;

export type GetBillItemTypeQuery = {
  __typename?: 'Query';
  billItemType: {
    __typename?: 'BillItemTypeQueries';
    get?: {
      __typename?: 'BillItemType';
      id: number;
      internalCode: string;
      description: string;
      isPositive: boolean;
      isForContractFee: boolean;
      isForContractCosts: boolean;
      isForAdministration: boolean;
      isForTax: boolean;
      defaultAccountingItem?: {
        __typename?: 'AccountingItem';
        id: number;
        description: string;
        internalCode: string;
        externalCode: string;
      } | null;
      activeSubjectVR: {
        __typename?: 'VATRate';
        id: number;
        internalCode: string;
        description: string;
        type: Types.VatRateType;
        ratePercent: number;
      };
      activeExemptVR: {
        __typename?: 'VATRate';
        id: number;
        internalCode: string;
        description: string;
        type: Types.VatRateType;
        ratePercent: number;
      };
      activeNonTaxableVR: {
        __typename?: 'VATRate';
        id: number;
        internalCode: string;
        description: string;
        type: Types.VatRateType;
        ratePercent: number;
      };
      passiveSubjectVR: {
        __typename?: 'VATRate';
        id: number;
        internalCode: string;
        description: string;
        type: Types.VatRateType;
        ratePercent: number;
      };
      passiveExemptVR: {
        __typename?: 'VATRate';
        id: number;
        internalCode: string;
        description: string;
        type: Types.VatRateType;
        ratePercent: number;
      };
      passiveNonTaxableVR: {
        __typename?: 'VATRate';
        id: number;
        internalCode: string;
        description: string;
        type: Types.VatRateType;
        ratePercent: number;
      };
      administrationVR: {
        __typename?: 'VATRate';
        id: number;
        internalCode: string;
        description: string;
        type: Types.VatRateType;
        ratePercent: number;
      };
    } | null;
  };
};

export type ExportBillItemTypesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.BillItemTypeFilterInput>;
  order?: Types.InputMaybe<Array<Types.BillItemTypeSortInput> | Types.BillItemTypeSortInput>;
}>;

export type ExportBillItemTypesQuery = {
  __typename?: 'Query';
  billItemType: {
    __typename?: 'BillItemTypeQueries';
    exportToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string };
  };
};

export type CreateBillItemTypeMutationVariables = Types.Exact<{
  input: Types.BillItemTypeInput;
}>;

export type CreateBillItemTypeMutation = {
  __typename?: 'Mutation';
  billItemType: {
    __typename?: 'BillItemTypeMutations';
    add: {
      __typename?: 'ResultOfBillItemType';
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

export type UpdateBillItemTypeMutationVariables = Types.Exact<{
  billItemTypeId: Types.Scalars['Int']['input'];
  input: Types.BillItemTypeInput;
}>;

export type UpdateBillItemTypeMutation = {
  __typename?: 'Mutation';
  billItemType: {
    __typename?: 'BillItemTypeMutations';
    update: {
      __typename?: 'ResultOfBillItemType';
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

export type DeleteBillItemTypeMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;

export type DeleteBillItemTypeMutation = {
  __typename?: 'Mutation';
  billItemType: {
    __typename?: 'BillItemTypeMutations';
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

export type DeleteBillItemTypesMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeleteBillItemTypesMutation = {
  __typename?: 'Mutation';
  billItemType: {
    __typename?: 'BillItemTypeMutations';
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

export type GetBillItemTypeInternalCodeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetBillItemTypeInternalCodeQuery = {
  __typename?: 'Query';
  billItemType: { __typename?: 'BillItemTypeQueries'; proposeNewInternalCode?: string | null };
};

export type CanUseBillItemTypeInternalCodeQueryVariables = Types.Exact<{
  internalCode: Types.Scalars['String']['input'];
  currentBillItemTypeId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CanUseBillItemTypeInternalCodeQuery = {
  __typename?: 'Query';
  billItemType: { __typename?: 'BillItemTypeQueries'; canUseInternalCode: boolean };
};

export const GetBillItemTypesDocument = gql`
  query getBillItemTypes(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: BillItemTypeFilterInput
    $order: [BillItemTypeSortInput!]
  ) {
    billItemType {
      listBillItemTypes(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...BillItemTypeFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${BillItemTypeFragmentDoc}
  ${AccountingItemFragmentDoc}
  ${VatRateFragmentDoc}
`;

export function useGetBillItemTypesQuery(options?: Omit<Urql.UseQueryArgs<GetBillItemTypesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetBillItemTypesQuery, GetBillItemTypesQueryVariables>({
    query: GetBillItemTypesDocument,
    ...options,
  });
}
export const GetBillItemTypeDocument = gql`
  query getBillItemType($billItemTypeId: Int!) {
    billItemType {
      get(id: $billItemTypeId) {
        ...BillItemTypeFragment
      }
    }
  }
  ${BillItemTypeFragmentDoc}
  ${AccountingItemFragmentDoc}
  ${VatRateFragmentDoc}
`;

export function useGetBillItemTypeQuery(options: Omit<Urql.UseQueryArgs<GetBillItemTypeQueryVariables>, 'query'>) {
  return Urql.useQuery<GetBillItemTypeQuery, GetBillItemTypeQueryVariables>({
    query: GetBillItemTypeDocument,
    ...options,
  });
}
export const ExportBillItemTypesDocument = gql`
  query exportBillItemTypes($where: BillItemTypeFilterInput, $order: [BillItemTypeSortInput!]) {
    billItemType {
      exportToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportBillItemTypesQuery(
  options?: Omit<Urql.UseQueryArgs<ExportBillItemTypesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ExportBillItemTypesQuery, ExportBillItemTypesQueryVariables>({
    query: ExportBillItemTypesDocument,
    ...options,
  });
}
export const CreateBillItemTypeDocument = gql`
  mutation createBillItemType($input: BillItemTypeInput!) {
    billItemType {
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

export function useCreateBillItemTypeMutation() {
  return Urql.useMutation<CreateBillItemTypeMutation, CreateBillItemTypeMutationVariables>(CreateBillItemTypeDocument);
}
export const UpdateBillItemTypeDocument = gql`
  mutation updateBillItemType($billItemTypeId: Int!, $input: BillItemTypeInput!) {
    billItemType {
      update(id: $billItemTypeId, input: $input) {
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

export function useUpdateBillItemTypeMutation() {
  return Urql.useMutation<UpdateBillItemTypeMutation, UpdateBillItemTypeMutationVariables>(UpdateBillItemTypeDocument);
}
export const DeleteBillItemTypeDocument = gql`
  mutation deleteBillItemType($id: Int!) {
    billItemType {
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

export function useDeleteBillItemTypeMutation() {
  return Urql.useMutation<DeleteBillItemTypeMutation, DeleteBillItemTypeMutationVariables>(DeleteBillItemTypeDocument);
}
export const DeleteBillItemTypesDocument = gql`
  mutation deleteBillItemTypes($ids: [Int!]!) {
    billItemType {
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

export function useDeleteBillItemTypesMutation() {
  return Urql.useMutation<DeleteBillItemTypesMutation, DeleteBillItemTypesMutationVariables>(
    DeleteBillItemTypesDocument,
  );
}
export const GetBillItemTypeInternalCodeDocument = gql`
  query getBillItemTypeInternalCode {
    billItemType {
      proposeNewInternalCode
    }
  }
`;

export function useGetBillItemTypeInternalCodeQuery(
  options?: Omit<Urql.UseQueryArgs<GetBillItemTypeInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetBillItemTypeInternalCodeQuery, GetBillItemTypeInternalCodeQueryVariables>({
    query: GetBillItemTypeInternalCodeDocument,
    ...options,
  });
}
export const CanUseBillItemTypeInternalCodeDocument = gql`
  query canUseBillItemTypeInternalCode($internalCode: String!, $currentBillItemTypeId: Int) {
    billItemType {
      canUseInternalCode(internalCode: $internalCode, currentBillItemTypeId: $currentBillItemTypeId)
    }
  }
`;

export function useCanUseBillItemTypeInternalCodeQuery(
  options: Omit<Urql.UseQueryArgs<CanUseBillItemTypeInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<CanUseBillItemTypeInternalCodeQuery, CanUseBillItemTypeInternalCodeQueryVariables>({
    query: CanUseBillItemTypeInternalCodeDocument,
    ...options,
  });
}
