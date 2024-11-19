// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { ContractTypeFragmentDoc } from './RealGimm.Web.ContractType.fragment';
import { UsageTypeFragmentDoc } from './RealGimm.Web.EstateUsageType.fragment';
import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';

export type GetContractTypesQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.ContractTypeFilterInput>;
  order?: Types.InputMaybe<Array<Types.ContractTypeSortInput> | Types.ContractTypeSortInput>;
}>;

export type GetContractTypesQuery = {
  __typename?: 'Query';
  contractType: {
    __typename?: 'ContractTypeQueries';
    listContractTypes?: {
      __typename?: 'ListContractTypesConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'ContractType';
        id: number;
        internalCode: string;
        description: string;
        isActive: boolean;
        isRentChargeApplicable: boolean;
        nature: Types.AssetNature;
        usageTypeId: number;
        isRegistrationTax: boolean;
        isStampTax: boolean;
        registrationTaxIncomeType?: Types.RegistrationTaxIncomeTypeRli | null;
        registrationTaxPercent?: number | null;
        registrationTaxTenantPercent?: number | null;
        isRevaluationApplicable: boolean;
        isAbsoluteRevaluation: boolean;
        revaluationRatePercent?: number | null;
        revaluationIndexMonth?: number | null;
        revaluationCalculationMonth?: number | null;
        usageType: {
          __typename?: 'EstateUsageType';
          id: number;
          name: string;
          internalCode: string;
          ordering: number;
          isForEstate: boolean;
          isForEstateUnit: boolean;
          isForEstateSubUnit: boolean;
          isForContracts: boolean;
        };
      }> | null;
    } | null;
  };
};

export type GetContractTypeQueryVariables = Types.Exact<{
  contractTypeId: Types.Scalars['Int']['input'];
}>;

export type GetContractTypeQuery = {
  __typename?: 'Query';
  contractType: {
    __typename?: 'ContractTypeQueries';
    get?: {
      __typename?: 'ContractType';
      id: number;
      internalCode: string;
      description: string;
      isActive: boolean;
      isRentChargeApplicable: boolean;
      nature: Types.AssetNature;
      usageTypeId: number;
      isRegistrationTax: boolean;
      isStampTax: boolean;
      registrationTaxIncomeType?: Types.RegistrationTaxIncomeTypeRli | null;
      registrationTaxPercent?: number | null;
      registrationTaxTenantPercent?: number | null;
      isRevaluationApplicable: boolean;
      isAbsoluteRevaluation: boolean;
      revaluationRatePercent?: number | null;
      revaluationIndexMonth?: number | null;
      revaluationCalculationMonth?: number | null;
      usageType: {
        __typename?: 'EstateUsageType';
        id: number;
        name: string;
        internalCode: string;
        ordering: number;
        isForEstate: boolean;
        isForEstateUnit: boolean;
        isForEstateSubUnit: boolean;
        isForContracts: boolean;
      };
    } | null;
  };
};

export type ExportContractTypesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ContractTypeFilterInput>;
  order?: Types.InputMaybe<Array<Types.ContractTypeSortInput> | Types.ContractTypeSortInput>;
}>;

export type ExportContractTypesQuery = {
  __typename?: 'Query';
  contractType: {
    __typename?: 'ContractTypeQueries';
    exportToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string };
  };
};

export type CreateContractTypeMutationVariables = Types.Exact<{
  contractTypeInput: Types.ContractTypeInput;
}>;

