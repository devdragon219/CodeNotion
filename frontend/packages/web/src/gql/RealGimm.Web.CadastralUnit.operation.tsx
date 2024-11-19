// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { AsstAddressFragmentDoc } from './RealGimm.Web.AsstAddress.fragment';
import { CadastralCategoryFragmentDoc } from './RealGimm.Web.CadastralCategory.fragment';
import { CadastralCoordinatesFragmentDoc } from './RealGimm.Web.CadastralCoordinates.fragment';
import { CadastralLandCategoryFragmentDoc } from './RealGimm.Web.CadastralLandCategory.fragment';
import {
  CadastralUnitDetailFragmentDoc,
  CadastralUnitFragmentDoc,
  EstateUnitCadastralUnitDetailFragmentDoc,
} from './RealGimm.Web.CadastralUnit.fragment';
import { CadastralUnitIncomeFragmentDoc } from './RealGimm.Web.CadastralUnitIncome.fragment';
import { CadastralUnitInspectionFragmentDoc } from './RealGimm.Web.CadastralUnitInspection.fragment';
import { CityFragmentDoc } from './RealGimm.Web.City.fragment';
import { EstateUnitDetailFragmentDoc, EstateUnitFragmentDoc } from './RealGimm.Web.EstateUnit.fragment';
import { FloorFragmentDoc } from './RealGimm.Web.Floor.fragment';
import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { StairFragmentDoc } from './RealGimm.Web.Stair.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';

export type GetCadastralUnitsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.CadastralUnitFilterInput>;
  order?: Types.InputMaybe<Array<Types.CadastralUnitSortInput> | Types.CadastralUnitSortInput>;
}>;

export type GetCadastralUnitsQuery = {
  __typename?: 'Query';
  cadastralUnit: {
    __typename?: 'CadastralUnitQueries';
    listCadastralUnits?: {
      __typename?: 'ListCadastralUnitsConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'CadastralUnit';
        id: number;
        internalCode: string;
        type: Types.EstateUnitType;
        since?: string | null;
        until?: string | null;
        status: Types.CadastralUnitStatus;
        estateUnit: {
          __typename?: 'EstateUnit';
          id: number;
          internalCode: string;
          managementSubject:
            | { __typename?: 'LegalSubject'; id: number; name: string }
            | { __typename?: 'ManagementSubject'; id: number; name: string }
            | { __typename?: 'PhysicalSubject'; id: number; name: string };
          estate: { __typename?: 'Estate'; id: number; internalCode: string };
        };
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
      }> | null;
    } | null;
  };
};

export type DeleteCadastralUnitMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;

