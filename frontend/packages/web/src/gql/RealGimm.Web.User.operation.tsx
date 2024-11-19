// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';
import { WidgetSectionFragmentDoc } from './RealGimm.Web.WidgetSection.fragment';

export type GetMainDashboardQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetMainDashboardQuery = {
  __typename?: 'Query';
  user: {
    __typename?: 'UserQueries';
    me?: {
      __typename?: 'User';
      mainDashboard: Array<{
        __typename?: 'WidgetSection';
        id: number;
        title?: string | null;
        backgroundColor?: string | null;
        rows: Array<{
          __typename?: 'WidgetSectionRow';
          id: number;
          widgets: Array<{ __typename?: 'WidgetConfig'; id: number; type: string; width: number }>;
        }>;
      }>;
    } | null;
  };
};

export type UpdateMainDashboardMutationVariables = Types.Exact<{
  inputs: Array<Types.WidgetSectionInput> | Types.WidgetSectionInput;
}>;

export type UpdateMainDashboardMutation = {
  __typename?: 'Mutation';
  user: {
    __typename?: 'UserMutations';
    updateMainDashboardWidgets: {
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

export type GetFacilityDashboardQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetFacilityDashboardQuery = {
  __typename?: 'Query';
  user: {
    __typename?: 'UserQueries';
    me?: {
      __typename?: 'User';
      facilityDashboard: Array<{
        __typename?: 'WidgetSection';
        id: number;
        title?: string | null;
        backgroundColor?: string | null;
        rows: Array<{
          __typename?: 'WidgetSectionRow';
          id: number;
          widgets: Array<{ __typename?: 'WidgetConfig'; id: number; type: string; width: number }>;
        }>;
      }>;
    } | null;
  };
};

export type UpdateFacilityDashboardMutationVariables = Types.Exact<{
  inputs: Array<Types.WidgetSectionInput> | Types.WidgetSectionInput;
}>;

export type UpdateFacilityDashboardMutation = {
  __typename?: 'Mutation';
  user: {
    __typename?: 'UserMutations';
    updateFacilityDashboardWidgets: {
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

export const GetMainDashboardDocument = gql`
  query getMainDashboard {
    user {
      me {
        mainDashboard {
          ...WidgetSectionFragment
        }
      }
    }
  }
  ${WidgetSectionFragmentDoc}
`;

export function useGetMainDashboardQuery(options?: Omit<Urql.UseQueryArgs<GetMainDashboardQueryVariables>, 'query'>) {
  return Urql.useQuery<GetMainDashboardQuery, GetMainDashboardQueryVariables>({
    query: GetMainDashboardDocument,
    ...options,
  });
}
export const UpdateMainDashboardDocument = gql`
  mutation updateMainDashboard($inputs: [WidgetSectionInput!]!) {
    user {
      updateMainDashboardWidgets(inputs: $inputs) {
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

export function useUpdateMainDashboardMutation() {
  return Urql.useMutation<UpdateMainDashboardMutation, UpdateMainDashboardMutationVariables>(
    UpdateMainDashboardDocument,
  );
}
export const GetFacilityDashboardDocument = gql`
  query getFacilityDashboard {
    user {
      me {
        facilityDashboard {
          ...WidgetSectionFragment
        }
      }
    }
  }
  ${WidgetSectionFragmentDoc}
`;

export function useGetFacilityDashboardQuery(
  options?: Omit<Urql.UseQueryArgs<GetFacilityDashboardQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetFacilityDashboardQuery, GetFacilityDashboardQueryVariables>({
    query: GetFacilityDashboardDocument,
    ...options,
  });
}
export const UpdateFacilityDashboardDocument = gql`
  mutation updateFacilityDashboard($inputs: [WidgetSectionInput!]!) {
    user {
      updateFacilityDashboardWidgets(inputs: $inputs) {
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

export function useUpdateFacilityDashboardMutation() {
  return Urql.useMutation<UpdateFacilityDashboardMutation, UpdateFacilityDashboardMutationVariables>(
    UpdateFacilityDashboardDocument,
  );
}
