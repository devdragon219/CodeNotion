// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';

export type TakeoverPassiveContractTenantMutationVariables = Types.Exact<{
  contractId: Types.Scalars['Int']['input'];
  legalRepresentativeSubjectId: Types.Scalars['Int']['input'];
  paymentDate: Types.Scalars['Date']['input'];
  successorIds: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type TakeoverPassiveContractTenantMutation = {
  __typename?: 'Mutation';
  passiveContract: {
    __typename?: 'PassiveContractMutations';
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

export type AddPassiveContractLandlordsMutationVariables = Types.Exact<{
  contractId: Types.Scalars['Int']['input'];
  updatedCounterpartInputs:
    | Array<Types.ContractVariationUpdatedCounterpartInput>
    | Types.ContractVariationUpdatedCounterpartInput;
  newCounterpartInputs: Array<Types.ContractVariationNewCounterpartInput> | Types.ContractVariationNewCounterpartInput;
}>;

export type AddPassiveContractLandlordsMutation = {
  __typename?: 'Mutation';
  passiveContract: {
    __typename?: 'PassiveContractMutations';
    addLandlords: {
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

export type TakeoverPassiveContractLandlordsMutationVariables = Types.Exact<{
  contractId: Types.Scalars['Int']['input'];
  takeoverDate: Types.Scalars['Date']['input'];
  takeoverType: Types.TakeoverType;
  updatedCounterpartInputs:
    | Array<Types.ContractNoDateUpdateCounterpartInput>
    | Types.ContractNoDateUpdateCounterpartInput;
  newCounterpartInputs: Array<Types.ContractNoDateNewCounterpartInput> | Types.ContractNoDateNewCounterpartInput;
}>;

export type TakeoverPassiveContractLandlordsMutation = {
  __typename?: 'Mutation';
  passiveContract: {
    __typename?: 'PassiveContractMutations';
    takeoverLandlords: {
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

export type TransferPassiveContractLandlordsMutationVariables = Types.Exact<{
  contractId: Types.Scalars['Int']['input'];
  transferDate: Types.Scalars['Date']['input'];
  updatedCounterpartInputs:
    | Array<Types.ContractNoDateUpdateCounterpartInput>
    | Types.ContractNoDateUpdateCounterpartInput;
  newCounterpartInputs: Array<Types.ContractNoDateNewCounterpartInput> | Types.ContractNoDateNewCounterpartInput;
}>;

export type TransferPassiveContractLandlordsMutation = {
  __typename?: 'Mutation';
  passiveContract: {
    __typename?: 'PassiveContractMutations';
    transferLandlords: {
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

export type DeceasePassiveContractLandlordMutationVariables = Types.Exact<{
  contractId: Types.Scalars['Int']['input'];
  deadCounterpartId: Types.Scalars['Int']['input'];
  heirInputs: Array<Types.ContractDeathVariationNewCounterpartInput> | Types.ContractDeathVariationNewCounterpartInput;
  updatedCounterpartInputs:
    | Array<Types.ContractVariationUpdatedCounterpartInput>
    | Types.ContractVariationUpdatedCounterpartInput;
}>;

export type DeceasePassiveContractLandlordMutation = {
  __typename?: 'Mutation';
  passiveContract: {
    __typename?: 'PassiveContractMutations';
    takeoverDeadLandlord: {
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

export const TakeoverPassiveContractTenantDocument = gql`
  mutation takeoverPassiveContractTenant(
    $contractId: Int!
    $legalRepresentativeSubjectId: Int!
    $paymentDate: Date!
    $successorIds: [Int!]!
  ) {
    passiveContract {
      takeoverTenants(
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

export function useTakeoverPassiveContractTenantMutation() {
  return Urql.useMutation<TakeoverPassiveContractTenantMutation, TakeoverPassiveContractTenantMutationVariables>(
    TakeoverPassiveContractTenantDocument,
  );
}
export const AddPassiveContractLandlordsDocument = gql`
  mutation addPassiveContractLandlords(
    $contractId: Int!
    $updatedCounterpartInputs: [ContractVariationUpdatedCounterpartInput!]!
    $newCounterpartInputs: [ContractVariationNewCounterpartInput!]!
  ) {
    passiveContract {
      addLandlords(
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

export function useAddPassiveContractLandlordsMutation() {
  return Urql.useMutation<AddPassiveContractLandlordsMutation, AddPassiveContractLandlordsMutationVariables>(
    AddPassiveContractLandlordsDocument,
  );
}
export const TakeoverPassiveContractLandlordsDocument = gql`
  mutation takeoverPassiveContractLandlords(
    $contractId: Int!
    $takeoverDate: Date!
    $takeoverType: TakeoverType!
    $updatedCounterpartInputs: [ContractNoDateUpdateCounterpartInput!]!
    $newCounterpartInputs: [ContractNoDateNewCounterpartInput!]!
  ) {
    passiveContract {
      takeoverLandlords(
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

export function useTakeoverPassiveContractLandlordsMutation() {
  return Urql.useMutation<TakeoverPassiveContractLandlordsMutation, TakeoverPassiveContractLandlordsMutationVariables>(
    TakeoverPassiveContractLandlordsDocument,
  );
}
export const TransferPassiveContractLandlordsDocument = gql`
  mutation transferPassiveContractLandlords(
    $contractId: Int!
    $transferDate: Date!
    $updatedCounterpartInputs: [ContractNoDateUpdateCounterpartInput!]!
    $newCounterpartInputs: [ContractNoDateNewCounterpartInput!]!
  ) {
    passiveContract {
      transferLandlords(
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

export function useTransferPassiveContractLandlordsMutation() {
  return Urql.useMutation<TransferPassiveContractLandlordsMutation, TransferPassiveContractLandlordsMutationVariables>(
    TransferPassiveContractLandlordsDocument,
  );
}
export const DeceasePassiveContractLandlordDocument = gql`
  mutation deceasePassiveContractLandlord(
    $contractId: Int!
    $deadCounterpartId: Int!
    $heirInputs: [ContractDeathVariationNewCounterpartInput!]!
    $updatedCounterpartInputs: [ContractVariationUpdatedCounterpartInput!]!
  ) {
    passiveContract {
      takeoverDeadLandlord(
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

export function useDeceasePassiveContractLandlordMutation() {
  return Urql.useMutation<DeceasePassiveContractLandlordMutation, DeceasePassiveContractLandlordMutationVariables>(
    DeceasePassiveContractLandlordDocument,
  );
}
