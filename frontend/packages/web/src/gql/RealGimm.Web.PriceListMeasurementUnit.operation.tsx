// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { PriceListMeasurementUnitFragmentDoc } from './RealGimm.Web.PriceListMeasurementUnit.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';

export type GetPriceListMeasurementUnitsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.PriceListMeasurementUnitFilterInput>;
  order?: Types.InputMaybe<Array<Types.PriceListMeasurementUnitSortInput> | Types.PriceListMeasurementUnitSortInput>;
}>;

export type GetPriceListMeasurementUnitsQuery = {
  __typename?: 'Query';
  priceListMeasurementUnit: {
    __typename?: 'PriceListMeasurementUnitQueries';
    listPriceListMeasurementUnits?: {
      __typename?: 'ListPriceListMeasurementUnitsConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'PriceListMeasurementUnit';
        internalCode: string;
        name: string;
        ordering: number;
        id: number;
      }> | null;
    } | null;
  };
};

export type AddPriceListMeasurementUnitMutationVariables = Types.Exact<{
  input: Types.PriceListMeasurementUnitInput;
}>;

export type AddPriceListMeasurementUnitMutation = {
  __typename?: 'Mutation';
  priceListMeasurementUnit: {
    __typename?: 'PriceListMeasurementUnitMutations';
    add: {
      __typename?: 'ResultOfPriceListMeasurementUnit';
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

export type UpdatePriceListMeasurementUnitMutationVariables = Types.Exact<{
  priceListMeasurementUnitId: Types.Scalars['Int']['input'];
  input: Types.PriceListMeasurementUnitInput;
}>;

export type UpdatePriceListMeasurementUnitMutation = {
  __typename?: 'Mutation';
  priceListMeasurementUnit: {
    __typename?: 'PriceListMeasurementUnitMutations';
    update: {
      __typename?: 'ResultOfPriceListMeasurementUnit';
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

export type DeletePriceListMeasurementUnitsMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeletePriceListMeasurementUnitsMutation = {
  __typename?: 'Mutation';
  priceListMeasurementUnit: {
    __typename?: 'PriceListMeasurementUnitMutations';
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

export type GetPriceListMeasurementUnitInternalCodeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetPriceListMeasurementUnitInternalCodeQuery = {
  __typename?: 'Query';
  priceListMeasurementUnit: { __typename?: 'PriceListMeasurementUnitQueries'; proposeNewInternalCode?: string | null };
};

export type CanUsePriceListMeasurementUnitInternalCodeQueryVariables = Types.Exact<{
  internalCode: Types.Scalars['String']['input'];
  currentPriceListMeasurementUnitId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CanUsePriceListMeasurementUnitInternalCodeQuery = {
  __typename?: 'Query';
  priceListMeasurementUnit: { __typename?: 'PriceListMeasurementUnitQueries'; canUseInternalCode: boolean };
};

export type ExportPriceListMeasurementUnitsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.PriceListMeasurementUnitFilterInput>;
  order?: Types.InputMaybe<Array<Types.PriceListMeasurementUnitSortInput> | Types.PriceListMeasurementUnitSortInput>;
}>;

export type ExportPriceListMeasurementUnitsQuery = {
  __typename?: 'Query';
  priceListMeasurementUnit: {
    __typename?: 'PriceListMeasurementUnitQueries';
    exportToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string };
  };
};

export const GetPriceListMeasurementUnitsDocument = gql`
  query getPriceListMeasurementUnits(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: PriceListMeasurementUnitFilterInput
    $order: [PriceListMeasurementUnitSortInput!]
  ) {
    priceListMeasurementUnit {
      listPriceListMeasurementUnits(
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
          ...PriceListMeasurementUnitFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${PriceListMeasurementUnitFragmentDoc}
`;

export function useGetPriceListMeasurementUnitsQuery(
  options?: Omit<Urql.UseQueryArgs<GetPriceListMeasurementUnitsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetPriceListMeasurementUnitsQuery, GetPriceListMeasurementUnitsQueryVariables>({
    query: GetPriceListMeasurementUnitsDocument,
    ...options,
  });
}
export const AddPriceListMeasurementUnitDocument = gql`
  mutation addPriceListMeasurementUnit($input: PriceListMeasurementUnitInput!) {
    priceListMeasurementUnit {
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

export function useAddPriceListMeasurementUnitMutation() {
  return Urql.useMutation<AddPriceListMeasurementUnitMutation, AddPriceListMeasurementUnitMutationVariables>(
    AddPriceListMeasurementUnitDocument,
  );
}
export const UpdatePriceListMeasurementUnitDocument = gql`
  mutation updatePriceListMeasurementUnit($priceListMeasurementUnitId: Int!, $input: PriceListMeasurementUnitInput!) {
    priceListMeasurementUnit {
      update(id: $priceListMeasurementUnitId, input: $input) {
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

export function useUpdatePriceListMeasurementUnitMutation() {
  return Urql.useMutation<UpdatePriceListMeasurementUnitMutation, UpdatePriceListMeasurementUnitMutationVariables>(
    UpdatePriceListMeasurementUnitDocument,
  );
}
export const DeletePriceListMeasurementUnitsDocument = gql`
  mutation deletePriceListMeasurementUnits($ids: [Int!]!) {
    priceListMeasurementUnit {
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

export function useDeletePriceListMeasurementUnitsMutation() {
  return Urql.useMutation<DeletePriceListMeasurementUnitsMutation, DeletePriceListMeasurementUnitsMutationVariables>(
    DeletePriceListMeasurementUnitsDocument,
  );
}
export const GetPriceListMeasurementUnitInternalCodeDocument = gql`
  query getPriceListMeasurementUnitInternalCode {
    priceListMeasurementUnit {
      proposeNewInternalCode
    }
  }
`;

export function useGetPriceListMeasurementUnitInternalCodeQuery(
  options?: Omit<Urql.UseQueryArgs<GetPriceListMeasurementUnitInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<
    GetPriceListMeasurementUnitInternalCodeQuery,
    GetPriceListMeasurementUnitInternalCodeQueryVariables
  >({ query: GetPriceListMeasurementUnitInternalCodeDocument, ...options });
}
export const CanUsePriceListMeasurementUnitInternalCodeDocument = gql`
  query canUsePriceListMeasurementUnitInternalCode($internalCode: String!, $currentPriceListMeasurementUnitId: Int) {
    priceListMeasurementUnit {
      canUseInternalCode(
        internalCode: $internalCode
        currentPriceListMeasurementUnitId: $currentPriceListMeasurementUnitId
      )
    }
  }
`;

export function useCanUsePriceListMeasurementUnitInternalCodeQuery(
  options: Omit<Urql.UseQueryArgs<CanUsePriceListMeasurementUnitInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<
    CanUsePriceListMeasurementUnitInternalCodeQuery,
    CanUsePriceListMeasurementUnitInternalCodeQueryVariables
  >({ query: CanUsePriceListMeasurementUnitInternalCodeDocument, ...options });
}
export const ExportPriceListMeasurementUnitsDocument = gql`
  query exportPriceListMeasurementUnits(
    $where: PriceListMeasurementUnitFilterInput
    $order: [PriceListMeasurementUnitSortInput!]
  ) {
    priceListMeasurementUnit {
      exportToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportPriceListMeasurementUnitsQuery(
  options?: Omit<Urql.UseQueryArgs<ExportPriceListMeasurementUnitsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ExportPriceListMeasurementUnitsQuery, ExportPriceListMeasurementUnitsQueryVariables>({
    query: ExportPriceListMeasurementUnitsDocument,
    ...options,
  });
}
