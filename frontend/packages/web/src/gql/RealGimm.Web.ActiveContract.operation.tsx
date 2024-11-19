// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';

export type TakeoverActiveContractLandlordMutationVariables = Types.Exact<{
  contractId: Types.Scalars['Int']['input'];
  legalRepresentativeSubjectId: Types.Scalars['Int']['input'];
  paymentDate: Types.Scalars['Date']['input'];
  successorIds: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type TakeoverActiveContractLandlordMutation = {
  __typename?: 'Mutation';
  activeContract: {
    __typename?: 'ActiveContractMutations';
    takeoverLandlord: {
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

export type AddActiveContractTenantsMutationVariables = Types.Exact<{
  contractId: Types.Scalars['Int']['input'];
  updatedCounterpartInputs:
    | Array<Types.ContractVariationUpdatedCounterpartInput>
    | Types.ContractVariationUpdatedCounterpartInput;
  newCounterpartInputs: Array<Types.ContractVariationNewCounterpartInput> | Types.ContractVariationNewCounterpartInput;
}>;

export type AddActiveContractTenantsMutation = {
  __typename?: 'Mutation';
  activeContract: {
    __typename?: 'ActiveContractMutations';
    addTenants: {
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

export type TakeoverActiveContractTenantsMutationVariables = Types.Exact<{
  contractId: Types.Scalars['Int']['input'];
  takeoverDate: Types.Scalars['Date']['input'];
  takeoverType: Types.TakeoverType;
  updatedCounterpartInputs:
    | Array<Types.ContractNoDateUpdateCounterpartInput>
    | Types.ContractNoDateUpdateCounterpartInput;
  newCounterpartInputs: Array<Types.ContractNoDateNewCounterpartInput> | Types.ContractNoDateNewCounterpartInput;
}>;

export type TakeoverActiveContractTenantsMutation = {
  __typename?: 'Mutation';
  activeContract: {
    __typename?: 'ActiveContractMutations';
    takeoverTenants: {
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

export type TransferActiveContractTenantsMutationVariables = Types.Exact<{
  contractId: Types.Scalars['Int']['input'];
  transferDate: Types.Scalars['Date']['input'];
  updatedCounterpartInputs:
    | Array<Types.ContractNoDateUpdateCounterpartInput>
    | Types.ContractNoDateUpdateCounterpartInput;
  newCounterpartInputs: Array<Types.ContractNoDateNewCounterpartInput> | Types.ContractNoDateNewCounterpartInput;
}>;

export type TransferActiveContractTenantsMutation = {
  __typename?: 'Mutation';
  activeContract: {
    __typename?: 'ActiveContractMutations';
    transferTenants: {
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

export type DeceaseActiveContractTenantMutationVariables = Types.Exact<{
  contractId: Types.Scalars['Int']['input'];
  deadCounterpartId: Types.Scalars['Int']['input'];
  heirInputs: Array<Types.ContractDeathVariationNewCounterpartInput> | Types.ContractDeathVariationNewCounterpartInput;
  updatedCounterpartInputs:
    | Array<Types.ContractVariationUpdatedCounterpartInput>
    | Types.ContractVariationUpdatedCounterpartInput;
}>;

export type DeceaseActiveContractTenantMutation = {
  __typename?: 'Mutation';
  activeContract: {
    __typename?: 'ActiveContractMutations';
    takeoverDeadTenant: {
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

export const TakeoverActiveContractLandlordDocument = gql`
  mutation takeoverActiveContractLandlord(
    $contractId: Int!
    $legalRepresentativeSubjectId: Int!
    $paymentDate: Date!
    $successorIds: [Int!]!
  ) {
    activeContract {
      takeoverLandlord(
        contractId: $contractId
        legalRepresentativeSubjectId: $legalRepresentativeSubjectId
        paymentDate: $paymentDate
        successorIds: $successorIds
      ) {
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

export function useTakeoverActiveContractLandlordMutation() {
  return Urql.useMutation<TakeoverActiveContractLandlordMutation, TakeoverActiveContractLandlordMutationVariables>(
    TakeoverActiveContractLandlordDocument,
  );
}
export const AddActiveContractTenantsDocument = gql`
  mutation addActiveContractTenants(
    $contractId: Int!
    $updatedCounterpartInputs: [ContractVariationUpdatedCounterpartInput!]!
    $newCounterpartInputs: [ContractVariationNewCounterpartInput!]!
  ) {
    activeContract {
      addTenants(
        contractId: $contractId
        updatedCounterpartInputs: $updatedCounterpartInputs
        newCounterpartInputs: $newCounterpartInputs
      ) {
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

export function useAddActiveContractTenantsMutation() {
  return Urql.useMutation<AddActiveContractTenantsMutation, AddActiveContractTenantsMutationVariables>(
    AddActiveContractTenantsDocument,
  );
}
export const TakeoverActiveContractTenantsDocument = gql`
  mutation takeoverActiveContractTenants(
    $contractId: Int!
    $takeoverDate: Date!
    $takeoverType: TakeoverType!
    $updatedCounterpartInputs: [ContractNoDateUpdateCounterpartInput!]!
    $newCounterpartInputs: [ContractNoDateNewCounterpartInput!]!
  ) {
    activeContract {
      takeoverTenants(
        contractId: $contractId
        takeoverDate: $takeoverDate
        takeoverType: $takeoverType
        updatedCounterpartInputs: $updatedCounterpartInputs
        newCounterpartInputs: $newCounterpartInputs
      ) {
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

export function useTakeoverActiveContractTenantsMutation() {
  return Urql.useMutation<TakeoverActiveContractTenantsMutation, TakeoverActiveContractTenantsMutationVariables>(
    TakeoverActiveContractTenantsDocument,
  );
}
export const TransferActiveContractTenantsDocument = gql`
  mutation transferActiveContractTenants(
    $contractId: Int!
    $transferDate: Date!
    $updatedCounterpartInputs: [ContractNoDateUpdateCounterpartInput!]!
    $newCounterpartInputs: [ContractNoDateNewCounterpartInput!]!
  ) {
    activeContract {
      transferTenants(
        contractId: $contractId
        transferDate: $transferDate
        updatedCounterpartInputs: $updatedCounterpartInputs
        newCounterpartInputs: $newCounterpartInputs
      ) {
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

export function useTransferActiveContractTenantsMutation() {
  return Urql.useMutation<TransferActiveContractTenantsMutation, TransferActiveContractTenantsMutationVariables>(
    TransferActiveContractTenantsDocument,
  );
}
export const DeceaseActiveContractTenantDocument = gql`
  mutation deceaseActiveContractTenant(
    $contractId: Int!
    $deadCounterpartId: Int!
    $heirInputs: [ContractDeathVariationNewCounterpartInput!]!
    $updatedCounterpartInputs: [ContractVariationUpdatedCounterpartInput!]!
  ) {
    activeContract {
      takeoverDeadTenant(
        contractId: $contractId
        deadCounterpartId: $deadCounterpartId
        heirInputs: $heirInputs
        updatedCounterpartInputs: $updatedCounterpartInputs
      ) {
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

export function useDeceaseActiveContractTenantMutation() {
  return Urql.useMutation<DeceaseActiveContractTenantMutation, DeceaseActiveContractTenantMutationVariables>(
    DeceaseActiveContractTenantDocument,
  );
}
