// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { AsstAddressFragmentDoc } from './RealGimm.Web.AsstAddress.fragment';
import { CityFragmentDoc } from './RealGimm.Web.City.fragment';
import { EstateSubUnitFragmentDoc } from './RealGimm.Web.EstateSubUnit.fragment';
import { UsageTypeFragmentDoc } from './RealGimm.Web.EstateUsageType.fragment';
import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';

export type GetEstateSubUnitsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.EstateSubUnitFilterInput>;
  order?: Types.InputMaybe<Array<Types.EstateSubUnitSortInput> | Types.EstateSubUnitSortInput>;
}>;

export type GetEstateSubUnitsQuery = {
  __typename?: 'Query';
  estateSubUnit: {
    __typename?: 'EstateSubUnitQueries';
    listEstateSubUnit?: {
      __typename?: 'ListEstateSubUnitConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'EstateSubUnit';
        internalCode: string;
        occupantType?: Types.OccupantType | null;
        occupancyPercent?: number | null;
        notes?: string | null;
        since?: string | null;
        until?: string | null;
        surfaceSqM?: number | null;
        id: number;
        occupantSubject?:
          | { __typename?: 'LegalSubject'; name: string; id: number }
          | { __typename?: 'ManagementSubject'; name: string; id: number }
          | { __typename?: 'PhysicalSubject'; name: string; id: number }
          | null;
        orgUnit?: { __typename?: 'OrgUnit'; id: number; name?: string | null } | null;
        usageType?: {
          __typename?: 'EstateUsageType';
          id: number;
          name: string;
          internalCode: string;
          ordering: number;
          isForEstate: boolean;
          isForEstateUnit: boolean;
          isForEstateSubUnit: boolean;
          isForContracts: boolean;
        } | null;
        estateUnit: {
          __typename?: 'EstateUnit';
          id: number;
          name?: string | null;
          type: Types.EstateUnitType;
          address: {
            __typename?: 'AsstAddress';
            id: number;
            addressType: Types.AsstAddressType;
            cityName?: string | null;
            countryISO?: string | null;
            countyName?: string | null;
            localPostCode?: string | null;
            notes?: string | null;
            numbering?: string | null;
            toponymy?: string | null;
            city?: {
              __typename?: 'City';
              guid: string;
              id: number;
              name: string;
              countyName?: string | null;
              countryName?: string | null;
              countryISO: string;
              cadastralCode?: string | null;
            } | null;
            locationLatLon?: { __typename?: 'GeoJSONPointType'; coordinates?: Array<number> | null } | null;
          };
          currentCadastralUnit?: {
            __typename?: 'CadastralUnit';
            id: number;
            isAncillaryUnit: boolean;
            isCadastralRegistrationInProgress: boolean;
          } | null;
        };
      }> | null;
    } | null;
  };
};

export type DeleteEstateSubUnitsMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeleteEstateSubUnitsMutation = {
  __typename?: 'Mutation';
  estateSubUnit: {
    __typename?: 'EstateSubUnitMutations';
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

export type GetEstateSubUnitInternalCodeQueryVariables = Types.Exact<{
  estateUnitId: Types.Scalars['Int']['input'];
}>;

export type GetEstateSubUnitInternalCodeQuery = {
  __typename?: 'Query';
  estateSubUnit: { __typename?: 'EstateSubUnitQueries'; proposeNewInternalCode?: string | null };
};

export type CreateEstateSubUnitMutationVariables = Types.Exact<{
  estateSubUnitInput: Types.EstateSubUnitInput;
}>;

export type CreateEstateSubUnitMutation = {
  __typename?: 'Mutation';
  estateSubUnit: {
    __typename?: 'EstateSubUnitMutations';
    add: {
      __typename?: 'ResultOfEstateSubUnit';
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

export type UpdateEstateSubUnitMutationVariables = Types.Exact<{
  estateSubUnitInput: Types.EstateSubUnitInput;
}>;

export type UpdateEstateSubUnitMutation = {
  __typename?: 'Mutation';
  estateSubUnit: {
    __typename?: 'EstateSubUnitMutations';
    update: {
      __typename?: 'ResultOfEstateSubUnit';
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

export type GetAllEstateSubUnitsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.EstateSubUnitFilterInput>;
  order?: Types.InputMaybe<Array<Types.EstateSubUnitSortInput> | Types.EstateSubUnitSortInput>;
}>;

export type GetAllEstateSubUnitsQuery = {
  __typename?: 'Query';
  estateSubUnit: {
    __typename?: 'EstateSubUnitQueries';
    listEstateSubUnitsFull: Array<{
      __typename?: 'EstateSubUnit';
      internalCode: string;
      occupantType?: Types.OccupantType | null;
      occupancyPercent?: number | null;
      notes?: string | null;
      since?: string | null;
      until?: string | null;
      surfaceSqM?: number | null;
      id: number;
      occupantSubject?:
        | { __typename?: 'LegalSubject'; name: string; id: number }
        | { __typename?: 'ManagementSubject'; name: string; id: number }
        | { __typename?: 'PhysicalSubject'; name: string; id: number }
        | null;
      orgUnit?: { __typename?: 'OrgUnit'; id: number; name?: string | null } | null;
      usageType?: {
        __typename?: 'EstateUsageType';
        id: number;
        name: string;
        internalCode: string;
        ordering: number;
        isForEstate: boolean;
        isForEstateUnit: boolean;
        isForEstateSubUnit: boolean;
        isForContracts: boolean;
      } | null;
      estateUnit: {
        __typename?: 'EstateUnit';
        id: number;
        name?: string | null;
        type: Types.EstateUnitType;
        address: {
          __typename?: 'AsstAddress';
          id: number;
          addressType: Types.AsstAddressType;
          cityName?: string | null;
          countryISO?: string | null;
          countyName?: string | null;
          localPostCode?: string | null;
          notes?: string | null;
          numbering?: string | null;
          toponymy?: string | null;
          city?: {
            __typename?: 'City';
            guid: string;
            id: number;
            name: string;
            countyName?: string | null;
            countryName?: string | null;
            countryISO: string;
            cadastralCode?: string | null;
          } | null;
          locationLatLon?: { __typename?: 'GeoJSONPointType'; coordinates?: Array<number> | null } | null;
        };
        currentCadastralUnit?: {
          __typename?: 'CadastralUnit';
          id: number;
          isAncillaryUnit: boolean;
          isCadastralRegistrationInProgress: boolean;
        } | null;
      };
    }>;
  };
};

export const GetEstateSubUnitsDocument = gql`
  query getEstateSubUnits(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: EstateSubUnitFilterInput
    $order: [EstateSubUnitSortInput!]
  ) {
    estateSubUnit {
      listEstateSubUnit(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...EstateSubUnitFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${EstateSubUnitFragmentDoc}
  ${UsageTypeFragmentDoc}
  ${AsstAddressFragmentDoc}
  ${CityFragmentDoc}
`;

export function useGetEstateSubUnitsQuery(options?: Omit<Urql.UseQueryArgs<GetEstateSubUnitsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetEstateSubUnitsQuery, GetEstateSubUnitsQueryVariables>({
    query: GetEstateSubUnitsDocument,
    ...options,
  });
}
export const DeleteEstateSubUnitsDocument = gql`
  mutation deleteEstateSubUnits($ids: [Int!]!) {
    estateSubUnit {
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

export function useDeleteEstateSubUnitsMutation() {
  return Urql.useMutation<DeleteEstateSubUnitsMutation, DeleteEstateSubUnitsMutationVariables>(
    DeleteEstateSubUnitsDocument,
  );
}
export const GetEstateSubUnitInternalCodeDocument = gql`
  query getEstateSubUnitInternalCode($estateUnitId: Int!) {
    estateSubUnit {
      proposeNewInternalCode(parentUnitEstateId: $estateUnitId)
    }
  }
`;

export function useGetEstateSubUnitInternalCodeQuery(
  options: Omit<Urql.UseQueryArgs<GetEstateSubUnitInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetEstateSubUnitInternalCodeQuery, GetEstateSubUnitInternalCodeQueryVariables>({
    query: GetEstateSubUnitInternalCodeDocument,
    ...options,
  });
}
export const CreateEstateSubUnitDocument = gql`
  mutation createEstateSubUnit($estateSubUnitInput: EstateSubUnitInput!) {
    estateSubUnit {
      add(subInput: $estateSubUnitInput) {
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

export function useCreateEstateSubUnitMutation() {
  return Urql.useMutation<CreateEstateSubUnitMutation, CreateEstateSubUnitMutationVariables>(
    CreateEstateSubUnitDocument,
  );
}
export const UpdateEstateSubUnitDocument = gql`
  mutation updateEstateSubUnit($estateSubUnitInput: EstateSubUnitInput!) {
    estateSubUnit {
      update(subInput: $estateSubUnitInput) {
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

export function useUpdateEstateSubUnitMutation() {
  return Urql.useMutation<UpdateEstateSubUnitMutation, UpdateEstateSubUnitMutationVariables>(
    UpdateEstateSubUnitDocument,
  );
}
export const GetAllEstateSubUnitsDocument = gql`
  query getAllEstateSubUnits($where: EstateSubUnitFilterInput, $order: [EstateSubUnitSortInput!]) {
    estateSubUnit {
      listEstateSubUnitsFull(where: $where, order: $order) {
        ...EstateSubUnitFragment
      }
    }
  }
  ${EstateSubUnitFragmentDoc}
  ${UsageTypeFragmentDoc}
  ${AsstAddressFragmentDoc}
  ${CityFragmentDoc}
`;

export function useGetAllEstateSubUnitsQuery(
  options?: Omit<Urql.UseQueryArgs<GetAllEstateSubUnitsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetAllEstateSubUnitsQuery, GetAllEstateSubUnitsQueryVariables>({
    query: GetAllEstateSubUnitsDocument,
    ...options,
  });
}
