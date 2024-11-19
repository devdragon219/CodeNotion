// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { FloorTemplateFragmentDoc } from './RealGimm.Web.FloorTemplate.fragment';
import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';

export type AddFloorTemplatesMutationVariables = Types.Exact<{
  input: Array<Types.FloorTemplateInput> | Types.FloorTemplateInput;
}>;

export type AddFloorTemplatesMutation = {
  __typename?: 'Mutation';
  floorTemplate: {
    __typename?: 'FloorTemplateMutations';
    addFloorTemplates: {
      __typename?: 'ResultOfListOfFloorTemplate';
      errors?: Array<string | null> | null;
      isSuccess: boolean;
      validationErrors?: Array<{
        __typename?: 'ValidationError';
        identifier?: string | null;
        errorMessage?: string | null;
        errorCode?: string | null;
        severity: Types.ValidationSeverity;
      } | null> | null;
      value?: Array<{
        __typename?: 'FloorTemplate';
        id: number;
        guid: string;
        name: string;
        position: number;
      } | null> | null;
    };
  };
};

export type UpdateFloorTemplateMutationVariables = Types.Exact<{
  floorTemplateId: Types.Scalars['Int']['input'];
  input: Types.FloorTemplateInput;
}>;

export type UpdateFloorTemplateMutation = {
  __typename?: 'Mutation';
  floorTemplate: {
    __typename?: 'FloorTemplateMutations';
    updateFloor: {
      __typename?: 'ResultOfFloorTemplate';
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

export type DeleteFloorTemplatesMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeleteFloorTemplatesMutation = {
  __typename?: 'Mutation';
  floorTemplate: {
    __typename?: 'FloorTemplateMutations';
    deleteRangeFloor: {
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

export type GetAllFloorTemplatesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.FloorFilterInput>;
  order?: Types.InputMaybe<Array<Types.FloorTemplateSortInput> | Types.FloorTemplateSortInput>;
}>;

export type GetAllFloorTemplatesQuery = {
  __typename?: 'Query';
  floorTemplate: {
    __typename?: 'FloorTemplateQueries';
    listFloorTemplates: Array<{
      __typename?: 'FloorTemplate';
      id: number;
      guid: string;
      name: string;
      position: number;
    }>;
  };
};

export type GetFloorTemplatesQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.FloorTemplateFilterInput>;
  order?: Types.InputMaybe<Array<Types.FloorTemplateSortInput> | Types.FloorTemplateSortInput>;
}>;

export type GetFloorTemplatesQuery = {
  __typename?: 'Query';
  floorTemplate: {
    __typename?: 'FloorTemplateQueries';
    listFloorTemplatesPaginated?: {
      __typename?: 'ListFloorTemplatesPaginatedConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{ __typename?: 'FloorTemplate'; id: number; guid: string; name: string; position: number }> | null;
    } | null;
  };
};

export const AddFloorTemplatesDocument = gql`
  mutation addFloorTemplates($input: [FloorTemplateInput!]!) {
    floorTemplate {
      addFloorTemplates(input: $input) {
        errors
        isSuccess
        validationErrors {
          ...ValidationErrorFragment
        }
        value {
          ...FloorTemplateFragment
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
  ${FloorTemplateFragmentDoc}
`;

export function useAddFloorTemplatesMutation() {
  return Urql.useMutation<AddFloorTemplatesMutation, AddFloorTemplatesMutationVariables>(AddFloorTemplatesDocument);
}
export const UpdateFloorTemplateDocument = gql`
  mutation updateFloorTemplate($floorTemplateId: Int!, $input: FloorTemplateInput!) {
    floorTemplate {
      updateFloor(floorTemplateId: $floorTemplateId, input: $input) {
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

export function useUpdateFloorTemplateMutation() {
  return Urql.useMutation<UpdateFloorTemplateMutation, UpdateFloorTemplateMutationVariables>(
    UpdateFloorTemplateDocument,
  );
}
export const DeleteFloorTemplatesDocument = gql`
  mutation deleteFloorTemplates($ids: [Int!]!) {
    floorTemplate {
      deleteRangeFloor(floorIds: $ids) {
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

export function useDeleteFloorTemplatesMutation() {
  return Urql.useMutation<DeleteFloorTemplatesMutation, DeleteFloorTemplatesMutationVariables>(
    DeleteFloorTemplatesDocument,
  );
}
export const GetAllFloorTemplatesDocument = gql`
  query getAllFloorTemplates($where: FloorFilterInput, $order: [FloorTemplateSortInput!]) {
    floorTemplate {
      listFloorTemplates(where: $where, order: $order) {
        ...FloorTemplateFragment
      }
    }
  }
  ${FloorTemplateFragmentDoc}
`;

export function useGetAllFloorTemplatesQuery(
  options?: Omit<Urql.UseQueryArgs<GetAllFloorTemplatesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetAllFloorTemplatesQuery, GetAllFloorTemplatesQueryVariables>({
    query: GetAllFloorTemplatesDocument,
    ...options,
  });
}
export const GetFloorTemplatesDocument = gql`
  query getFloorTemplates(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: FloorTemplateFilterInput
    $order: [FloorTemplateSortInput!]
  ) {
    floorTemplate {
      listFloorTemplatesPaginated(
        first: $first
        after: $after
        last: $last
        before: $before
        where: $where
        order: $order
      ) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...FloorTemplateFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${FloorTemplateFragmentDoc}
`;

export function useGetFloorTemplatesQuery(options?: Omit<Urql.UseQueryArgs<GetFloorTemplatesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetFloorTemplatesQuery, GetFloorTemplatesQueryVariables>({
    query: GetFloorTemplatesDocument,
    ...options,
  });
}
