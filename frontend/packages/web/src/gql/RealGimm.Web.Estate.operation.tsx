// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { AsstAddressFragmentDoc } from './RealGimm.Web.AsstAddress.fragment';
import { CityFragmentDoc } from './RealGimm.Web.City.fragment';
import { DocumentFragmentDoc } from './RealGimm.Web.Document.fragment';
import { DocumentsPerContentCategoryGroupOutputFragmentDoc } from './RealGimm.Web.DocumentsPerContentCategoryGroupOutput.fragment';
import { DocumentsPerContentCategoryOutputFragmentDoc } from './RealGimm.Web.DocumentsPerContentCategoryOutput.fragment';
import { EstateDetailFragmentDoc, EstateFragmentDoc } from './RealGimm.Web.Estate.fragment';
import { EstateLightDtoFragmentDoc } from './RealGimm.Web.EstateLightDto.fragment';
import { EstateLocationFragmentDoc } from './RealGimm.Web.EstateLocation.fragment';
import { MainUsageTypeFragmentDoc } from './RealGimm.Web.EstateMainUsageType.fragment';
import { EstateStatisticsOutputFragmentDoc } from './RealGimm.Web.EstateStatisticsOutput.fragment';
import { EstateSurfacesFragmentDoc } from './RealGimm.Web.EstateSurfaces.fragment';
import { EstateTotalMarketValueFragmentDoc } from './RealGimm.Web.EstateTotalMarketValue.fragment';
import { UsageTypeFragmentDoc } from './RealGimm.Web.EstateUsageType.fragment';
import { FloorFragmentDoc } from './RealGimm.Web.Floor.fragment';
import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { RefactoringFragmentDoc } from './RealGimm.Web.Refactoring.fragment';
import { StairFragmentDoc } from './RealGimm.Web.Stair.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';
import { ValuationFragmentDoc } from './RealGimm.Web.Valuation.fragment';

export type GetEstatesQueryVariables = Types.Exact<{
  keepTopIds?: Types.InputMaybe<Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input']>;
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.EstateFilterInput>;
  order?: Types.InputMaybe<Array<Types.EstateSortInput> | Types.EstateSortInput>;
}>;

export type GetEstatesQuery = {
  __typename?: 'Query';
  estate: {
    __typename?: 'EstateQueries';
    listEstates?: {
      __typename?: 'ListEstatesConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'Estate';
        id: number;
        internalCode: string;
        name?: string | null;
        type: Types.EstateType;
        externalCode?: string | null;
        surfaceAreaSqM?: number | null;
        ownership: Types.EstateOwnership;
        buildYear?: number | null;
        status: Types.EstateStatus;
        notes?: string | null;
        managementSubject:
          | { __typename?: 'LegalSubject'; id: number; name: string }
          | { __typename?: 'ManagementSubject'; id: number; name: string }
          | { __typename?: 'PhysicalSubject'; id: number; name: string };
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
        estateUnits: Array<{ __typename?: 'EstateUnit'; id: number }>;
        floors: Array<{ __typename?: 'Floor'; id: number; name: string; position: number; templateReference: string }>;
        mainUsageType: { __typename?: 'EstateMainUsageType'; id: number; name: string };
        usageType: { __typename?: 'EstateUsageType'; id: number; name: string };
        managementOrgUnit?: { __typename?: 'OrgUnit'; id: number; name?: string | null } | null;
        stairs: Array<{ __typename?: 'Stair'; id: number; description: string }>;
      }> | null;
    } | null;
  };
};

export type GetAllEstatesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.EstateFilterInput>;
  order?: Types.InputMaybe<Array<Types.EstateSortInput> | Types.EstateSortInput>;
}>;

