// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';

export type CancelConfirmedRegistryCommunicationGroupMutationVariables = Types.Exact<{
  groupId: Types.ConfirmedRegistryCommunicationGroupIdInput;
}>;

export type CancelConfirmedRegistryCommunicationGroupMutation = {
  __typename?: 'Mutation';
  confirmedRegistryCommunication: {
    __typename?: 'ConfirmedRegistryCommunicationMutations';
    cancelConfirmation: {
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

export type CancelConfirmedRegistryCommunicationGroupsMutationVariables = Types.Exact<{
  groupIds: Array<Types.ConfirmedRegistryCommunicationGroupIdInput> | Types.ConfirmedRegistryCommunicationGroupIdInput;
}>;

export type CancelConfirmedRegistryCommunicationGroupsMutation = {
  __typename?: 'Mutation';
  confirmedRegistryCommunication: {
    __typename?: 'ConfirmedRegistryCommunicationMutations';
    cancelRangeConfirmation: {
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

export const CancelConfirmedRegistryCommunicationGroupDocument = gql`
  mutation cancelConfirmedRegistryCommunicationGroup($groupId: ConfirmedRegistryCommunicationGroupIdInput!) {
    confirmedRegistryCommunication {
      cancelConfirmation(groupId: $groupId) {
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

export function useCancelConfirmedRegistryCommunicationGroupMutation() {
  return Urql.useMutation<
    CancelConfirmedRegistryCommunicationGroupMutation,
    CancelConfirmedRegistryCommunicationGroupMutationVariables
  >(CancelConfirmedRegistryCommunicationGroupDocument);
}
export const CancelConfirmedRegistryCommunicationGroupsDocument = gql`
  mutation cancelConfirmedRegistryCommunicationGroups($groupIds: [ConfirmedRegistryCommunicationGroupIdInput!]!) {
    confirmedRegistryCommunication {
      cancelRangeConfirmation(groupIds: $groupIds) {
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

export function useCancelConfirmedRegistryCommunicationGroupsMutation() {
  return Urql.useMutation<
    CancelConfirmedRegistryCommunicationGroupsMutation,
    CancelConfirmedRegistryCommunicationGroupsMutationVariables
  >(CancelConfirmedRegistryCommunicationGroupsDocument);
}