export type DeleteCadastralUnitMutation = {
  __typename?: 'Mutation';
  cadastralUnit: {
    __typename?: 'CadastralUnitMutations';
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

export type DeleteCadastralUnitsMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeleteCadastralUnitsMutation = {
  __typename?: 'Mutation';
  cadastralUnit: {
    __typename?: 'CadastralUnitMutations';
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

export type ExportCadastralUnitsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.CadastralUnitFilterInput>;
  order?: Types.InputMaybe<Array<Types.CadastralUnitSortInput> | Types.CadastralUnitSortInput>;
}>;

export type ExportCadastralUnitsQuery = {
  __typename?: 'Query';
  cadastralUnit: {
    __typename?: 'CadastralUnitQueries';
    exportToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string };
  };
};

export type GetCadastralUnitQueryVariables = Types.Exact<{
  cadastralUnitId: Types.Scalars['Int']['input'];
}>;

export type GetCadastralUnitQuery = {
  __typename?: 'Query';
  cadastralUnit: {
    __typename?: 'CadastralUnitQueries';
    cadastralUnit?: {
      __typename?: 'CadastralUnit';
      internalCode: string;
      type: Types.EstateUnitType;
      status: Types.CadastralUnitStatus;
      since?: string | null;
      until?: string | null;
      lastRelevantChangeDate?: string | null;
      cadastralNotes?: string | null;
      fiscalNotes?: string | null;
      consortiumNotes?: string | null;
      isCadastralRegistrationInProgress: boolean;
      isAncillaryUnit: boolean;
      id: number;
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
      history: Array<{
        __typename?: 'CadastralUnit';
        internalCode: string;
        type: Types.EstateUnitType;
        status: Types.CadastralUnitStatus;
        since?: string | null;
        until?: string | null;
        lastRelevantChangeDate?: string | null;
        cadastralNotes?: string | null;
        fiscalNotes?: string | null;
        consortiumNotes?: string | null;
        isCadastralRegistrationInProgress: boolean;
        isAncillaryUnit: boolean;
        id: number;
        estateUnit: { __typename?: 'EstateUnit'; internalCode: string };
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
        unavailabilities: Array<{
          __typename?: 'CadastralUnavailability';
          since?: string | null;
          until?: string | null;
          notes?: string | null;
          id: number;
        }>;
        inspection?: {
          __typename?: 'CadastralUnitInspection';
          date?: string | null;
          protocolDate?: string | null;
          protocolNumber?: string | null;
          heading?: string | null;
          macroZone?: string | null;
          microZone?: string | null;
          isHistoricalEstate: boolean;
          isDirectRestriction: boolean;
        } | null;
        income: {
          __typename?: 'CadastralUnitIncome';
          macroCategory?: string | null;
          microCategory?: string | null;
          metric?: Types.IncomeMetric | null;
          metricAmount?: number | null;
          metricRentedAmount?: number | null;
          registeredSurface?: number | null;
          type?: Types.IncomeType | null;
          cadastralAmount?: number | null;
          farmAmount?: number | null;
          landAmount?: number | null;
          marketValue?: number | null;
          cadastralCategory?: {
            __typename?: 'CadastralCategory';
            id: number;
            description: string;
            externalCode?: string | null;
          } | null;
          cadastralLandCategory?: {
            __typename?: 'CadastralLandCategory';
            id: number;
            description: string;
            internalCode: string;
            countryISO: string;
            ordering: number;
          } | null;
        };
      }>;
      taxConfig: Array<{
        __typename?: 'CadastralUnitTaxConfig';
        taxCalculator: string;
        code: string;
        isMandatory: boolean;
        templateTypeId: string;
        type: Types.CustomFieldType;
        value?: string | null;
        id: number;
      }>;
      taxCalculators: Array<{
        __typename?: 'ConfigSection';
        name: string;
        taxCalculator: string;
        form: Array<
          Array<{
            __typename?: 'ConfigField';
            name?: string | null;
            isMandatory: boolean;
            id: string;
            type: Types.CustomFieldType;
            validValues?: Array<{ __typename?: 'KeyValuePairOfStringAndString'; key: string; value: string }> | null;
          }>
        >;
      }>;
      taxPayments: Array<{
        __typename?: 'AssetTaxCalculation';
        id: number;
        expectedInstallments: number;
        taxCalculator: string;
        year: number;
        installments: Array<{
          __typename?: 'AssetTaxPayment';
          installmentsPaid: Array<number>;
          amountPaid: number;
          date: string;
        }>;
      }>;
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
      unavailabilities: Array<{
        __typename?: 'CadastralUnavailability';
        since?: string | null;
        until?: string | null;
        notes?: string | null;
        id: number;
      }>;
      inspection?: {
        __typename?: 'CadastralUnitInspection';
        date?: string | null;
        protocolDate?: string | null;
        protocolNumber?: string | null;
        heading?: string | null;
        macroZone?: string | null;
        microZone?: string | null;
        isHistoricalEstate: boolean;
        isDirectRestriction: boolean;
      } | null;
      income: {
        __typename?: 'CadastralUnitIncome';
        macroCategory?: string | null;
        microCategory?: string | null;
        metric?: Types.IncomeMetric | null;
        metricAmount?: number | null;
        metricRentedAmount?: number | null;
        registeredSurface?: number | null;
        type?: Types.IncomeType | null;
        cadastralAmount?: number | null;
        farmAmount?: number | null;
        landAmount?: number | null;
        marketValue?: number | null;
        cadastralCategory?: {
          __typename?: 'CadastralCategory';
          id: number;
          description: string;
          externalCode?: string | null;
        } | null;
        cadastralLandCategory?: {
          __typename?: 'CadastralLandCategory';
          id: number;
          description: string;
          internalCode: string;
          countryISO: string;
          ordering: number;
        } | null;
      };
    } | null;
  };
};

export type GetCadastralUnitInternalCodeQueryVariables = Types.Exact<{
  estateUnitId: Types.Scalars['Int']['input'];
}>;

export type GetCadastralUnitInternalCodeQuery = {
  __typename?: 'Query';
  cadastralUnit: { __typename?: 'CadastralUnitQueries'; proposeNewInternalCode?: string | null };
};

export type GetCadastralUnitInternalCodeByEstateUnitInternalCodeQueryVariables = Types.Exact<{
  estateUnitInternalCode: Types.Scalars['String']['input'];
}>;

export type GetCadastralUnitInternalCodeByEstateUnitInternalCodeQuery = {
  __typename?: 'Query';
  cadastralUnit: { __typename?: 'CadastralUnitQueries'; proposeNewInternalCodeByParentCode: string };
};

export type CreateCadastralUnitMutationVariables = Types.Exact<{
  cadastralUnitInput: Types.CadastralUnitInput;
}>;

export type CreateCadastralUnitMutation = {
  __typename?: 'Mutation';
  cadastralUnit: {
    __typename?: 'CadastralUnitMutations';
    addCadastralUnit: {
      __typename?: 'ResultOfCadastralUnit';
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

export type UpdateCadastralUnitMutationVariables = Types.Exact<{
  cadastralUnitId: Types.Scalars['Int']['input'];
  cadastralUnitInput: Types.CadastralUnitInput;
  isVariation: Types.Scalars['Boolean']['input'];
}>;

export type UpdateCadastralUnitMutation = {
  __typename?: 'Mutation';
  cadastralUnit: {
    __typename?: 'CadastralUnitMutations';
    updateCadastralUnit: {
      __typename?: 'ResultOfCadastralUnit';
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

export const GetCadastralUnitsDocument = gql`
  query getCadastralUnits(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: CadastralUnitFilterInput
    $order: [CadastralUnitSortInput!]
  ) {
    cadastralUnit {
      listCadastralUnits(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...CadastralUnitFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${CadastralUnitFragmentDoc}
  ${AsstAddressFragmentDoc}
  ${CityFragmentDoc}
  ${CadastralCoordinatesFragmentDoc}
`;

export function useGetCadastralUnitsQuery(options?: Omit<Urql.UseQueryArgs<GetCadastralUnitsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCadastralUnitsQuery, GetCadastralUnitsQueryVariables>({
    query: GetCadastralUnitsDocument,
    ...options,
  });
}
export const DeleteCadastralUnitDocument = gql`
  mutation deleteCadastralUnit($id: Int!) {
    cadastralUnit {
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

export function useDeleteCadastralUnitMutation() {
  return Urql.useMutation<DeleteCadastralUnitMutation, DeleteCadastralUnitMutationVariables>(
    DeleteCadastralUnitDocument,
  );
}
export const DeleteCadastralUnitsDocument = gql`
  mutation deleteCadastralUnits($ids: [Int!]!) {
    cadastralUnit {
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

export function useDeleteCadastralUnitsMutation() {
  return Urql.useMutation<DeleteCadastralUnitsMutation, DeleteCadastralUnitsMutationVariables>(
    DeleteCadastralUnitsDocument,
  );
}
export const ExportCadastralUnitsDocument = gql`
  query exportCadastralUnits($where: CadastralUnitFilterInput, $order: [CadastralUnitSortInput!]) {
    cadastralUnit {
      exportToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportCadastralUnitsQuery(
  options?: Omit<Urql.UseQueryArgs<ExportCadastralUnitsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ExportCadastralUnitsQuery, ExportCadastralUnitsQueryVariables>({
    query: ExportCadastralUnitsDocument,
    ...options,
  });
}
export const GetCadastralUnitDocument = gql`
  query getCadastralUnit($cadastralUnitId: Int!) {
    cadastralUnit {
      cadastralUnit(id: $cadastralUnitId) {
        ...CadastralUnitDetailFragment
      }
    }
  }
  ${CadastralUnitDetailFragmentDoc}
  ${EstateUnitCadastralUnitDetailFragmentDoc}
  ${AsstAddressFragmentDoc}
  ${CityFragmentDoc}
  ${CadastralCoordinatesFragmentDoc}
  ${CadastralUnitInspectionFragmentDoc}
  ${CadastralUnitIncomeFragmentDoc}
  ${CadastralCategoryFragmentDoc}
  ${CadastralLandCategoryFragmentDoc}
  ${EstateUnitFragmentDoc}
  ${StairFragmentDoc}
  ${FloorFragmentDoc}
`;

export function useGetCadastralUnitQuery(options: Omit<Urql.UseQueryArgs<GetCadastralUnitQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCadastralUnitQuery, GetCadastralUnitQueryVariables>({
    query: GetCadastralUnitDocument,
    ...options,
  });
}
export const GetCadastralUnitInternalCodeDocument = gql`
  query getCadastralUnitInternalCode($estateUnitId: Int!) {
    cadastralUnit {
      proposeNewInternalCode(parentId: $estateUnitId)
    }
  }
`;

export function useGetCadastralUnitInternalCodeQuery(
  options: Omit<Urql.UseQueryArgs<GetCadastralUnitInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetCadastralUnitInternalCodeQuery, GetCadastralUnitInternalCodeQueryVariables>({
    query: GetCadastralUnitInternalCodeDocument,
    ...options,
  });
}
export const GetCadastralUnitInternalCodeByEstateUnitInternalCodeDocument = gql`
  query getCadastralUnitInternalCodeByEstateUnitInternalCode($estateUnitInternalCode: String!) {
    cadastralUnit {
      proposeNewInternalCodeByParentCode(parentCode: $estateUnitInternalCode)
    }
  }
`;

export function useGetCadastralUnitInternalCodeByEstateUnitInternalCodeQuery(
  options: Omit<Urql.UseQueryArgs<GetCadastralUnitInternalCodeByEstateUnitInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<
    GetCadastralUnitInternalCodeByEstateUnitInternalCodeQuery,
    GetCadastralUnitInternalCodeByEstateUnitInternalCodeQueryVariables
  >({ query: GetCadastralUnitInternalCodeByEstateUnitInternalCodeDocument, ...options });
}
export const CreateCadastralUnitDocument = gql`
  mutation createCadastralUnit($cadastralUnitInput: CadastralUnitInput!) {
    cadastralUnit {
      addCadastralUnit(input: $cadastralUnitInput) {
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

export function useCreateCadastralUnitMutation() {
  return Urql.useMutation<CreateCadastralUnitMutation, CreateCadastralUnitMutationVariables>(
    CreateCadastralUnitDocument,
  );
}
export const UpdateCadastralUnitDocument = gql`
  mutation updateCadastralUnit(
    $cadastralUnitId: Int!
    $cadastralUnitInput: CadastralUnitInput!
    $isVariation: Boolean!
  ) {
    cadastralUnit {
      updateCadastralUnit(id: $cadastralUnitId, isVariation: $isVariation, input: $cadastralUnitInput) {
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

export function useUpdateCadastralUnitMutation() {
  return Urql.useMutation<UpdateCadastralUnitMutation, UpdateCadastralUnitMutationVariables>(
    UpdateCadastralUnitDocument,
  );
}
