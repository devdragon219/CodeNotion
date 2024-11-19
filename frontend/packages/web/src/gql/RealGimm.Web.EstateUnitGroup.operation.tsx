// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { AsstAddressFragmentDoc } from './RealGimm.Web.AsstAddress.fragment';
import { CadastralCoordinatesFragmentDoc } from './RealGimm.Web.CadastralCoordinates.fragment';
import { CityFragmentDoc } from './RealGimm.Web.City.fragment';
import { EstateUnitDetailFragmentDoc, EstateUnitFragmentDoc } from './RealGimm.Web.EstateUnit.fragment';
import { EstateUnitGroupFragmentDoc } from './RealGimm.Web.EstateUnitGroup.fragment';
import { FloorFragmentDoc } from './RealGimm.Web.Floor.fragment';
import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { StairFragmentDoc } from './RealGimm.Web.Stair.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';

export type GetEstateUnitGroupsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.EstateUnitGroupFilterInput>;
  order?: Types.InputMaybe<Array<Types.EstateUnitGroupSortInput> | Types.EstateUnitGroupSortInput>;
}>;

export type GetEstateUnitGroupsQuery = {
  __typename?: 'Query';
  estateUnitGroup: {
    __typename?: 'EstateUnitGroupQueries';
    listEstateUnitGroups?: {
      __typename?: 'ListEstateUnitGroupsConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'EstateUnitGroup';
        name: string;
        internalCode: string;
        id: number;
        managementSubject:
          | { __typename?: 'LegalSubject'; id: number; name: string }
          | { __typename?: 'ManagementSubject'; id: number; name: string }
          | { __typename?: 'PhysicalSubject'; id: number; name: string };
        estateUnits: Array<{
          __typename?: 'EstateUnit';
          id: number;
          internalCode: string;
          type: Types.EstateUnitType;
          subNumbering?: string | null;
          externalCode?: string | null;
          name?: string | null;
          netSurface?: number | null;
          grossSurface?: number | null;
          ownershipStartDate: string;
          status: Types.EstateUnitStatus;
          sharedArea: boolean;
          disusedDate?: string | null;
          ownershipType: Types.EstateUnitOwnershipType;
          ownershipEndDate?: string | null;
          ownershipPercent?: number | null;
          notes?: string | null;
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
          stair?: { __typename?: 'Stair'; id: number; description: string } | null;
          floors: Array<{
            __typename?: 'Floor';
            id: number;
            name: string;
            position: number;
            templateReference: string;
          }>;
          estate: {
            __typename?: 'Estate';
            id: number;
            internalCode: string;
            name?: string | null;
            type: Types.EstateType;
            managementSubject:
              | { __typename?: 'LegalSubject'; name: string; id: number }
              | { __typename?: 'ManagementSubject'; name: string; id: number }
              | { __typename?: 'PhysicalSubject'; name: string; id: number };
          };
          currentCadastralUnit?: {
            __typename?: 'CadastralUnit';
            id: number;
            since?: string | null;
            isCadastralRegistrationInProgress: boolean;
            isAncillaryUnit: boolean;
            coordinates: Array<{
              __typename?: 'CadastralCoordinates';
              coordinateType: Types.CoordinateType;
              unmanagedOverride?: string | null;
              level1?: string | null;
              level2?: string | null;
              level3?: string | null;
              level4?: string | null;
              level5?: string | null;
              itTavPartita?: string | null;
              itTavCorpo?: string | null;
              itTavPorzione?: string | null;
              hasITTavData: boolean;
              notes?: string | null;
              id: number;
            }>;
          } | null;
          usageType: { __typename?: 'EstateUsageType'; id: number; name: string };
        }>;
      }> | null;
    } | null;
  };
};

export type AddEstateUnitGroupMutationVariables = Types.Exact<{
  input: Types.EstateUnitGroupInput;
}>;

