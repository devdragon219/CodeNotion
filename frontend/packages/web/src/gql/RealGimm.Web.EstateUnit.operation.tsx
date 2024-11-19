// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { AsstAddressFragmentDoc } from './RealGimm.Web.AsstAddress.fragment';
import { CadastralCategoryFragmentDoc } from './RealGimm.Web.CadastralCategory.fragment';
import { CadastralCoordinatesFragmentDoc } from './RealGimm.Web.CadastralCoordinates.fragment';
import { CadastralLandCategoryFragmentDoc } from './RealGimm.Web.CadastralLandCategory.fragment';
import { EstateUnitCadastralUnitDetailFragmentDoc } from './RealGimm.Web.CadastralUnit.fragment';
import { CadastralUnitIncomeFragmentDoc } from './RealGimm.Web.CadastralUnitIncome.fragment';
import { CadastralUnitInspectionFragmentDoc } from './RealGimm.Web.CadastralUnitInspection.fragment';
import { CityFragmentDoc } from './RealGimm.Web.City.fragment';
import { DocumentFragmentDoc } from './RealGimm.Web.Document.fragment';
import { DocumentsPerContentCategoryGroupOutputFragmentDoc } from './RealGimm.Web.DocumentsPerContentCategoryGroupOutput.fragment';
import { DocumentsPerContentCategoryOutputFragmentDoc } from './RealGimm.Web.DocumentsPerContentCategoryOutput.fragment';
import { EstateDetailFragmentDoc, EstateFragmentDoc } from './RealGimm.Web.Estate.fragment';
import { EstateUnitDetailFragmentDoc, EstateUnitFragmentDoc } from './RealGimm.Web.EstateUnit.fragment';
import { EstateUnitDocumentsOutputFragmentDoc } from './RealGimm.Web.EstateUnitDocumentsOutput.fragment';
import { EstateUnitSurfaceSummaryFragmentDoc } from './RealGimm.Web.EstateUnitSurfaceSummary.fragment';
import { EstateUnitSurfaceSummaryFloorFragmentDoc } from './RealGimm.Web.EstateUnitSurfaceSummaryFloor.fragment';
import { EstateUnitSurfaceSummaryFloorSummaryFragmentDoc } from './RealGimm.Web.EstateUnitSurfaceSummaryFloorSummary.fragment';
import { EstateUnitTypeDistributionFragmentDoc } from './RealGimm.Web.EstateUnitTypeDistribution.fragment';
import { UsageTypeFragmentDoc } from './RealGimm.Web.EstateUsageType.fragment';
import { FloorFragmentDoc } from './RealGimm.Web.Floor.fragment';
import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { StairFragmentDoc } from './RealGimm.Web.Stair.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';

export type GetEstateUnitsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.EstateUnitFilterInput>;
  order?: Types.InputMaybe<Array<Types.EstateUnitSortInput> | Types.EstateUnitSortInput>;
}>;

export type GetEstateUnitsQuery = {
  __typename?: 'Query';
  estateUnit: {
    __typename?: 'EstateUnitQueries';
    listEstateUnits?: {
      __typename?: 'ListEstateUnitsConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
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
      }> | null;
    } | null;
  };
};

export type GetAllEstateUnitsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.EstateUnitFilterInput>;
  order?: Types.InputMaybe<Array<Types.EstateUnitSortInput> | Types.EstateUnitSortInput>;
}>;

