// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';

export type ConfirmTemporaryRegistryCommunicationGroupMutationVariables = Types.Exact<{
  groupId: Types.TemporaryRegistryCommunicationGroupIdInput;
  date: Types.Scalars['Date']['input'];
  requestingSubjectLegalRepresentativeId: Types.Scalars['Int']['input'];
  debtBankAccountId: Types.Scalars['Int']['input'];
}>;

export type ConfirmTemporaryRegistryCommunicationGroupMutation = {
  __typename?: 'Mutation';
  temporaryRegistryCommunication: {
    __typename?: 'TemporaryRegistryCommunicationMutations';
    confirm: {
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

export type ConfirmTemporaryRegistryCommunicationGroupsMutationVariables = Types.Exact<{
  groupIds: Array<Types.TemporaryRegistryCommunicationGroupIdInput> | Types.TemporaryRegistryCommunicationGroupIdInput;
  inputs:
    | Array<Types.ConfirmTemporaryRegistryCommunicationGroupInput>
    | Types.ConfirmTemporaryRegistryCommunicationGroupInput;
}>;

export type ConfirmTemporaryRegistryCommunicationGroupsMutation = {
  __typename?: 'Mutation';
  temporaryRegistryCommunication: {
    __typename?: 'TemporaryRegistryCommunicationMutations';
    confirmRange: {
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

export type ConfirmAllTemporaryRegistryCommunicationGroupsMutationVariables = Types.Exact<{
  inputs:
    | Array<Types.ConfirmTemporaryRegistryCommunicationGroupInput>
    | Types.ConfirmTemporaryRegistryCommunicationGroupInput;
}>;

export type ConfirmAllTemporaryRegistryCommunicationGroupsMutation = {
  __typename?: 'Mutation';
  temporaryRegistryCommunication: {
    __typename?: 'TemporaryRegistryCommunicationMutations';
    confirmAll: {
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

export const ConfirmTemporaryRegistryCommunicationGroupDocument = gql`
  mutation confirmTemporaryRegistryCommunicationGroup(
    $groupId: TemporaryRegistryCommunicationGroupIdInput!
    $date: Date!
    $requestingSubjectLegalRepresentativeId: Int!
    $debtBankAccountId: Int!
  ) {
    temporaryRegistryCommunication {
      confirm(
        groupId: $groupId
        date: $date
        requestingSubjectLegalRepresentativeId: $requestingSubjectLegalRepresentativeId
        debtBankAccountId: $debtBankAccountId
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

export function useConfirmTemporaryRegistryCommunicationGroupMutation() {
  return Urql.useMutation<
    ConfirmTemporaryRegistryCommunicationGroupMutation,
    ConfirmTemporaryRegistryCommunicationGroupMutationVariables
  >(ConfirmTemporaryRegistryCommunicationGroupDocument);
}
export const ConfirmTemporaryRegistryCommunicationGroupsDocument = gql`
  mutation confirmTemporaryRegistryCommunicationGroups(
    $groupIds: [TemporaryRegistryCommunicationGroupIdInput!]!
    $inputs: [ConfirmTemporaryRegistryCommunicationGroupInput!]!
  ) {
    temporaryRegistryCommunication {
      confirmRange(groupIds: $groupIds, inputs: $inputs) {
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

export function useConfirmTemporaryRegistryCommunicationGroupsMutation() {
  return Urql.useMutation<
    ConfirmTemporaryRegistryCommunicationGroupsMutation,
    ConfirmTemporaryRegistryCommunicationGroupsMutationVariables
  >(ConfirmTemporaryRegistryCommunicationGroupsDocument);
}
export const ConfirmAllTemporaryRegistryCommunicationGroupsDocument = gql`
  mutation confirmAllTemporaryRegistryCommunicationGroups(
    $inputs: [ConfirmTemporaryRegistryCommunicationGroupInput!]!
  ) {
    temporaryRegistryCommunication {
      confirmAll(inputs: $inputs) {
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

export function useConfirmAllTemporaryRegistryCommunicationGroupsMutation() {
  return Urql.useMutation<
    ConfirmAllTemporaryRegistryCommunicationGroupsMutation,
    ConfirmAllTemporaryRegistryCommunicationGroupsMutationVariables
  >(ConfirmAllTemporaryRegistryCommunicationGroupsDocument);
}