export type GetAllEstatesQuery = {
  __typename?: 'Query';
  estate: {
    __typename?: 'EstateQueries';
    listEstatesFull: Array<{
      __typename?: 'EstateLightDto';
      id: number;
      managementSubjectId: number;
      internalCode: string;
      name?: string | null;
      managementSubjectName?: string | null;
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
  };
};

export type DeleteEstateMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;

export type DeleteEstateMutation = {
  __typename?: 'Mutation';
  estate: {
    __typename?: 'EstateMutations';
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

export type DeleteEstatesMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeleteEstatesMutation = {
  __typename?: 'Mutation';
  estate: {
    __typename?: 'EstateMutations';
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

export type ExportEstatesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.EstateFilterInput>;
  order?: Types.InputMaybe<Array<Types.EstateSortInput> | Types.EstateSortInput>;
}>;

export type ExportEstatesQuery = {
  __typename?: 'Query';
  estate: { __typename?: 'EstateQueries'; exportToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string } };
};

export type GetEstateInternalCodeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetEstateInternalCodeQuery = {
  __typename?: 'Query';
  estate: { __typename?: 'EstateQueries'; proposeNewInternalCode?: string | null };
};

export type CanUseEstateInternalCodeQueryVariables = Types.Exact<{
  internalCode: Types.Scalars['String']['input'];
  currentEstateId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CanUseEstateInternalCodeQuery = {
  __typename?: 'Query';
  estate: { __typename?: 'EstateQueries'; canUseInternalCode: boolean };
};

export type CreateEstateMutationVariables = Types.Exact<{
  estateInput: Types.EstateInput;
}>;

export type CreateEstateMutation = {
  __typename?: 'Mutation';
  estate: {
    __typename?: 'EstateMutations';
    addEstate: {
      __typename?: 'ResultOfEstate';
      errors?: Array<string | null> | null;
      isSuccess: boolean;
      validationErrors?: Array<{
        __typename?: 'ValidationError';
        identifier?: string | null;
        errorMessage?: string | null;
        errorCode?: string | null;
        severity: Types.ValidationSeverity;
      } | null> | null;
      value?: { __typename?: 'Estate'; id: number } | null;
    };
  };
};

export type GetEstateQueryVariables = Types.Exact<{
  estateId: Types.Scalars['Int']['input'];
}>;

export type GetEstateQuery = {
  __typename?: 'Query';
  estate: {
    __typename?: 'EstateQueries';
    estate?: {
      __typename?: 'Estate';
      id: number;
      name?: string | null;
      internalCode: string;
      type: Types.EstateType;
      status: Types.EstateStatus;
      decommissioningDate?: string | null;
      externalCode?: string | null;
      surfaceAreaSqM?: number | null;
      ownership: Types.EstateOwnership;
      buildYear?: number | null;
      notes?: string | null;
      managementOrgUnit?: { __typename?: 'OrgUnit'; id: number; name?: string | null } | null;
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
      floors: Array<{ __typename?: 'Floor'; id: number; name: string; position: number; templateReference: string }>;
      mainUsageType: {
        __typename?: 'EstateMainUsageType';
        id: number;
        name: string;
        internalCode: string;
        ordering: number;
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
      stairs: Array<{ __typename?: 'Stair'; id: number; description: string }>;
      totalMarketValue?: {
        __typename?: 'EstateTotalMarketValue';
        totalSurfaceAreaSqM: number;
        notes?: string | null;
        coefficients: Array<{
          __typename?: 'EstateTotalMarketValueCoefficient';
          id: number;
          type: Types.EstateTotalMarketValueCoefficientType;
          value: number;
        }>;
        marketValues: Array<{
          __typename?: 'EstateMarketValue';
          id: number;
          type: Types.EstateMarketValueType;
          value: number;
        }>;
      } | null;
      estateUnits: Array<{ __typename?: 'EstateUnit'; id: number; name?: string | null }>;
      valuations: Array<{
        __typename?: 'Valuation';
        referenceYear: number;
        iasValue?: number | null;
        rbaValue?: number | null;
        mortgageAmount?: number | null;
        transferYear?: number | null;
        revampOperations?: number | null;
        id: number;
      }>;
      refactorings: Array<{
        __typename?: 'Refactoring';
        referenceYear: number;
        buildingPermitYear?: number | null;
        condition: Types.UnitCondition;
        ageCoefficient?: number | null;
        id: number;
        estateUnits: Array<{
          __typename?: 'EstateUnit';
          id: number;
          internalCode: string;
          name?: string | null;
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
        }>;
      }>;
      catalogueItems: Array<{ __typename?: 'CatalogueItem'; id: number }>;
    } | null;
  };
};

export type UpdateEstateMutationVariables = Types.Exact<{
  estateId: Types.Scalars['Int']['input'];
  estateInput: Types.EstateInput;
}>;

export type UpdateEstateMutation = {
  __typename?: 'Mutation';
  estate: {
    __typename?: 'EstateMutations';
    updateEstate: {
      __typename?: 'ResultOfEstate';
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

export type GetEstateSurfacesQueryVariables = Types.Exact<{
  estateId: Types.Scalars['Int']['input'];
}>;

export type GetEstateSurfacesQuery = {
  __typename?: 'Query';
  estate: {
    __typename?: 'EstateQueries';
    surfaces: Array<{
      __typename?: 'EstateSurfaces';
      metric: Types.SurfaceMeasurementMetric;
      heritageType: Types.EstateUnitHeritageType;
      surfaceSqMTotal: number;
      surfaceSqMCommonArea: number;
      surfaceSqMSideArea: number;
    }>;
  };
};

export type AddEstateDocumentsMutationVariables = Types.Exact<{
  estateId: Types.Scalars['Int']['input'];
  inputs: Array<Types.DocumentInput> | Types.DocumentInput;
}>;

export type AddEstateDocumentsMutation = {
  __typename?: 'Mutation';
  estate: {
    __typename?: 'EstateMutations';
    document: {
      __typename?: 'EstateDocumentMutations';
      addRange: {
        __typename?: 'ResultOfDocument__';
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
};

export type DeleteEstateDocumentsMutationVariables = Types.Exact<{
  entityId: Types.Scalars['Int']['input'];
  cmisIds: Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input'];
}>;

export type DeleteEstateDocumentsMutation = {
  __typename?: 'Mutation';
  estate: {
    __typename?: 'EstateMutations';
    document: {
      __typename?: 'EstateDocumentMutations';
      deleteRange: {
        __typename?: 'ResultOfDocument__';
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
};

export type UpdateEstateDocumentMutationVariables = Types.Exact<{
  estateId: Types.Scalars['Int']['input'];
  input: Types.DocumentInput;
}>;

export type UpdateEstateDocumentMutation = {
  __typename?: 'Mutation';
  estate: {
    __typename?: 'EstateMutations';
    document: {
      __typename?: 'EstateDocumentMutations';
      update: {
        __typename?: 'ResultOfDocument';
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
};

export type GetEstateDocumentsQueryVariables = Types.Exact<{
  estateId: Types.Scalars['Int']['input'];
  where?: Types.InputMaybe<Types.DocumentFilterInput>;
  order?: Types.InputMaybe<
    Array<Types.DocumentsPerContentCategoryGroupOutputSortInput> | Types.DocumentsPerContentCategoryGroupOutputSortInput
  >;
}>;

export type GetEstateDocumentsQuery = {
  __typename?: 'Query';
  estate: {
    __typename?: 'EstateQueries';
    estate?: {
      __typename?: 'Estate';
      documents: Array<{
        __typename?: 'DocumentsPerContentCategoryGroupOutput';
        contentCategoryGroup: string;
        guid: string;
        subRows: Array<{
          __typename?: 'DocumentsPerContentCategoryOutput';
          contentCategory: Types.ContentCategory;
          guid: string;
          subRows: Array<{
            __typename?: 'Document';
            cmisId: string;
            contentCategory: Types.ContentCategory;
            contentCategoryGroup: string;
            contentType: Types.ContentType;
            creationDate: string;
            entityId?: string | null;
            entityIntId?: number | null;
            fileName?: string | null;
            issueDate?: string | null;
            issuer?: string | null;
            issuerCode?: string | null;
            mimeType?: string | null;
            name: string;
            notes?: string | null;
            protocolNumber?: string | null;
            since?: string | null;
            until?: string | null;
            uploaderName?: string | null;
          }>;
        }>;
      }>;
    } | null;
  };
};

export type GetEstateImagesQueryVariables = Types.Exact<{
  estateId: Types.Scalars['Int']['input'];
}>;

export type GetEstateImagesQuery = {
  __typename?: 'Query';
  estate: {
    __typename?: 'EstateQueries';
    estate?: {
      __typename?: 'Estate';
      images: Array<{
        __typename?: 'Document';
        cmisId: string;
        contentCategory: Types.ContentCategory;
        contentCategoryGroup: string;
        contentType: Types.ContentType;
        creationDate: string;
        entityId?: string | null;
        entityIntId?: number | null;
        fileName?: string | null;
        issueDate?: string | null;
        issuer?: string | null;
        issuerCode?: string | null;
        mimeType?: string | null;
        name: string;
        notes?: string | null;
        protocolNumber?: string | null;
        since?: string | null;
        until?: string | null;
        uploaderName?: string | null;
      }>;
    } | null;
  };
};

export type ExportEstatePortfolioQueryVariables = Types.Exact<{
  estateId: Types.Scalars['Int']['input'];
  cmisIds: Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input'];
}>;

export type ExportEstatePortfolioQuery = {
  __typename?: 'Query';
  estate: {
    __typename?: 'EstateQueries';
    documents: {
      __typename?: 'EstateDocumentQueries';
      exportPortfolioToZip: {
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
};

export type GetEstateStatisticsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetEstateStatisticsQuery = {
  __typename?: 'Query';
  estate: {
    __typename?: 'EstateQueries';
    statistics: {
      __typename?: 'EstateStatisticsOutput';
      estatesCount: number;
      estateUnitsCount: number;
      occupiedEstatesCount: number;
      vacantEstatesCount: number;
    };
  };
};

export type GetEstatesMapQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetEstatesMapQuery = {
  __typename?: 'Query';
  estate: {
    __typename?: 'EstateQueries';
    locations: Array<{
      __typename?: 'EstateLocation';
      estateId: number;
      estateInternalCode: string;
      estateName?: string | null;
      address?: {
        __typename?: 'AsstAddress';
        id: number;
        cityName?: string | null;
        countryISO?: string | null;
        countyName?: string | null;
        localPostCode?: string | null;
        numbering?: string | null;
        toponymy?: string | null;
        locationLatLon?: { __typename?: 'GeoJSONPointType'; coordinates?: Array<number> | null } | null;
      } | null;
    }>;
  };
};

export type GetEstateOccupationStatisticsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetEstateOccupationStatisticsQuery = {
  __typename?: 'Query';
  estate: {
    __typename?: 'EstateQueries';
    occupationStatistics: {
      __typename?: 'EstateOccupationStatisticsOutput';
      percentageIncreaseComparedToLastYear?: number | null;
      percentageIncreaseComparedToTwoYears?: number | null;
      lastMonth: Array<{
        __typename?: 'EstateOccupationMonthlyStatisticsOutput';
        averageTotalOccupiedEstatesCount: number;
        totalOccupiedEstatesCount: number;
        date: string;
      }>;
      lastYear: Array<{
        __typename?: 'EstateOccupationYearlyStatisticsOutput';
        averageTotalOccupiedEstatesCount: number;
        totalOccupiedEstatesCount: number;
        month: number;
      }>;
    };
  };
};

export const GetEstatesDocument = gql`
  query getEstates(
    $keepTopIds: [Int!]
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: EstateFilterInput
    $order: [EstateSortInput!]
  ) {
    estate {
      listEstates(
        keepTopIds: $keepTopIds
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
          ...EstateFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${EstateFragmentDoc}
  ${AsstAddressFragmentDoc}
  ${CityFragmentDoc}
  ${FloorFragmentDoc}
  ${StairFragmentDoc}
`;

export function useGetEstatesQuery(options?: Omit<Urql.UseQueryArgs<GetEstatesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetEstatesQuery, GetEstatesQueryVariables>({ query: GetEstatesDocument, ...options });
}
export const GetAllEstatesDocument = gql`
  query getAllEstates($where: EstateFilterInput, $order: [EstateSortInput!]) {
    estate {
      listEstatesFull(where: $where, order: $order) {
        ...EstateLightDtoFragment
      }
    }
  }
  ${EstateLightDtoFragmentDoc}
  ${UsageTypeFragmentDoc}
  ${AsstAddressFragmentDoc}
  ${CityFragmentDoc}
`;

export function useGetAllEstatesQuery(options?: Omit<Urql.UseQueryArgs<GetAllEstatesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllEstatesQuery, GetAllEstatesQueryVariables>({ query: GetAllEstatesDocument, ...options });
}
export const DeleteEstateDocument = gql`
  mutation deleteEstate($id: Int!) {
    estate {
      delete(estateId: $id) {
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

export function useDeleteEstateMutation() {
  return Urql.useMutation<DeleteEstateMutation, DeleteEstateMutationVariables>(DeleteEstateDocument);
}
export const DeleteEstatesDocument = gql`
  mutation deleteEstates($ids: [Int!]!) {
    estate {
      deleteRange(estateIds: $ids) {
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

export function useDeleteEstatesMutation() {
  return Urql.useMutation<DeleteEstatesMutation, DeleteEstatesMutationVariables>(DeleteEstatesDocument);
}
export const ExportEstatesDocument = gql`
  query exportEstates($where: EstateFilterInput, $order: [EstateSortInput!]) {
    estate {
      exportToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportEstatesQuery(options?: Omit<Urql.UseQueryArgs<ExportEstatesQueryVariables>, 'query'>) {
  return Urql.useQuery<ExportEstatesQuery, ExportEstatesQueryVariables>({ query: ExportEstatesDocument, ...options });
}
export const GetEstateInternalCodeDocument = gql`
  query getEstateInternalCode {
    estate {
      proposeNewInternalCode
    }
  }
`;

export function useGetEstateInternalCodeQuery(
  options?: Omit<Urql.UseQueryArgs<GetEstateInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetEstateInternalCodeQuery, GetEstateInternalCodeQueryVariables>({
    query: GetEstateInternalCodeDocument,
    ...options,
  });
}
export const CanUseEstateInternalCodeDocument = gql`
  query canUseEstateInternalCode($internalCode: String!, $currentEstateId: Int) {
    estate {
      canUseInternalCode(internalCode: $internalCode, currentEstateId: $currentEstateId)
    }
  }
`;

export function useCanUseEstateInternalCodeQuery(
  options: Omit<Urql.UseQueryArgs<CanUseEstateInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<CanUseEstateInternalCodeQuery, CanUseEstateInternalCodeQueryVariables>({
    query: CanUseEstateInternalCodeDocument,
    ...options,
  });
}
export const CreateEstateDocument = gql`
  mutation createEstate($estateInput: EstateInput!) {
    estate {
      addEstate(estateInput: $estateInput) {
        errors
        isSuccess
        validationErrors {
          ...ValidationErrorFragment
        }
        value {
          id
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
`;

export function useCreateEstateMutation() {
  return Urql.useMutation<CreateEstateMutation, CreateEstateMutationVariables>(CreateEstateDocument);
}
export const GetEstateDocument = gql`
  query getEstate($estateId: Int!) {
    estate {
      estate(estateId: $estateId) {
        ...EstateDetailFragment
      }
    }
  }
  ${EstateDetailFragmentDoc}
  ${AsstAddressFragmentDoc}
  ${CityFragmentDoc}
  ${FloorFragmentDoc}
  ${MainUsageTypeFragmentDoc}
  ${UsageTypeFragmentDoc}
  ${StairFragmentDoc}
  ${EstateTotalMarketValueFragmentDoc}
  ${ValuationFragmentDoc}
  ${RefactoringFragmentDoc}
`;

export function useGetEstateQuery(options: Omit<Urql.UseQueryArgs<GetEstateQueryVariables>, 'query'>) {
  return Urql.useQuery<GetEstateQuery, GetEstateQueryVariables>({ query: GetEstateDocument, ...options });
}
export const UpdateEstateDocument = gql`
  mutation updateEstate($estateId: Int!, $estateInput: EstateInput!) {
    estate {
      updateEstate(estateId: $estateId, estateInput: $estateInput) {
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

export function useUpdateEstateMutation() {
  return Urql.useMutation<UpdateEstateMutation, UpdateEstateMutationVariables>(UpdateEstateDocument);
}
export const GetEstateSurfacesDocument = gql`
  query getEstateSurfaces($estateId: Int!) {
    estate {
      surfaces(estateId: $estateId) {
        ...EstateSurfacesFragment
      }
    }
  }
  ${EstateSurfacesFragmentDoc}
`;

export function useGetEstateSurfacesQuery(options: Omit<Urql.UseQueryArgs<GetEstateSurfacesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetEstateSurfacesQuery, GetEstateSurfacesQueryVariables>({
    query: GetEstateSurfacesDocument,
    ...options,
  });
}
export const AddEstateDocumentsDocument = gql`
  mutation addEstateDocuments($estateId: Int!, $inputs: [DocumentInput!]!) {
    estate {
      document {
        addRange(estateId: $estateId, inputs: $inputs) {
          errors
          isSuccess
          validationErrors {
            ...ValidationErrorFragment
          }
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
`;

export function useAddEstateDocumentsMutation() {
  return Urql.useMutation<AddEstateDocumentsMutation, AddEstateDocumentsMutationVariables>(AddEstateDocumentsDocument);
}
export const DeleteEstateDocumentsDocument = gql`
  mutation deleteEstateDocuments($entityId: Int!, $cmisIds: [String!]!) {
    estate {
      document {
        deleteRange(estateId: $entityId, cmisIds: $cmisIds) {
          errors
          isSuccess
          validationErrors {
            ...ValidationErrorFragment
          }
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
`;

export function useDeleteEstateDocumentsMutation() {
  return Urql.useMutation<DeleteEstateDocumentsMutation, DeleteEstateDocumentsMutationVariables>(
    DeleteEstateDocumentsDocument,
  );
}
export const UpdateEstateDocumentDocument = gql`
  mutation updateEstateDocument($estateId: Int!, $input: DocumentInput!) {
    estate {
      document {
        update(estateId: $estateId, input: $input) {
          errors
          isSuccess
          validationErrors {
            ...ValidationErrorFragment
          }
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
`;

export function useUpdateEstateDocumentMutation() {
  return Urql.useMutation<UpdateEstateDocumentMutation, UpdateEstateDocumentMutationVariables>(
    UpdateEstateDocumentDocument,
  );
}
export const GetEstateDocumentsDocument = gql`
  query getEstateDocuments(
    $estateId: Int!
    $where: DocumentFilterInput
    $order: [DocumentsPerContentCategoryGroupOutputSortInput!]
  ) {
    estate {
      estate(estateId: $estateId) {
        documents(where: $where, order: $order) {
          ...DocumentsPerContentCategoryGroupOutputFragment
        }
      }
    }
  }
  ${DocumentsPerContentCategoryGroupOutputFragmentDoc}
  ${DocumentsPerContentCategoryOutputFragmentDoc}
  ${DocumentFragmentDoc}
`;

export function useGetEstateDocumentsQuery(
  options: Omit<Urql.UseQueryArgs<GetEstateDocumentsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetEstateDocumentsQuery, GetEstateDocumentsQueryVariables>({
    query: GetEstateDocumentsDocument,
    ...options,
  });
}
export const GetEstateImagesDocument = gql`
  query getEstateImages($estateId: Int!) {
    estate {
      estate(estateId: $estateId) {
        images {
          ...DocumentFragment
        }
      }
    }
  }
  ${DocumentFragmentDoc}
`;

export function useGetEstateImagesQuery(options: Omit<Urql.UseQueryArgs<GetEstateImagesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetEstateImagesQuery, GetEstateImagesQueryVariables>({
    query: GetEstateImagesDocument,
    ...options,
  });
}
export const ExportEstatePortfolioDocument = gql`
  query exportEstatePortfolio($estateId: Int!, $cmisIds: [String!]!) {
    estate {
      documents {
        exportPortfolioToZip(estateId: $estateId, cmisIds: $cmisIds) {
          errors
          isSuccess
          validationErrors {
            ...ValidationErrorFragment
          }
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
`;

export function useExportEstatePortfolioQuery(
  options: Omit<Urql.UseQueryArgs<ExportEstatePortfolioQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ExportEstatePortfolioQuery, ExportEstatePortfolioQueryVariables>({
    query: ExportEstatePortfolioDocument,
    ...options,
  });
}
export const GetEstateStatisticsDocument = gql`
  query getEstateStatistics {
    estate {
      statistics {
        ...EstateStatisticsOutputFragment
      }
    }
  }
  ${EstateStatisticsOutputFragmentDoc}
`;

export function useGetEstateStatisticsQuery(
  options?: Omit<Urql.UseQueryArgs<GetEstateStatisticsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetEstateStatisticsQuery, GetEstateStatisticsQueryVariables>({
    query: GetEstateStatisticsDocument,
    ...options,
  });
}
export const GetEstatesMapDocument = gql`
  query getEstatesMap {
    estate {
      locations {
        ...EstateLocationFragment
      }
    }
  }
  ${EstateLocationFragmentDoc}
`;

export function useGetEstatesMapQuery(options?: Omit<Urql.UseQueryArgs<GetEstatesMapQueryVariables>, 'query'>) {
  return Urql.useQuery<GetEstatesMapQuery, GetEstatesMapQueryVariables>({ query: GetEstatesMapDocument, ...options });
}
export const GetEstateOccupationStatisticsDocument = gql`
  query getEstateOccupationStatistics {
    estate {
      occupationStatistics {
        lastMonth {
          averageTotalOccupiedEstatesCount
          totalOccupiedEstatesCount
          date
        }
        lastYear {
          averageTotalOccupiedEstatesCount
          totalOccupiedEstatesCount
          month
        }
        percentageIncreaseComparedToLastYear
        percentageIncreaseComparedToTwoYears
      }
    }
  }
`;

export function useGetEstateOccupationStatisticsQuery(
  options?: Omit<Urql.UseQueryArgs<GetEstateOccupationStatisticsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetEstateOccupationStatisticsQuery, GetEstateOccupationStatisticsQueryVariables>({
    query: GetEstateOccupationStatisticsDocument,
    ...options,
  });
}
