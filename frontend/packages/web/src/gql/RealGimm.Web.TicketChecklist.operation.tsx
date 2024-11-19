// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { AsstAddressFragmentDoc } from './RealGimm.Web.AsstAddress.fragment';
import { CadastralCoordinatesFragmentDoc } from './RealGimm.Web.CadastralCoordinates.fragment';
import { CatalogueCategoryFragmentDoc } from './RealGimm.Web.CatalogueCategory.fragment';
import { CatalogueSubCategoryFragmentDoc } from './RealGimm.Web.CatalogueSubCategory.fragment';
import {
  CatalogueCategoryCatalogueTypeDetailFragmentDoc,
  CatalogueTypeDetailFragmentDoc,
  FacilityCatalogueTypeFragmentDoc,
} from './RealGimm.Web.CatalogueType.fragment';
import { CatalogueTypeActivityFragmentDoc } from './RealGimm.Web.CatalogueTypeActivity.fragment';
import { CatalogueTypeFieldFragmentDoc } from './RealGimm.Web.CatalogueTypeField.fragment';
import { CityFragmentDoc } from './RealGimm.Web.City.fragment';
import { CraftFragmentDoc } from './RealGimm.Web.Craft.fragment';
import { EstateUnitDetailFragmentDoc, EstateUnitFragmentDoc } from './RealGimm.Web.EstateUnit.fragment';
import { UsageTypeFragmentDoc } from './RealGimm.Web.EstateUsageType.fragment';
import {
  FacilityContractDetailFragmentDoc,
  FacilityContractFragmentDoc,
} from './RealGimm.Web.FacilityContract.fragment';
import { FloorFragmentDoc } from './RealGimm.Web.Floor.fragment';
import { InterventionTypeFragmentDoc } from './RealGimm.Web.InterventionType.fragment';
import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { PriceListDetailFragmentDoc } from './RealGimm.Web.PriceList.fragment';
import { StairFragmentDoc } from './RealGimm.Web.Stair.fragment';
import { TicketChecklistDetailFragmentDoc, TicketChecklistFragmentDoc } from './RealGimm.Web.TicketChecklist.fragment';
import { TicketChecklistsPerEstateUnitFragmentDoc } from './RealGimm.Web.TicketChecklistsPerEstateUnit.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';

export type GetTicketChecklistsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.TicketChecklistFilterInput>;
  order?: Types.InputMaybe<Array<Types.TicketChecklistSortInput> | Types.TicketChecklistSortInput>;
}>;

export type GetTicketChecklistsQuery = {
  __typename?: 'Query';
  ticketChecklist: {
    __typename?: 'TicketChecklistQueries';
    listTicketChecklists?: {
      __typename?: 'ListTicketChecklistsConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'TicketChecklist';
        internalCode: string;
        name: string;
        type: Types.TicketChecklistTemplateType;
        costBaseFactor: Types.CostBaseFactor;
        rawWorkCost: number;
        safetyCost: number;
        id: number;
        catalogueType: {
          __typename?: 'CatalogueType';
          id: number;
          category: { __typename?: 'CatalogueCategory'; id: number; name: string };
          subCategory?: { __typename?: 'CatalogueSubCategory'; id: number; name: string } | null;
        };
        estateUnit: {
          __typename?: 'EstateUnit';
          id: number;
          internalCode: string;
          grossSurface?: number | null;
          netSurface?: number | null;
        };
      }> | null;
    } | null;
  };
};

export type AddTicketChecklistsMutationVariables = Types.Exact<{
  facilityContractId: Types.Scalars['Int']['input'];
  inputs: Array<Types.TicketChecklistTemplatesPerEstateUnitInput> | Types.TicketChecklistTemplatesPerEstateUnitInput;
}>;

