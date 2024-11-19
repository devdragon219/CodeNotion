// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { ConfigFragmentDoc } from './RealGimm.Web.Config.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';

export type GetConfigsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ConfigFilterInput>;
  order?: Types.InputMaybe<Array<Types.ConfigSortInput> | Types.ConfigSortInput>;
}>;

export type GetConfigsQuery = {
  __typename?: 'Query';
  admin: {
    __typename?: 'AdminQueries';
    listConfigs: Array<{
      __typename?: 'Config';
      id: number;
      function: Types.ConfigFunction;
      name: string;
      value?: string | null;
      lastUpdated: string;
    }>;
  };
};

export type UpdateConfigMutationVariables = Types.Exact<{
  function: Types.ConfigFunction;
  name: Types.Scalars['String']['input'];
  value?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;

export type UpdateConfigMutation = {
  __typename?: 'Mutation';
  admin: {
    __typename?: 'AdminMutations';
    updateConfig: {
      __typename?: 'ResultOfConfig';
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
        __typename?: 'Config';
        id: number;
        function: Types.ConfigFunction;
        name: string;
        value?: string | null;
        lastUpdated: string;
      } | null;
    };
  };
};

export const GetConfigsDocument = gql`
  query getConfigs($where: ConfigFilterInput, $order: [ConfigSortInput!]) {
    admin {
      listConfigs(where: $where, order: $order) {
        ...ConfigFragment
      }
    }
  }
  ${ConfigFragmentDoc}
`;

export function useGetConfigsQuery(options?: Omit<Urql.UseQueryArgs<GetConfigsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetConfigsQuery, GetConfigsQueryVariables>({ query: GetConfigsDocument, ...options });
}
export const UpdateConfigDocument = gql`
  mutation updateConfig($function: ConfigFunction!, $name: String!, $value: String) {
    admin {
      updateConfig(function: $function, name: $name, value: $value) {
        errors
        isSuccess
        validationErrors {
          ...ValidationErrorFragment
        }
        value {
          ...ConfigFragment
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
  ${ConfigFragmentDoc}
`;

export function useUpdateConfigMutation() {
  return Urql.useMutation<UpdateConfigMutation, UpdateConfigMutationVariables>(UpdateConfigDocument);
}
