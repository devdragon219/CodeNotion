// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { AsstAddressFragmentDoc } from './RealGimm.Web.AsstAddress.fragment';
import { CadastralCoordinatesFragmentDoc } from './RealGimm.Web.CadastralCoordinates.fragment';
import { CityFragmentDoc } from './RealGimm.Web.City.fragment';
import { UsageTypeFragmentDoc } from './RealGimm.Web.EstateUsageType.fragment';
import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { UtilityChargeFieldFragmentDoc } from './RealGimm.Web.UtilityChargeField.fragment';
import { UtilityServiceDetailFragmentDoc, UtilityServiceFragmentDoc } from './RealGimm.Web.UtilityService.fragment';
import { UtilityTypeDetailFragmentDoc } from './RealGimm.Web.UtilityType.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';

export type GetUtilityServicesQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.UtilityServiceFilterInput>;
  order?: Types.InputMaybe<Array<Types.UtilityServiceSortInput> | Types.UtilityServiceSortInput>;
}>;

export type GetUtilityServicesQuery = {
  __typename?: 'Query';
  utilityService: {
    __typename?: 'UtilityServiceQueries';
    listUtilityServices?: {
      __typename?: 'ListUtilityServicesConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'UtilityService';
        id: number;
        internalCode: string;
        status: Types.EntryStatus;
        activationDate: string;
        utilityContractCode: string;
        utilityUserCode: string;
        description?: string | null;
        isFreeMarket: boolean;
        deposit?: number | null;
        contractPowerNominal?: string | null;
        contractPowerMaximum?: string | null;
        utilityMeterSerial?: string | null;
        contractNominalTension?: string | null;
        utilityDeliveryPointCode?: string | null;
        deactivationDate?: string | null;
        deactivationRequestDate?: string | null;
        notes?: string | null;
        referenceSubject:
          | { __typename?: 'LegalSubject'; id: number; name: string }
          | { __typename?: 'ManagementSubject'; id: number; name: string }
          | { __typename?: 'PhysicalSubject'; id: number; name: string };
        orgUnit: { __typename?: 'OrgUnit'; id: number; name?: string | null };
        utilityType: {
          __typename?: 'UtilityType';
          id: number;
          internalCode: string;
          description: string;
          category: Types.UtilityCategory;
          meteringType: Types.MeteringType;
          timeOfUseRateCount: number;
          measurementUnit: string;
          chargeFields?: Array<
            Array<{
              __typename?: 'UtilityChargeField';
              name: string;
              isMandatory: boolean;
              id: string;
              type: Types.CustomFieldType;
              validValues?: Array<string> | null;
            }>
          > | null;
        };
        providerSubject:
          | {
              __typename: 'LegalSubject';
              baseCountryTaxIdCode?: string | null;
              name: string;
              id: number;
              internalCode: string;
            }
          | {
              __typename: 'ManagementSubject';
              baseCountryTaxIdCode?: string | null;
              name: string;
              id: number;
              internalCode: string;
            }
          | {
              __typename: 'PhysicalSubject';
              professionalTaxIdCode?: string | null;
              name: string;
              id: number;
              internalCode: string;
            };
        accountingItem: { __typename?: 'AccountingItem'; id: number; internalCode: string; description: string };
        estates: Array<{
          __typename?: 'Estate';
          id: number;
          name?: string | null;
          internalCode: string;
          status: Types.EstateStatus;
          type: Types.EstateType;
          usageType: { __typename?: 'EstateUsageType'; id: number; name: string };
          managementSubject:
            | { __typename?: 'LegalSubject'; name: string; id: number }
            | { __typename?: 'ManagementSubject'; name: string; id: number }
            | { __typename?: 'PhysicalSubject'; name: string; id: number };
          addresses: Array<{
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
          }>;
        }>;
        estateUnits: Array<{
          __typename?: 'EstateUnit';
          id: number;
          name?: string | null;
          internalCode: string;
          type: Types.EstateUnitType;
          subNumbering?: string | null;
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
          usageType: { __typename?: 'EstateUsageType'; id: number; name: string };
          currentCadastralUnit?: {
            __typename?: 'CadastralUnit';
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
          estate: { __typename?: 'Estate'; id: number };
        }>;
      }> | null;
    } | null;
  };
};

export type GetUtilityServiceQueryVariables = Types.Exact<{
  utilityServiceId: Types.Scalars['Int']['input'];
}>;