export type AddTicketChecklistsMutation = {
  __typename?: 'Mutation';
  ticketChecklist: {
    __typename?: 'TicketChecklistMutations';
    addRange: {
      __typename?: 'ResultOfIEnumerableOfTicketChecklist';
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

export type UpdateTicketChecklistMutationVariables = Types.Exact<{
  ticketChecklistId: Types.Scalars['Int']['input'];
  input: Types.UpdateTicketChecklistInput;
}>;

export type UpdateTicketChecklistMutation = {
  __typename?: 'Mutation';
  ticketChecklist: {
    __typename?: 'TicketChecklistMutations';
    update: {
      __typename?: 'ResultOfTicketChecklist';
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

export type DeleteTicketChecklistsMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeleteTicketChecklistsMutation = {
  __typename?: 'Mutation';
  ticketChecklist: {
    __typename?: 'TicketChecklistMutations';
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

export type ExportTicketChecklistsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.TicketChecklistFilterInput>;
  order?: Types.InputMaybe<Array<Types.TicketChecklistSortInput> | Types.TicketChecklistSortInput>;
}>;

export type ExportTicketChecklistsQuery = {
  __typename?: 'Query';
  ticketChecklist: {
    __typename?: 'TicketChecklistQueries';
    exportToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string };
  };
};

export type GetTicketChecklistQueryVariables = Types.Exact<{
  ticketChecklistId: Types.Scalars['Int']['input'];
}>;

export type GetTicketChecklistQuery = {
  __typename?: 'Query';
  ticketChecklist: {
    __typename?: 'TicketChecklistQueries';
    get?: {
      __typename?: 'TicketChecklist';
      internalCode: string;
      name: string;
      type: Types.TicketChecklistTemplateType;
      costBaseFactor: Types.CostBaseFactor;
      rawWorkCost: number;
      safetyCost: number;
      preventativePlannedPeriod?: Types.PlannedPeriod | null;
      preventativeDaysOfWeek?: Array<Types.DayOfWeek> | null;
      preventativeToleranceDays?: number | null;
      id: number;
      catalogueType: {
        __typename?: 'CatalogueType';
        id: number;
        internalCode: string;
        name: string;
        notes?: string | null;
        category: {
          __typename?: 'CatalogueCategory';
          name: string;
          internalCode: string;
          id: number;
          subCategories: Array<{ __typename?: 'CatalogueSubCategory'; name: string; internalCode: string; id: number }>;
          catalogueTypes: Array<{
            __typename?: 'CatalogueType';
            id: number;
            internalCode: string;
            name: string;
            notes?: string | null;
            subCategory?: {
              __typename?: 'CatalogueSubCategory';
              name: string;
              internalCode: string;
              id: number;
            } | null;
            activities: Array<{
              __typename?: 'CatalogueTypeActivity';
              activityType: Types.CatalogueTypeActivityType;
              id: number;
              name: string;
              isMandatoryByLaw: boolean;
            }>;
            usageTypes: Array<{
              __typename?: 'EstateUsageType';
              id: number;
              name: string;
              internalCode: string;
              ordering: number;
              isForEstate: boolean;
              isForEstateUnit: boolean;
              isForEstateSubUnit: boolean;
              isForContracts: boolean;
            }>;
            fields?: Array<
              Array<{
                __typename?: 'CatalogueTypeField';
                name: string;
                isMandatory: boolean;
                type: Types.CustomFieldType;
                validValues?: Array<string> | null;
                id: string;
              }>
            > | null;
          }>;
        };
        subCategory?: { __typename?: 'CatalogueSubCategory'; name: string; internalCode: string; id: number } | null;
        activities: Array<{
          __typename?: 'CatalogueTypeActivity';
          activityType: Types.CatalogueTypeActivityType;
          id: number;
          name: string;
          isMandatoryByLaw: boolean;
        }>;
        usageTypes: Array<{
          __typename?: 'EstateUsageType';
          id: number;
          name: string;
          internalCode: string;
          ordering: number;
          isForEstate: boolean;
          isForEstateUnit: boolean;
          isForEstateSubUnit: boolean;
          isForContracts: boolean;
        }>;
        fields?: Array<
          Array<{
            __typename?: 'CatalogueTypeField';
            name: string;
            isMandatory: boolean;
            type: Types.CustomFieldType;
            validValues?: Array<string> | null;
            id: string;
          }>
        > | null;
      };
      preventativeActivities?: Array<{
        __typename?: 'CatalogueTypeActivity';
        activityType: Types.CatalogueTypeActivityType;
        id: number;
        name: string;
        isMandatoryByLaw: boolean;
      }> | null;
      preventativeInterventionType?: {
        __typename?: 'InterventionType';
        internalCode: string;
        name: string;
        id: number;
      } | null;
      preventativeCraft?: {
        __typename?: 'Craft';
        internalCode: string;
        name: string;
        ordering: number;
        id: number;
      } | null;
      onTriggerActivities?: Array<{
        __typename?: 'CatalogueTypeActivity';
        activityType: Types.CatalogueTypeActivityType;
        id: number;
        name: string;
        isMandatoryByLaw: boolean;
      }> | null;
      onTriggerInterventionType?: {
        __typename?: 'InterventionType';
        internalCode: string;
        name: string;
        id: number;
      } | null;
      onTriggerCraft?: {
        __typename?: 'Craft';
        internalCode: string;
        name: string;
        ordering: number;
        id: number;
      } | null;
      estateUnit: {
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
      };
      contract: {
        __typename?: 'FcltContract';
        id: number;
        internalCode: string;
        externalCode?: string | null;
        entryStatus: Types.EntryStatus;
        description: string;
        agreementDate?: string | null;
        effectiveDate: string;
        expirationDate: string;
        estateUnitIds: Array<number>;
        type: { __typename?: 'FcltContractType'; id: number; name: string };
        providerSubject:
          | { __typename?: 'LegalSubject'; id: number; name: string }
          | { __typename?: 'ManagementSubject'; id: number; name: string }
          | { __typename?: 'PhysicalSubject'; id: number; name: string };
        priceLists: Array<{
          __typename?: 'PriceList';
          internalCode: string;
          name: string;
          ordering: number;
          isDefault: boolean;
          id: number;
        }>;
      };
    } | null;
  };
};

export type DeleteTicketChecklistMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;

export type DeleteTicketChecklistMutation = {
  __typename?: 'Mutation';
  ticketChecklist: {
    __typename?: 'TicketChecklistMutations';
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

export type GetGroupedTicketChecklistsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.TicketChecklistFilterInput>;
  order?: Types.InputMaybe<Array<Types.TicketChecklistSortInput> | Types.TicketChecklistSortInput>;
}>;

export type GetGroupedTicketChecklistsQuery = {
  __typename?: 'Query';
  ticketChecklist: {
    __typename?: 'TicketChecklistQueries';
    listTicketChecklistsPerEstateUnits?: {
      __typename?: 'ListTicketChecklistsPerEstateUnitsConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'TicketChecklistsPerEstateUnit';
        estateUnitId: number;
        estateUnit: {
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
        };
        ticketChecklists: Array<{
          __typename?: 'TicketChecklist';
          internalCode: string;
          name: string;
          type: Types.TicketChecklistTemplateType;
          costBaseFactor: Types.CostBaseFactor;
          rawWorkCost: number;
          safetyCost: number;
          id: number;
          catalogueType: {
            __typename?: 'CatalogueType';
            id: number;
            category: { __typename?: 'CatalogueCategory'; id: number; name: string };
            subCategory?: { __typename?: 'CatalogueSubCategory'; id: number; name: string } | null;
          };
        }>;
      }> | null;
    } | null;
  };
};

export const GetTicketChecklistsDocument = gql`
  query getTicketChecklists(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: TicketChecklistFilterInput
    $order: [TicketChecklistSortInput!]
  ) {
    ticketChecklist {
      listTicketChecklists(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...TicketChecklistFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${TicketChecklistFragmentDoc}
`;

export function useGetTicketChecklistsQuery(
  options?: Omit<Urql.UseQueryArgs<GetTicketChecklistsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetTicketChecklistsQuery, GetTicketChecklistsQueryVariables>({
    query: GetTicketChecklistsDocument,
    ...options,
  });
}
export const AddTicketChecklistsDocument = gql`
  mutation addTicketChecklists($facilityContractId: Int!, $inputs: [TicketChecklistTemplatesPerEstateUnitInput!]!) {
    ticketChecklist {
      addRange(contractId: $facilityContractId, inputs: $inputs) {
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

export function useAddTicketChecklistsMutation() {
  return Urql.useMutation<AddTicketChecklistsMutation, AddTicketChecklistsMutationVariables>(
    AddTicketChecklistsDocument,
  );
}
export const UpdateTicketChecklistDocument = gql`
  mutation updateTicketChecklist($ticketChecklistId: Int!, $input: UpdateTicketChecklistInput!) {
    ticketChecklist {
      update(id: $ticketChecklistId, input: $input) {
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

export function useUpdateTicketChecklistMutation() {
  return Urql.useMutation<UpdateTicketChecklistMutation, UpdateTicketChecklistMutationVariables>(
    UpdateTicketChecklistDocument,
  );
}
export const DeleteTicketChecklistsDocument = gql`
  mutation deleteTicketChecklists($ids: [Int!]!) {
    ticketChecklist {
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

export function useDeleteTicketChecklistsMutation() {
  return Urql.useMutation<DeleteTicketChecklistsMutation, DeleteTicketChecklistsMutationVariables>(
    DeleteTicketChecklistsDocument,
  );
}
export const ExportTicketChecklistsDocument = gql`
  query exportTicketChecklists($where: TicketChecklistFilterInput, $order: [TicketChecklistSortInput!]) {
    ticketChecklist {
      exportToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportTicketChecklistsQuery(
  options?: Omit<Urql.UseQueryArgs<ExportTicketChecklistsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ExportTicketChecklistsQuery, ExportTicketChecklistsQueryVariables>({
    query: ExportTicketChecklistsDocument,
    ...options,
  });
}
export const GetTicketChecklistDocument = gql`
  query getTicketChecklist($ticketChecklistId: Int!) {
    ticketChecklist {
      get(id: $ticketChecklistId) {
        ...TicketChecklistDetailFragment
      }
    }
  }
  ${TicketChecklistDetailFragmentDoc}
  ${CatalogueTypeDetailFragmentDoc}
  ${CatalogueCategoryCatalogueTypeDetailFragmentDoc}
  ${CatalogueSubCategoryFragmentDoc}
  ${CatalogueTypeActivityFragmentDoc}
  ${UsageTypeFragmentDoc}
  ${CatalogueTypeFieldFragmentDoc}
  ${CatalogueCategoryFragmentDoc}
  ${InterventionTypeFragmentDoc}
  ${CraftFragmentDoc}
  ${EstateUnitFragmentDoc}
  ${AsstAddressFragmentDoc}
  ${CityFragmentDoc}
  ${StairFragmentDoc}
  ${FloorFragmentDoc}
  ${CadastralCoordinatesFragmentDoc}
  ${FacilityContractFragmentDoc}
  ${PriceListDetailFragmentDoc}
`;

export function useGetTicketChecklistQuery(
  options: Omit<Urql.UseQueryArgs<GetTicketChecklistQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetTicketChecklistQuery, GetTicketChecklistQueryVariables>({
    query: GetTicketChecklistDocument,
    ...options,
  });
}
export const DeleteTicketChecklistDocument = gql`
  mutation deleteTicketChecklist($id: Int!) {
    ticketChecklist {
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

export function useDeleteTicketChecklistMutation() {
  return Urql.useMutation<DeleteTicketChecklistMutation, DeleteTicketChecklistMutationVariables>(
    DeleteTicketChecklistDocument,
  );
}
export const GetGroupedTicketChecklistsDocument = gql`
  query getGroupedTicketChecklists(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: TicketChecklistFilterInput
    $order: [TicketChecklistSortInput!]
  ) {
    ticketChecklist {
      listTicketChecklistsPerEstateUnits(
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
          ...TicketChecklistsPerEstateUnitFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${TicketChecklistsPerEstateUnitFragmentDoc}
  ${EstateUnitFragmentDoc}
  ${AsstAddressFragmentDoc}
  ${CityFragmentDoc}
  ${StairFragmentDoc}
  ${FloorFragmentDoc}
  ${CadastralCoordinatesFragmentDoc}
`;

export function useGetGroupedTicketChecklistsQuery(
  options?: Omit<Urql.UseQueryArgs<GetGroupedTicketChecklistsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetGroupedTicketChecklistsQuery, GetGroupedTicketChecklistsQueryVariables>({
    query: GetGroupedTicketChecklistsDocument,
    ...options,
  });
}