export type CreateContractTypeMutation = {
  __typename?: 'Mutation';
  contractType: {
    __typename?: 'ContractTypeMutations';
    add: {
      __typename?: 'ResultOfContractType';
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

export type UpdateContractTypeMutationVariables = Types.Exact<{
  contractTypeId: Types.Scalars['Int']['input'];
  contractTypeInput: Types.ContractTypeInput;
}>;

export type UpdateContractTypeMutation = {
  __typename?: 'Mutation';
  contractType: {
    __typename?: 'ContractTypeMutations';
    update: {
      __typename?: 'ResultOfContractType';
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

export type DeleteContractTypeMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;

export type DeleteContractTypeMutation = {
  __typename?: 'Mutation';
  contractType: {
    __typename?: 'ContractTypeMutations';
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

export type DeleteContractTypesMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeleteContractTypesMutation = {
  __typename?: 'Mutation';
  contractType: {
    __typename?: 'ContractTypeMutations';
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

export type GetContractTypeInternalCodeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetContractTypeInternalCodeQuery = {
  __typename?: 'Query';
  contractType: { __typename?: 'ContractTypeQueries'; proposeNewInternalCode?: string | null };
};

export type CanUseContractTypeInternalCodeQueryVariables = Types.Exact<{
  internalCode: Types.Scalars['String']['input'];
  currentContractTypeId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CanUseContractTypeInternalCodeQuery = {
  __typename?: 'Query';
  contractType: { __typename?: 'ContractTypeQueries'; canUseInternalCode: boolean };
};

export const GetContractTypesDocument = gql`
  query getContractTypes(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: ContractTypeFilterInput
    $order: [ContractTypeSortInput!]
  ) {
    contractType {
      listContractTypes(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...ContractTypeFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${ContractTypeFragmentDoc}
  ${UsageTypeFragmentDoc}
`;

export function useGetContractTypesQuery(options?: Omit<Urql.UseQueryArgs<GetContractTypesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetContractTypesQuery, GetContractTypesQueryVariables>({
    query: GetContractTypesDocument,
    ...options,
  });
}
export const GetContractTypeDocument = gql`
  query getContractType($contractTypeId: Int!) {
    contractType {
      get(id: $contractTypeId) {
        ...ContractTypeFragment
      }
    }
  }
  ${ContractTypeFragmentDoc}
  ${UsageTypeFragmentDoc}
`;

export function useGetContractTypeQuery(options: Omit<Urql.UseQueryArgs<GetContractTypeQueryVariables>, 'query'>) {
  return Urql.useQuery<GetContractTypeQuery, GetContractTypeQueryVariables>({
    query: GetContractTypeDocument,
    ...options,
  });
}
export const ExportContractTypesDocument = gql`
  query exportContractTypes($where: ContractTypeFilterInput, $order: [ContractTypeSortInput!]) {
    contractType {
      exportToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportContractTypesQuery(
  options?: Omit<Urql.UseQueryArgs<ExportContractTypesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ExportContractTypesQuery, ExportContractTypesQueryVariables>({
    query: ExportContractTypesDocument,
    ...options,
  });
}
export const CreateContractTypeDocument = gql`
  mutation createContractType($contractTypeInput: ContractTypeInput!) {
    contractType {
      add(input: $contractTypeInput) {
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

export function useCreateContractTypeMutation() {
  return Urql.useMutation<CreateContractTypeMutation, CreateContractTypeMutationVariables>(CreateContractTypeDocument);
}
export const UpdateContractTypeDocument = gql`
  mutation updateContractType($contractTypeId: Int!, $contractTypeInput: ContractTypeInput!) {
    contractType {
      update(id: $contractTypeId, input: $contractTypeInput) {
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

export function useUpdateContractTypeMutation() {
  return Urql.useMutation<UpdateContractTypeMutation, UpdateContractTypeMutationVariables>(UpdateContractTypeDocument);
}
export const DeleteContractTypeDocument = gql`
  mutation deleteContractType($id: Int!) {
    contractType {
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

export function useDeleteContractTypeMutation() {
  return Urql.useMutation<DeleteContractTypeMutation, DeleteContractTypeMutationVariables>(DeleteContractTypeDocument);
}
export const DeleteContractTypesDocument = gql`
  mutation deleteContractTypes($ids: [Int!]!) {
    contractType {
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

export function useDeleteContractTypesMutation() {
  return Urql.useMutation<DeleteContractTypesMutation, DeleteContractTypesMutationVariables>(
    DeleteContractTypesDocument,
  );
}
export const GetContractTypeInternalCodeDocument = gql`
  query getContractTypeInternalCode {
    contractType {
      proposeNewInternalCode
    }
  }
`;

export function useGetContractTypeInternalCodeQuery(
  options?: Omit<Urql.UseQueryArgs<GetContractTypeInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetContractTypeInternalCodeQuery, GetContractTypeInternalCodeQueryVariables>({
    query: GetContractTypeInternalCodeDocument,
    ...options,
  });
}
export const CanUseContractTypeInternalCodeDocument = gql`
  query canUseContractTypeInternalCode($internalCode: String!, $currentContractTypeId: Int) {
    contractType {
      canUseInternalCode(internalCode: $internalCode, currentContractTypeId: $currentContractTypeId)
    }
  }
`;

export function useCanUseContractTypeInternalCodeQuery(
  options: Omit<Urql.UseQueryArgs<CanUseContractTypeInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<CanUseContractTypeInternalCodeQuery, CanUseContractTypeInternalCodeQueryVariables>({
    query: CanUseContractTypeInternalCodeDocument,
    ...options,
  });
}