export type AddEstateUnitGroupMutation = {
  __typename?: 'Mutation';
  estateUnitGroup: {
    __typename?: 'EstateUnitGroupMutations';
    add: {
      __typename?: 'ResultOfEstateUnitGroup';
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

export type UpdateEstateUnitGroupMutationVariables = Types.Exact<{
  estateUnitGroupId: Types.Scalars['Int']['input'];
  input: Types.EstateUnitGroupInput;
}>;

export type UpdateEstateUnitGroupMutation = {
  __typename?: 'Mutation';
  estateUnitGroup: {
    __typename?: 'EstateUnitGroupMutations';
    update: {
      __typename?: 'ResultOfEstateUnitGroup';
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

export type DeleteEstateUnitGroupsMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeleteEstateUnitGroupsMutation = {
  __typename?: 'Mutation';
  estateUnitGroup: {
    __typename?: 'EstateUnitGroupMutations';
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

export type GetEstateUnitGroupInternalCodeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetEstateUnitGroupInternalCodeQuery = {
  __typename?: 'Query';
  estateUnitGroup: { __typename?: 'EstateUnitGroupQueries'; proposeNewInternalCode?: string | null };
};

export type CanUseEstateUnitGroupInternalCodeQueryVariables = Types.Exact<{
  internalCode: Types.Scalars['String']['input'];
  currentEstateUnitGroupId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CanUseEstateUnitGroupInternalCodeQuery = {
  __typename?: 'Query';
  estateUnitGroup: { __typename?: 'EstateUnitGroupQueries'; canUseInternalCode: boolean };
};

export type ExportEstateUnitGroupsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.EstateUnitGroupFilterInput>;
  order?: Types.InputMaybe<Array<Types.EstateUnitGroupSortInput> | Types.EstateUnitGroupSortInput>;
}>;

export type ExportEstateUnitGroupsQuery = {
  __typename?: 'Query';
  estateUnitGroup: {
    __typename?: 'EstateUnitGroupQueries';
    exportToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string };
  };
};

export type GetEstateUnitGroupQueryVariables = Types.Exact<{
  estateUnitGroupId: Types.Scalars['Int']['input'];
}>;

export type GetEstateUnitGroupQuery = {
  __typename?: 'Query';
  estateUnitGroup: {
    __typename?: 'EstateUnitGroupQueries';
    get?: {
      __typename?: 'EstateUnitGroup';
      name: string;
      internalCode: string;
      id: number;
      managementSubject:
        | { __typename?: 'LegalSubject'; id: number; name: string }
        | { __typename?: 'ManagementSubject'; id: number; name: string }
        | { __typename?: 'PhysicalSubject'; id: number; name: string };
      estateUnits: Array<{
        __typename?: 'EstateUnit';
        id: number;
        internalCode: string;
        type: Types.EstateUnitType;
        subNumbering?: string | null;
        externalCode?: string | null;
        name?: string | null;
        netSurface?: number | null;
        grossSurface?: number | null;
        ownershipStartDate: string;
        status: Types.EstateUnitStatus;
        sharedArea: boolean;
        disusedDate?: string | null;
        ownershipType: Types.EstateUnitOwnershipType;
        ownershipEndDate?: string | null;
        ownershipPercent?: number | null;
        notes?: string | null;
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
        stair?: { __typename?: 'Stair'; id: number; description: string } | null;
        floors: Array<{ __typename?: 'Floor'; id: number; name: string; position: number; templateReference: string }>;
        estate: {
          __typename?: 'Estate';
          id: number;
          internalCode: string;
          name?: string | null;
          type: Types.EstateType;
          managementSubject:
            | { __typename?: 'LegalSubject'; name: string; id: number }
            | { __typename?: 'ManagementSubject'; name: string; id: number }
            | { __typename?: 'PhysicalSubject'; name: string; id: number };
        };
        currentCadastralUnit?: {
          __typename?: 'CadastralUnit';
          id: number;
          since?: string | null;
          isCadastralRegistrationInProgress: boolean;
          isAncillaryUnit: boolean;
          coordinates: Array<{
            __typename?: 'CadastralCoordinates';
            coordinateType: Types.CoordinateType;
            unmanagedOverride?: string | null;
            level1?: string | null;
            level2?: string | null;
            level3?: string | null;
            level4?: string | null;
            level5?: string | null;
            itTavPartita?: string | null;
            itTavCorpo?: string | null;
            itTavPorzione?: string | null;
            hasITTavData: boolean;
            notes?: string | null;
            id: number;
          }>;
        } | null;
        usageType: { __typename?: 'EstateUsageType'; id: number; name: string };
      }>;
    } | null;
  };
};

export type DeleteEstateUnitGroupMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;

export type DeleteEstateUnitGroupMutation = {
  __typename?: 'Mutation';
  estateUnitGroup: {
    __typename?: 'EstateUnitGroupMutations';
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

export const GetEstateUnitGroupsDocument = gql`
  query getEstateUnitGroups(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: EstateUnitGroupFilterInput
    $order: [EstateUnitGroupSortInput!]
  ) {
    estateUnitGroup {
      listEstateUnitGroups(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...EstateUnitGroupFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${EstateUnitGroupFragmentDoc}
  ${EstateUnitFragmentDoc}
  ${AsstAddressFragmentDoc}
  ${CityFragmentDoc}
  ${StairFragmentDoc}
  ${FloorFragmentDoc}
  ${CadastralCoordinatesFragmentDoc}
`;

export function useGetEstateUnitGroupsQuery(
  options?: Omit<Urql.UseQueryArgs<GetEstateUnitGroupsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetEstateUnitGroupsQuery, GetEstateUnitGroupsQueryVariables>({
    query: GetEstateUnitGroupsDocument,
    ...options,
  });
}
export const AddEstateUnitGroupDocument = gql`
  mutation addEstateUnitGroup($input: EstateUnitGroupInput!) {
    estateUnitGroup {
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

export function useAddEstateUnitGroupMutation() {
  return Urql.useMutation<AddEstateUnitGroupMutation, AddEstateUnitGroupMutationVariables>(AddEstateUnitGroupDocument);
}
export const UpdateEstateUnitGroupDocument = gql`
  mutation updateEstateUnitGroup($estateUnitGroupId: Int!, $input: EstateUnitGroupInput!) {
    estateUnitGroup {
      update(id: $estateUnitGroupId, input: $input) {
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

export function useUpdateEstateUnitGroupMutation() {
  return Urql.useMutation<UpdateEstateUnitGroupMutation, UpdateEstateUnitGroupMutationVariables>(
    UpdateEstateUnitGroupDocument,
  );
}
export const DeleteEstateUnitGroupsDocument = gql`
  mutation deleteEstateUnitGroups($ids: [Int!]!) {
    estateUnitGroup {
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

export function useDeleteEstateUnitGroupsMutation() {
  return Urql.useMutation<DeleteEstateUnitGroupsMutation, DeleteEstateUnitGroupsMutationVariables>(
    DeleteEstateUnitGroupsDocument,
  );
}
export const GetEstateUnitGroupInternalCodeDocument = gql`
  query getEstateUnitGroupInternalCode {
    estateUnitGroup {
      proposeNewInternalCode
    }
  }
`;

export function useGetEstateUnitGroupInternalCodeQuery(
  options?: Omit<Urql.UseQueryArgs<GetEstateUnitGroupInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetEstateUnitGroupInternalCodeQuery, GetEstateUnitGroupInternalCodeQueryVariables>({
    query: GetEstateUnitGroupInternalCodeDocument,
    ...options,
  });
}
export const CanUseEstateUnitGroupInternalCodeDocument = gql`
  query canUseEstateUnitGroupInternalCode($internalCode: String!, $currentEstateUnitGroupId: Int) {
    estateUnitGroup {
      canUseInternalCode(internalCode: $internalCode, currentEstateUnitGroupId: $currentEstateUnitGroupId)
    }
  }
`;

export function useCanUseEstateUnitGroupInternalCodeQuery(
  options: Omit<Urql.UseQueryArgs<CanUseEstateUnitGroupInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<CanUseEstateUnitGroupInternalCodeQuery, CanUseEstateUnitGroupInternalCodeQueryVariables>({
    query: CanUseEstateUnitGroupInternalCodeDocument,
    ...options,
  });
}
export const ExportEstateUnitGroupsDocument = gql`
  query exportEstateUnitGroups($where: EstateUnitGroupFilterInput, $order: [EstateUnitGroupSortInput!]) {
    estateUnitGroup {
      exportToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportEstateUnitGroupsQuery(
  options?: Omit<Urql.UseQueryArgs<ExportEstateUnitGroupsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ExportEstateUnitGroupsQuery, ExportEstateUnitGroupsQueryVariables>({
    query: ExportEstateUnitGroupsDocument,
    ...options,
  });
}
export const GetEstateUnitGroupDocument = gql`
  query getEstateUnitGroup($estateUnitGroupId: Int!) {
    estateUnitGroup {
      get(id: $estateUnitGroupId) {
        ...EstateUnitGroupFragment
      }
    }
  }
  ${EstateUnitGroupFragmentDoc}
  ${EstateUnitFragmentDoc}
  ${AsstAddressFragmentDoc}
  ${CityFragmentDoc}
  ${StairFragmentDoc}
  ${FloorFragmentDoc}
  ${CadastralCoordinatesFragmentDoc}
`;

export function useGetEstateUnitGroupQuery(
  options: Omit<Urql.UseQueryArgs<GetEstateUnitGroupQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetEstateUnitGroupQuery, GetEstateUnitGroupQueryVariables>({
    query: GetEstateUnitGroupDocument,
    ...options,
  });
}
export const DeleteEstateUnitGroupDocument = gql`
  mutation deleteEstateUnitGroup($id: Int!) {
    estateUnitGroup {
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

export function useDeleteEstateUnitGroupMutation() {
  return Urql.useMutation<DeleteEstateUnitGroupMutation, DeleteEstateUnitGroupMutationVariables>(
    DeleteEstateUnitGroupDocument,
  );
}