export type GetAllEstateUnitsQuery = {
  __typename?: 'Query';
  estateUnit: {
    __typename?: 'EstateUnitQueries';
    listEstateUnitsFull: Array<{
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
  };
};

export type DeleteEstateUnitMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;

export type DeleteEstateUnitMutation = {
  __typename?: 'Mutation';
  estateUnit: {
    __typename?: 'EstateUnitMutations';
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

export type DeleteEstateUnitsMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeleteEstateUnitsMutation = {
  __typename?: 'Mutation';
  estateUnit: {
    __typename?: 'EstateUnitMutations';
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

export type ExportEstateUnitsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.EstateUnitFilterInput>;
  order?: Types.InputMaybe<Array<Types.EstateUnitSortInput> | Types.EstateUnitSortInput>;
}>;

export type ExportEstateUnitsQuery = {
  __typename?: 'Query';
  estateUnit: {
    __typename?: 'EstateUnitQueries';
    exportToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string };
  };
};

export type GetEstateUnitQueryVariables = Types.Exact<{
  estateUnitId: Types.Scalars['Int']['input'];
}>;

export type GetEstateUnitQuery = {
  __typename?: 'Query';
  estateUnit: {
    __typename?: 'EstateUnitQueries';
    estateUnit?: {
      __typename?: 'EstateUnit';
      id: number;
      name?: string | null;
      internalCode: string;
      externalCode?: string | null;
      type: Types.EstateUnitType;
      status: Types.EstateUnitStatus;
      disusedDate?: string | null;
      ownershipType: Types.EstateUnitOwnershipType;
      ownershipStartDate: string;
      ownershipEndDate?: string | null;
      ownershipPercent?: number | null;
      subNumbering?: string | null;
      sharedArea: boolean;
      notes?: string | null;
      netSurface?: number | null;
      grossSurface?: number | null;
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
      estate: {
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
      };
      floors: Array<{ __typename?: 'Floor'; id: number; name: string; position: number; templateReference: string }>;
      stair?: { __typename?: 'Stair'; id: number; description: string } | null;
      officialAct?: {
        __typename?: 'OfficialAct';
        id: number;
        protocolNumber: string;
        registrationNumber?: string | null;
        registrationDate?: string | null;
        issuerName?: string | null;
        actRegistrationFields: Array<{
          __typename?: 'ActRegistrationField';
          fieldType: Types.RegistrationFieldType;
          value?: string | null;
          id: number;
        }>;
        actRegistrationDates: Array<{
          __typename?: 'ActRegistrationDate';
          dateType: Types.RegistrationDateType;
          value: string;
          id: number;
        }>;
      } | null;
      lastRepossession?: {
        __typename?: 'Repossession';
        notes?: string | null;
        eventDate?: string | null;
        eventType?: Types.RepossessionType | null;
        eventReason?: Types.RepossessionReason | null;
        unitStatus?: Types.UnitCondition | null;
        isAssignable?: boolean | null;
        isKeysReturned?: boolean | null;
        isWithValuables?: boolean | null;
        id: number;
      } | null;
      surfacesTree: Array<{
        __typename?: 'EstateUnitSurfaceSummary';
        surfaceId?: number | null;
        metric: Types.SurfaceMeasurementMetric;
        surfaceSqMTotal?: number | null;
        surfaceSqMCommonArea?: number | null;
        surfaceSqMSideArea?: number | null;
        floors: Array<{
          __typename?: 'EstateUnitSurfaceSummaryFloor';
          surfaceId?: number | null;
          surfaceSqMTotal?: number | null;
          surfaceSqMCommonArea?: number | null;
          surfaceSqMSideArea?: number | null;
          floor: {
            __typename?: 'EstateUnitSurfaceSummaryFloorSummary';
            id?: number | null;
            name?: string | null;
            position: number;
            templateReference?: string | null;
          };
          functionAreas: Array<{
            __typename?: 'EstateUnitSurfaceSummaryFunctionArea';
            surfaceId?: number | null;
            surfaceSqMTotal?: number | null;
            surfaceSqMCommonArea?: number | null;
            surfaceSqMSideArea?: number | null;
            functionArea: {
              __typename?: 'EstateUnitSurfaceSummaryFunctionAreaSummary';
              id?: number | null;
              name?: string | null;
              surfaceType: Types.SurfaceType;
            };
          }>;
        }>;
      }>;
      currentCadastralUnit?: {
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
    } | null;
  };
};

export type GetEstateUnitInternalCodeQueryVariables = Types.Exact<{
  estateId: Types.Scalars['Int']['input'];
}>;

export type GetEstateUnitInternalCodeQuery = {
  __typename?: 'Query';
  estateUnit: { __typename?: 'EstateUnitQueries'; proposeNewInternalCode?: string | null };
};

export type CreateEstateUnitMutationVariables = Types.Exact<{
  estateUnitInput: Types.EstateUnitInput;
}>;

export type CreateEstateUnitMutation = {
  __typename?: 'Mutation';
  estateUnit: {
    __typename?: 'EstateUnitMutations';
    add: {
      __typename?: 'ResultOfEstateUnit';
      errors?: Array<string | null> | null;
      isSuccess: boolean;
      validationErrors?: Array<{
        __typename?: 'ValidationError';
        identifier?: string | null;
        errorMessage?: string | null;
        errorCode?: string | null;
        severity: Types.ValidationSeverity;
      } | null> | null;
      value?: { __typename?: 'EstateUnit'; id: number } | null;
    };
  };
};

export type UpdateEstateUnitMutationVariables = Types.Exact<{
  estateUnitId: Types.Scalars['Int']['input'];
  estateUnitInput: Types.EstateUnitInput;
}>;

export type UpdateEstateUnitMutation = {
  __typename?: 'Mutation';
  estateUnit: {
    __typename?: 'EstateUnitMutations';
    update: {
      __typename?: 'ResultOfEstateUnit';
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

export type GetEstateUnitInternalCodeByAlreadyInUseInternalCodesQueryVariables = Types.Exact<{
  estateId: Types.Scalars['Int']['input'];
  alreadyInUseInternalCodes: Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input'];
}>;

export type GetEstateUnitInternalCodeByAlreadyInUseInternalCodesQuery = {
  __typename?: 'Query';
  estateUnit: { __typename?: 'EstateUnitQueries'; proposeNewInternalCodeExceptOccupied: string };
};

export type MergeEstateUnitsMutationVariables = Types.Exact<{
  estateUnitIds: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
  estateUnitInput: Types.EstateUnitInput;
}>;

export type MergeEstateUnitsMutation = {
  __typename?: 'Mutation';
  estateUnit: {
    __typename?: 'EstateUnitMutations';
    merge: {
      __typename?: 'ResultOfEstateUnit';
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

export type SplitEstateUnitMutationVariables = Types.Exact<{
  estateUnitId: Types.Scalars['Int']['input'];
  estateUnitInputs: Array<Types.EstateUnitInput> | Types.EstateUnitInput;
}>;

export type SplitEstateUnitMutation = {
  __typename?: 'Mutation';
  estateUnit: {
    __typename?: 'EstateUnitMutations';
    split: {
      __typename?: 'ResultOfEstateUnit__';
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

export type TransformEstateUnitMutationVariables = Types.Exact<{
  estateUnitId: Types.Scalars['Int']['input'];
  estateUnitInput: Types.EstateUnitInput;
}>;

export type TransformEstateUnitMutation = {
  __typename?: 'Mutation';
  estateUnit: {
    __typename?: 'EstateUnitMutations';
    transform: {
      __typename?: 'ResultOfEstateUnit';
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

export type AddEstateUnitDocumentsMutationVariables = Types.Exact<{
  estateUnitId: Types.Scalars['Int']['input'];
  inputs: Array<Types.DocumentInput> | Types.DocumentInput;
}>;

export type AddEstateUnitDocumentsMutation = {
  __typename?: 'Mutation';
  estateUnit: {
    __typename?: 'EstateUnitMutations';
    document: {
      __typename?: 'EstateUnitDocumentMutations';
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

export type DeleteEstateUnitDocumentsMutationVariables = Types.Exact<{
  entityId: Types.Scalars['Int']['input'];
  cmisIds: Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input'];
}>;

export type DeleteEstateUnitDocumentsMutation = {
  __typename?: 'Mutation';
  estateUnit: {
    __typename?: 'EstateUnitMutations';
    document: {
      __typename?: 'EstateUnitDocumentMutations';
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

export type UpdateEstateUnitDocumentMutationVariables = Types.Exact<{
  estateUnitId: Types.Scalars['Int']['input'];
  input: Types.DocumentInput;
}>;

export type UpdateEstateUnitDocumentMutation = {
  __typename?: 'Mutation';
  estateUnit: {
    __typename?: 'EstateUnitMutations';
    document: {
      __typename?: 'EstateUnitDocumentMutations';
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

export type GetEstateUnitDocumentsQueryVariables = Types.Exact<{
  estateUnitId: Types.Scalars['Int']['input'];
  where?: Types.InputMaybe<Types.DocumentFilterInput>;
  order?: Types.InputMaybe<
    Array<Types.DocumentsPerContentCategoryGroupOutputSortInput> | Types.DocumentsPerContentCategoryGroupOutputSortInput
  >;
}>;

export type GetEstateUnitDocumentsQuery = {
  __typename?: 'Query';
  estateUnit: {
    __typename?: 'EstateUnitQueries';
    estateUnit?: {
      __typename?: 'EstateUnit';
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

export type GetEstateUnitsDocumentsQueryVariables = Types.Exact<{
  estateUnitIds: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
  where?: Types.InputMaybe<Types.EstateUnitDocumentsFlatOutputFilterInput>;
  order?: Types.InputMaybe<Array<Types.EstateUnitDocumentsOutputSortInput> | Types.EstateUnitDocumentsOutputSortInput>;
}>;

export type GetEstateUnitsDocumentsQuery = {
  __typename?: 'Query';
  estateUnit: {
    __typename?: 'EstateUnitQueries';
    documents: {
      __typename?: 'EstateUnitDocumentQueries';
      listDocuments: Array<{
        __typename?: 'EstateUnitDocumentsOutput';
        estateUnitInternalCode: string;
        guid: string;
        subRows: Array<{
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
      }>;
    };
  };
};

export type GetEstateUnitTypeDistributionQueryVariables = Types.Exact<{
  showAll: Types.Scalars['Boolean']['input'];
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.EstateUnitTypeDistributionFilterInput>;
  order?: Types.InputMaybe<
    Array<Types.EstateUnitTypeDistributionSortInput> | Types.EstateUnitTypeDistributionSortInput
  >;
}>;

export type GetEstateUnitTypeDistributionQuery = {
  __typename?: 'Query';
  estateUnit: {
    __typename?: 'EstateUnitQueries';
    estateUnitTypeDistribution?: {
      __typename?: 'EstateUnitTypeDistributionConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'EstateUnitTypeDistribution';
        percentage: number;
        estateUnitType: Types.EstateUnitType;
      }> | null;
    } | null;
  };
};

export const GetEstateUnitsDocument = gql`
  query getEstateUnits(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: EstateUnitFilterInput
    $order: [EstateUnitSortInput!]
  ) {
    estateUnit {
      listEstateUnits(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...EstateUnitFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${EstateUnitFragmentDoc}
  ${AsstAddressFragmentDoc}
  ${CityFragmentDoc}
  ${StairFragmentDoc}
  ${FloorFragmentDoc}
  ${CadastralCoordinatesFragmentDoc}
`;

export function useGetEstateUnitsQuery(options?: Omit<Urql.UseQueryArgs<GetEstateUnitsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetEstateUnitsQuery, GetEstateUnitsQueryVariables>({
    query: GetEstateUnitsDocument,
    ...options,
  });
}
export const GetAllEstateUnitsDocument = gql`
  query getAllEstateUnits($where: EstateUnitFilterInput, $order: [EstateUnitSortInput!]) {
    estateUnit {
      listEstateUnitsFull(where: $where, order: $order) {
        ...EstateUnitFragment
      }
    }
  }
  ${EstateUnitFragmentDoc}
  ${AsstAddressFragmentDoc}
  ${CityFragmentDoc}
  ${StairFragmentDoc}
  ${FloorFragmentDoc}
  ${CadastralCoordinatesFragmentDoc}
`;

export function useGetAllEstateUnitsQuery(options?: Omit<Urql.UseQueryArgs<GetAllEstateUnitsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllEstateUnitsQuery, GetAllEstateUnitsQueryVariables>({
    query: GetAllEstateUnitsDocument,
    ...options,
  });
}
export const DeleteEstateUnitDocument = gql`
  mutation deleteEstateUnit($id: Int!) {
    estateUnit {
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

export function useDeleteEstateUnitMutation() {
  return Urql.useMutation<DeleteEstateUnitMutation, DeleteEstateUnitMutationVariables>(DeleteEstateUnitDocument);
}
export const DeleteEstateUnitsDocument = gql`
  mutation deleteEstateUnits($ids: [Int!]!) {
    estateUnit {
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

export function useDeleteEstateUnitsMutation() {
  return Urql.useMutation<DeleteEstateUnitsMutation, DeleteEstateUnitsMutationVariables>(DeleteEstateUnitsDocument);
}
export const ExportEstateUnitsDocument = gql`
  query exportEstateUnits($where: EstateUnitFilterInput, $order: [EstateUnitSortInput!]) {
    estateUnit {
      exportToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportEstateUnitsQuery(options?: Omit<Urql.UseQueryArgs<ExportEstateUnitsQueryVariables>, 'query'>) {
  return Urql.useQuery<ExportEstateUnitsQuery, ExportEstateUnitsQueryVariables>({
    query: ExportEstateUnitsDocument,
    ...options,
  });
}
export const GetEstateUnitDocument = gql`
  query getEstateUnit($estateUnitId: Int!) {
    estateUnit {
      estateUnit(estateUnitId: $estateUnitId) {
        ...EstateUnitDetailFragment
      }
    }
  }
  ${EstateUnitDetailFragmentDoc}
  ${UsageTypeFragmentDoc}
  ${AsstAddressFragmentDoc}
  ${CityFragmentDoc}
  ${EstateFragmentDoc}
  ${FloorFragmentDoc}
  ${StairFragmentDoc}
  ${EstateUnitSurfaceSummaryFragmentDoc}
  ${EstateUnitSurfaceSummaryFloorFragmentDoc}
  ${EstateUnitSurfaceSummaryFloorSummaryFragmentDoc}
  ${EstateUnitCadastralUnitDetailFragmentDoc}
  ${CadastralCoordinatesFragmentDoc}
  ${CadastralUnitInspectionFragmentDoc}
  ${CadastralUnitIncomeFragmentDoc}
  ${CadastralCategoryFragmentDoc}
  ${CadastralLandCategoryFragmentDoc}
`;

export function useGetEstateUnitQuery(options: Omit<Urql.UseQueryArgs<GetEstateUnitQueryVariables>, 'query'>) {
  return Urql.useQuery<GetEstateUnitQuery, GetEstateUnitQueryVariables>({ query: GetEstateUnitDocument, ...options });
}
export const GetEstateUnitInternalCodeDocument = gql`
  query getEstateUnitInternalCode($estateId: Int!) {
    estateUnit {
      proposeNewInternalCode(parentEstateId: $estateId)
    }
  }
`;

export function useGetEstateUnitInternalCodeQuery(
  options: Omit<Urql.UseQueryArgs<GetEstateUnitInternalCodeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetEstateUnitInternalCodeQuery, GetEstateUnitInternalCodeQueryVariables>({
    query: GetEstateUnitInternalCodeDocument,
    ...options,
  });
}
export const CreateEstateUnitDocument = gql`
  mutation createEstateUnit($estateUnitInput: EstateUnitInput!) {
    estateUnit {
      add(input: $estateUnitInput) {
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

export function useCreateEstateUnitMutation() {
  return Urql.useMutation<CreateEstateUnitMutation, CreateEstateUnitMutationVariables>(CreateEstateUnitDocument);
}
export const UpdateEstateUnitDocument = gql`
  mutation updateEstateUnit($estateUnitId: Int!, $estateUnitInput: EstateUnitInput!) {
    estateUnit {
      update(id: $estateUnitId, input: $estateUnitInput) {
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

export function useUpdateEstateUnitMutation() {
  return Urql.useMutation<UpdateEstateUnitMutation, UpdateEstateUnitMutationVariables>(UpdateEstateUnitDocument);
}
export const GetEstateUnitInternalCodeByAlreadyInUseInternalCodesDocument = gql`
  query getEstateUnitInternalCodeByAlreadyInUseInternalCodes($estateId: Int!, $alreadyInUseInternalCodes: [String!]!) {
    estateUnit {
      proposeNewInternalCodeExceptOccupied(parentId: $estateId, additionallyOccupiedCodes: $alreadyInUseInternalCodes)
    }
  }
`;

export function useGetEstateUnitInternalCodeByAlreadyInUseInternalCodesQuery(
  options: Omit<Urql.UseQueryArgs<GetEstateUnitInternalCodeByAlreadyInUseInternalCodesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<
    GetEstateUnitInternalCodeByAlreadyInUseInternalCodesQuery,
    GetEstateUnitInternalCodeByAlreadyInUseInternalCodesQueryVariables
  >({ query: GetEstateUnitInternalCodeByAlreadyInUseInternalCodesDocument, ...options });
}
export const MergeEstateUnitsDocument = gql`
  mutation mergeEstateUnits($estateUnitIds: [Int!]!, $estateUnitInput: EstateUnitInput!) {
    estateUnit {
      merge(ids: $estateUnitIds, input: $estateUnitInput) {
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

export function useMergeEstateUnitsMutation() {
  return Urql.useMutation<MergeEstateUnitsMutation, MergeEstateUnitsMutationVariables>(MergeEstateUnitsDocument);
}
export const SplitEstateUnitDocument = gql`
  mutation splitEstateUnit($estateUnitId: Int!, $estateUnitInputs: [EstateUnitInput!]!) {
    estateUnit {
      split(id: $estateUnitId, inputs: $estateUnitInputs) {
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

export function useSplitEstateUnitMutation() {
  return Urql.useMutation<SplitEstateUnitMutation, SplitEstateUnitMutationVariables>(SplitEstateUnitDocument);
}
export const TransformEstateUnitDocument = gql`
  mutation transformEstateUnit($estateUnitId: Int!, $estateUnitInput: EstateUnitInput!) {
    estateUnit {
      transform(id: $estateUnitId, input: $estateUnitInput) {
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

export function useTransformEstateUnitMutation() {
  return Urql.useMutation<TransformEstateUnitMutation, TransformEstateUnitMutationVariables>(
    TransformEstateUnitDocument,
  );
}
export const AddEstateUnitDocumentsDocument = gql`
  mutation addEstateUnitDocuments($estateUnitId: Int!, $inputs: [DocumentInput!]!) {
    estateUnit {
      document {
        addRange(estateUnitId: $estateUnitId, inputs: $inputs) {
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

export function useAddEstateUnitDocumentsMutation() {
  return Urql.useMutation<AddEstateUnitDocumentsMutation, AddEstateUnitDocumentsMutationVariables>(
    AddEstateUnitDocumentsDocument,
  );
}
export const DeleteEstateUnitDocumentsDocument = gql`
  mutation deleteEstateUnitDocuments($entityId: Int!, $cmisIds: [String!]!) {
    estateUnit {
      document {
        deleteRange(estateUnitId: $entityId, cmisIds: $cmisIds) {
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

export function useDeleteEstateUnitDocumentsMutation() {
  return Urql.useMutation<DeleteEstateUnitDocumentsMutation, DeleteEstateUnitDocumentsMutationVariables>(
    DeleteEstateUnitDocumentsDocument,
  );
}
export const UpdateEstateUnitDocumentDocument = gql`
  mutation updateEstateUnitDocument($estateUnitId: Int!, $input: DocumentInput!) {
    estateUnit {
      document {
        update(estateUnitId: $estateUnitId, input: $input) {
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

export function useUpdateEstateUnitDocumentMutation() {
  return Urql.useMutation<UpdateEstateUnitDocumentMutation, UpdateEstateUnitDocumentMutationVariables>(
    UpdateEstateUnitDocumentDocument,
  );
}
export const GetEstateUnitDocumentsDocument = gql`
  query getEstateUnitDocuments(
    $estateUnitId: Int!
    $where: DocumentFilterInput
    $order: [DocumentsPerContentCategoryGroupOutputSortInput!]
  ) {
    estateUnit {
      estateUnit(estateUnitId: $estateUnitId) {
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

export function useGetEstateUnitDocumentsQuery(
  options: Omit<Urql.UseQueryArgs<GetEstateUnitDocumentsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetEstateUnitDocumentsQuery, GetEstateUnitDocumentsQueryVariables>({
    query: GetEstateUnitDocumentsDocument,
    ...options,
  });
}
export const GetEstateUnitsDocumentsDocument = gql`
  query getEstateUnitsDocuments(
    $estateUnitIds: [Int!]!
    $where: EstateUnitDocumentsFlatOutputFilterInput
    $order: [EstateUnitDocumentsOutputSortInput!]
  ) {
    estateUnit {
      documents {
        listDocuments(estateUnitIds: $estateUnitIds, where: $where, order: $order) {
          ...EstateUnitDocumentsOutputFragment
        }
      }
    }
  }
  ${EstateUnitDocumentsOutputFragmentDoc}
  ${DocumentsPerContentCategoryGroupOutputFragmentDoc}
  ${DocumentsPerContentCategoryOutputFragmentDoc}
  ${DocumentFragmentDoc}
`;

export function useGetEstateUnitsDocumentsQuery(
  options: Omit<Urql.UseQueryArgs<GetEstateUnitsDocumentsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetEstateUnitsDocumentsQuery, GetEstateUnitsDocumentsQueryVariables>({
    query: GetEstateUnitsDocumentsDocument,
    ...options,
  });
}
export const GetEstateUnitTypeDistributionDocument = gql`
  query getEstateUnitTypeDistribution(
    $showAll: Boolean!
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: EstateUnitTypeDistributionFilterInput
    $order: [EstateUnitTypeDistributionSortInput!]
  ) {
    estateUnit {
      estateUnitTypeDistribution(
        showAll: $showAll
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
          ...EstateUnitTypeDistributionFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${EstateUnitTypeDistributionFragmentDoc}
`;

export function useGetEstateUnitTypeDistributionQuery(
  options: Omit<Urql.UseQueryArgs<GetEstateUnitTypeDistributionQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetEstateUnitTypeDistributionQuery, GetEstateUnitTypeDistributionQueryVariables>({
    query: GetEstateUnitTypeDistributionDocument,
    ...options,
  });
}