export type GetUtilityServiceQuery = {
  __typename?: 'Query';
  utilityService: {
    __typename?: 'UtilityServiceQueries';
    get?: {
      __typename?: 'UtilityService';
      internalCode: string;
      description?: string | null;
      utilityUserCode: string;
      utilityContractCode: string;
      utilityMeterSerial?: string | null;
      utilityDeliveryPointCode?: string | null;
      isFreeMarket: boolean;
      deposit?: number | null;
      status: Types.EntryStatus;
      activationDate: string;
      deactivationRequestDate?: string | null;
      deactivationDate?: string | null;
      contractPowerMaximum?: string | null;
      contractPowerNominal?: string | null;
      contractNominalTension?: string | null;
      notes?: string | null;
      id: number;
      utilityType: {
        __typename?: 'UtilityType';
        category: Types.UtilityCategory;
        description: string;
        internalCode: string;
        expenseClass?: string | null;
        externalCode?: string | null;
        measurementUnit: string;
        measurementUnitDescription: string;
        timeOfUseRateCount: number;
        meteringType: Types.MeteringType;
        hasHeatingAccountingSystem: boolean;
        id: number;
        chargeFields?: Array<
          Array<{
            __typename?: 'UtilityChargeField';
            name: string;
            isMandatory: boolean;
            id: string;
            type: Types.CustomFieldType;
            validValues?: Array<string> | null;
          }>
        > | null;
      };
      estates: Array<{
        __typename?: 'Estate';
        id: number;
        name?: string | null;
        internalCode: string;
        status: Types.EstateStatus;
        type: Types.EstateType;
        usageType: {
          __typename?: 'EstateUsageType';
          id: number;
          name: string;
          internalCode: string;
          ordering: number;
          isForEstate: boolean;
          isForEstateUnit: boolean;
          isForEstateSubUnit: boolean;
          isForContracts: boolean;
        };
        managementSubject:
          | { __typename?: 'LegalSubject'; name: string; id: number }
          | { __typename?: 'ManagementSubject'; name: string; id: number }
          | { __typename?: 'PhysicalSubject'; name: string; id: number };
        addresses: Array<{
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
        }>;
      }>;
      estateUnits: Array<{
        __typename?: 'EstateUnit';
        id: number;
        name?: string | null;
        internalCode: string;
        type: Types.EstateUnitType;
        subNumbering?: string | null;
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
        usageType: {
          __typename?: 'EstateUsageType';
          id: number;
          name: string;
          internalCode: string;
          ordering: number;
          isForEstate: boolean;
          isForEstateUnit: boolean;
          isForEstateSubUnit: boolean;
          isForContracts: boolean;
        };
        currentCadastralUnit?: {
          __typename?: 'CadastralUnit';
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
        estate: { __typename?: 'Estate'; id: number };
      }>;
      providerSubject:
        | {
            __typename: 'LegalSubject';
            baseCountryTaxIdCode?: string | null;
            name: string;
            id: number;
            internalCode: string;
          }
        | {
            __typename: 'ManagementSubject';
            baseCountryTaxIdCode?: string | null;
            name: string;
            id: number;
            internalCode: string;
          }
        | {
            __typename: 'PhysicalSubject';
            professionalTaxIdCode?: string | null;
            name: string;
            id: number;
            internalCode: string;
          };
      referenceSubject:
        | { __typename?: 'LegalSubject'; name: string; id: number; internalCode: string }
        | { __typename?: 'ManagementSubject'; name: string; id: number; internalCode: string }
        | { __typename?: 'PhysicalSubject'; name: string; id: number; internalCode: string };
      orgUnit: { __typename?: 'OrgUnit'; id: number; name?: string | null };
      accountingItem: { __typename?: 'AccountingItem'; description: string; internalCode: string; id: number };
    } | null;
  };
};

export type DeleteUtilityServicesMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeleteUtilityServicesMutation = {
  __typename?: 'Mutation';
  utilityService: {
    __typename?: 'UtilityServiceMutations';
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

export type DeleteUtilityServiceMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;

export type DeleteUtilityServiceMutation = {
  __typename?: 'Mutation';
  utilityService: {
    __typename?: 'UtilityServiceMutations';
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

export type ExportUtilityServicesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.UtilityServiceFilterInput>;
  order?: Types.InputMaybe<Array<Types.UtilityServiceSortInput> | Types.UtilityServiceSortInput>;
}>;

export type ExportUtilityServicesQuery = {
  __typename?: 'Query';
  utilityService: {
    __typename?: 'UtilityServiceQueries';
    exportToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string };
  };
};

export type CreateUtilityServiceMutationVariables = Types.Exact<{
  utilityServiceInput: Types.UtilityServiceInput;
}>;

export type CreateUtilityServiceMutation = {
  __typename?: 'Mutation';
  utilityService: {
    __typename?: 'UtilityServiceMutations';
    add: {
      __typename?: 'ResultOfUtilityService';
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

export type UpdateUtilityServiceMutationVariables = Types.Exact<{
  utilityServiceId: Types.Scalars['Int']['input'];
  utilityServiceInput: Types.UtilityServiceInput;
}>;

export type UpdateUtilityServiceMutation = {
  __typename?: 'Mutation';
  utilityService: {
    __typename?: 'UtilityServiceMutations';
    update: {
      __typename?: 'ResultOfUtilityService';
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

export type GetUtilityServiceInternalCodeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetUtilityServiceInternalCodeQuery = {
  __typename?: 'Query';
  utilityService: { __typename?: 'UtilityServiceQueries'; proposeNewInternalCode?: string | null };
};

export type CanUseUtilityServiceInternalCodeQueryVariables = Types.Exact<{
  internalCode: Types.Scalars['String']['input'];
  currentUtilityServiceId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CanUseUtilityServiceInternalCodeQuery = {
  __typename?: 'Query';
  utilityService: { __typename?: 'UtilityServiceQueries'; canUseInternalCode: boolean };
};

export const GetUtilityServicesDocument = gql`
  query getUtilityServices(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: UtilityServiceFilterInput
    $order: [UtilityServiceSortInput!]
  ) {
    utilityService {
      listUtilityServices(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...UtilityServiceFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${UtilityServiceFragmentDoc}
  ${UtilityChargeFieldFragmentDoc}
  ${AsstAddressFragmentDoc}
  ${CityFragmentDoc}
  ${CadastralCoordinatesFragmentDoc}
`;

export function useGetUtilityServicesQuery(
  options?: Omit<Urql.UseQueryArgs<GetUtilityServicesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetUtilityServicesQuery, GetUtilityServicesQueryVariables>({
    query: GetUtilityServicesDocument,
    ...options,
  });
}
export const GetUtilityServiceDocument = gql`
  query getUtilityService($utilityServiceId: Int!) {
    utilityService {
      get(id: $utilityServiceId) {
        ...UtilityServiceDetailFragment
      }
    }
  }
  ${UtilityServiceDetailFragmentDoc}
  ${UtilityTypeDetailFragmentDoc}
  ${UtilityChargeFieldFragmentDoc}
  ${UsageTypeFragmentDoc}
  ${AsstAddressFragmentDoc}
  ${CityFragmentDoc}
  ${CadastralCoordinatesFragmentDoc}
`;

export function useGetUtilityServiceQuery(options: Omit<Urql.UseQueryArgs<GetUtilityServiceQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUtilityServiceQuery, GetUtilityServiceQueryVariables>({
    query: GetUtilityServiceDocument,
    ...options,
  });
}
export const DeleteUtilityServicesDocument = gql`
  mutation deleteUtilityServices($ids: [Int!]!) {
    utilityService {
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

export function useDeleteUtilityServicesMutation() {
  return Urql.useMutation<DeleteUtilityServicesMutation, DeleteUtilityServicesMutationVariables>(
    DeleteUtilityServicesDocument,
  );
}
export const DeleteUtilityServiceDocument = gql`
  mutation deleteUtilityService($id: Int!) {
    utilityService {
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

export function useDeleteUtilityServiceMutation() {
  return Urql.useMutation<DeleteUtilityServiceMutation, DeleteUtilityServiceMutationVariables>(
    DeleteUtilityServiceDocument,
  );
}
export const ExportUtilityServicesDocument = gql`
  query exportUtilityServices($where: UtilityServiceFilterInput, $order: [UtilityServiceSortInput!]) {
    utilityService {
      exportToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportUtilityServicesQuery(
  options?: Omit<Urql.UseQueryArgs<ExportUtilityServicesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ExportUtilityServicesQuery, ExportUtilityServicesQueryVariables>({
    query: ExportUtilityServicesDocument,
    ...options,
  });
}
export const CreateUtilityServiceDocument = gql`
  mutation createUtilityService($utilityServiceInput: UtilityServiceInput!) {
    utilityService {
      add(input: $utilityServiceInput) {
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

export function useCreateUtilityServiceMutation() {
  return Urql.useMutation<CreateUtilityServiceMutation, CreateUtilityServiceMutationVariables>(
    CreateUtilityServiceDocument,
  );
}
export const UpdateUtilityServiceDocument = gql`
  mutation updateUtilityService($utilityServiceId: Int!, $utilityServiceInput: UtilityServiceInput!) {
    utilityService {
      update(id: $utilityServiceId, input: $utilityServiceInput) {
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

export function useUpdateUtilityServiceMutation() {
  return Urql.useMutation<UpdateUtilityServiceMutation, UpdateUtilityServiceMutationVariables>(
    UpdateUtilityServiceDocument,
  );
}
export const GetUtilityServiceInternalCodeDocument = gql`
  query getUtilityServiceInternalCode {
    utilityService {
      proposeNewInternalCode
    }
  }
`;

export function useGetUtilityServiceInternalCodeQuery(
  options?: Omit<Urql.UseQueryArgs<GetUtilityServiceInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetUtilityServiceInternalCodeQuery, GetUtilityServiceInternalCodeQueryVariables>({
    query: GetUtilityServiceInternalCodeDocument,
    ...options,
  });
}
export const CanUseUtilityServiceInternalCodeDocument = gql`
  query canUseUtilityServiceInternalCode($internalCode: String!, $currentUtilityServiceId: Int) {
    utilityService {
      canUseInternalCode(internalCode: $internalCode, currentUtilityServiceId: $currentUtilityServiceId)
    }
  }
`;

export function useCanUseUtilityServiceInternalCodeQuery(
  options: Omit<Urql.UseQueryArgs<CanUseUtilityServiceInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<CanUseUtilityServiceInternalCodeQuery, CanUseUtilityServiceInternalCodeQueryVariables>({
    query: CanUseUtilityServiceInternalCodeDocument,
    ...options,
  });
}
