// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { AsstAddressFragmentDoc } from './RealGimm.Web.AsstAddress.fragment';
import { CadastralCoordinatesFragmentDoc } from './RealGimm.Web.CadastralCoordinates.fragment';
import { CityFragmentDoc } from './RealGimm.Web.City.fragment';
import { CostChargeDetailFragmentDoc, CostChargeFragmentDoc } from './RealGimm.Web.CostCharge.fragment';
import { CostChargeAnalysisFragmentDoc } from './RealGimm.Web.CostChargeAnalysis.fragment';
import { CostChargeAnalysisValueFragmentDoc } from './RealGimm.Web.CostChargeAnalysisValue.fragment';
import { CostChargeConsumptionFragmentDoc } from './RealGimm.Web.CostChargeConsumption.fragment';
import { CostChargeFieldFragmentDoc } from './RealGimm.Web.CostChargeField.fragment';
import { UsageTypeFragmentDoc } from './RealGimm.Web.EstateUsageType.fragment';
import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { ReadingValueFragmentDoc } from './RealGimm.Web.ReadingValue.fragment';
import { UtilityChargeFieldFragmentDoc } from './RealGimm.Web.UtilityChargeField.fragment';
import { UtilityServiceDetailFragmentDoc, UtilityServiceFragmentDoc } from './RealGimm.Web.UtilityService.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';

export type GetCostChargesQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.CostChargeFilterInput>;
  order?: Types.InputMaybe<Array<Types.CostChargeSortInput> | Types.CostChargeSortInput>;
}>;

export type GetCostChargesQuery = {
  __typename?: 'Query';
  costCharge: {
    __typename?: 'CostChargeQueries';
    listCostCharges?: {
      __typename?: 'ListCostChargesConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'CostCharge';
        id: number;
        referenceDate: string;
        totalAmount: number;
        periodStart: string;
        periodEnd: string;
        dueDate: string;
        invoiceNumber: string;
        totalVATAmount: number;
        invoicedConsumptionAmount: number;
        actualConsumption?: { __typename?: 'CostChargeConsumption'; since: string; until: string } | null;
        expectedConsumption?: { __typename?: 'CostChargeConsumption'; since: string; until: string } | null;
        service: {
          __typename?: 'UtilityService';
          estateIds: Array<number>;
          estateUnitIds: Array<number>;
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
          utilityType: {
            __typename?: 'UtilityType';
            internalCode: string;
            description: string;
            measurementUnit: string;
          };
        };
      }> | null;
    } | null;
  };
};

export type GetCostChargeQueryVariables = Types.Exact<{
  costChargeId: Types.Scalars['Int']['input'];
}>;

export type GetCostChargeQuery = {
  __typename?: 'Query';
  costCharge: {
    __typename?: 'CostChargeQueries';
    get?: {
      __typename?: 'CostCharge';
      totalAmount: number;
      referenceDate: string;
      dueDate: string;
      invoiceNumber: string;
      totalVATAmount: number;
      periodStart: string;
      periodEnd: string;
      invoicedConsumptionAmount: number;
      id: number;
      service: {
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
      };
      actualConsumption?: {
        __typename?: 'CostChargeConsumption';
        since: string;
        until: string;
        values: Array<{ __typename?: 'ReadingValue'; touRateIndex: number; value?: number | null; id: number }>;
      } | null;
      expectedConsumption?: {
        __typename?: 'CostChargeConsumption';
        since: string;
        until: string;
        values: Array<{ __typename?: 'ReadingValue'; touRateIndex: number; value?: number | null; id: number }>;
      } | null;
      fields: Array<{
        __typename?: 'CostChargeField';
        name: string;
        isMandatory: boolean;
        templateTypeId: string;
        type: Types.CustomFieldType;
        value?: string | null;
      }>;
    } | null;
  };
};

export type ExportCostChargesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.CostChargeFilterInput>;
  order?: Types.InputMaybe<Array<Types.CostChargeSortInput> | Types.CostChargeSortInput>;
}>;

export type ExportCostChargesQuery = {
  __typename?: 'Query';
  costCharge: {
    __typename?: 'CostChargeQueries';
    exportToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string };
  };
};

export type CreateCostChargeMutationVariables = Types.Exact<{
  costChargeInput: Types.CostChargeInput;
}>;

export type CreateCostChargeMutation = {
  __typename?: 'Mutation';
  costCharge: {
    __typename?: 'CostChargeMutations';
    add: {
      __typename?: 'ResultOfCostCharge';
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

export type UpdateCostChargeMutationVariables = Types.Exact<{
  costChargeId: Types.Scalars['Int']['input'];
  costChargeInput: Types.CostChargeInput;
}>;

export type UpdateCostChargeMutation = {
  __typename?: 'Mutation';
  costCharge: {
    __typename?: 'CostChargeMutations';
    update: {
      __typename?: 'ResultOfCostCharge';
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

export type DeleteCostChargeMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;

export type DeleteCostChargeMutation = {
  __typename?: 'Mutation';
  costCharge: {
    __typename?: 'CostChargeMutations';
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

export type DeleteCostChargesMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeleteCostChargesMutation = {
  __typename?: 'Mutation';
  costCharge: {
    __typename?: 'CostChargeMutations';
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

export type GetCostChargeFilteredEstatesQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.CostChargeAnalysisFiltersInput>;
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.EstateFilterInput>;
  order?: Types.InputMaybe<Array<Types.EstateSortInput> | Types.EstateSortInput>;
}>;

export type GetCostChargeFilteredEstatesQuery = {
  __typename?: 'Query';
  costCharge: {
    __typename?: 'CostChargeQueries';
    filteredEstates?: {
      __typename?: 'FilteredEstatesConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{ __typename?: 'Estate'; id: number; internalCode: string }> | null;
    } | null;
  };
};

export type GetCostChargeFilteredAddressesQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.CostChargeAnalysisFiltersInput>;
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.AsstAddressFilterInput>;
  order?: Types.InputMaybe<Array<Types.AsstAddressSortInput> | Types.AsstAddressSortInput>;
}>;

export type GetCostChargeFilteredAddressesQuery = {
  __typename?: 'Query';
  costCharge: {
    __typename?: 'CostChargeQueries';
    filteredAddresses?: {
      __typename?: 'FilteredAddressesConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'AsstAddress';
        id: number;
        cityName?: string | null;
        countyName?: string | null;
        toponymy?: string | null;
        numbering?: string | null;
      }> | null;
    } | null;
  };
};

export type GetCostChargeFilteredCityNamesQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.CostChargeAnalysisFiltersInput>;
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.FilteredCityNameFilterInput>;
  order?: Types.InputMaybe<Array<Types.FilteredCityNameSortInput> | Types.FilteredCityNameSortInput>;
}>;

export type GetCostChargeFilteredCityNamesQuery = {
  __typename?: 'Query';
  costCharge: {
    __typename?: 'CostChargeQueries';
    filteredCityNames?: {
      __typename?: 'FilteredCityNamesConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{ __typename?: 'FilteredCityName'; value: string }> | null;
    } | null;
  };
};

export type GetCostChargeFilteredCountyNamesQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.CostChargeAnalysisFiltersInput>;
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.FilteredCountyNameFilterInput>;
  order?: Types.InputMaybe<Array<Types.FilteredCountyNameSortInput> | Types.FilteredCountyNameSortInput>;
}>;

export type GetCostChargeFilteredCountyNamesQuery = {
  __typename?: 'Query';
  costCharge: {
    __typename?: 'CostChargeQueries';
    filteredCountyNames?: {
      __typename?: 'FilteredCountyNamesConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{ __typename?: 'FilteredCountyName'; value: string }> | null;
    } | null;
  };
};

export type GetCostChargeFilteredUtilityTypesQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.CostChargeAnalysisFiltersInput>;
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.UtilityTypeFilterInput>;
  order?: Types.InputMaybe<Array<Types.UtilityTypeSortInput> | Types.UtilityTypeSortInput>;
}>;

export type GetCostChargeFilteredUtilityTypesQuery = {
  __typename?: 'Query';
  costCharge: {
    __typename?: 'CostChargeQueries';
    filteredUtilityTypes?: {
      __typename?: 'FilteredUtilityTypesConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{ __typename?: 'UtilityType'; id: number; internalCode: string; description: string }> | null;
    } | null;
  };
};

export type GetCostChargeFilteredUtilityServicesQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.CostChargeAnalysisFiltersInput>;
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.UtilityServiceFilterInput>;
  order?: Types.InputMaybe<Array<Types.UtilityServiceSortInput> | Types.UtilityServiceSortInput>;
}>;

export type GetCostChargeFilteredUtilityServicesQuery = {
  __typename?: 'Query';
  costCharge: {
    __typename?: 'CostChargeQueries';
    filteredUtilityServices?: {
      __typename?: 'FilteredUtilityServicesConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{ __typename?: 'UtilityService'; id: number; utilityContractCode: string }> | null;
    } | null;
  };
};

export type GetCostChargeAnalysisQueryVariables = Types.Exact<{
  filters: Types.CostChargeAnalysisFiltersInput;
}>;

export type GetCostChargeAnalysisQuery = {
  __typename?: 'Query';
  costCharge: {
    __typename?: 'CostChargeQueries';
    analysis: Array<{
      __typename?: 'KeyValuePairOfCostChargeAnalysisCategoryAndCostChargeAnalysis';
      key: Types.CostChargeAnalysisCategory;
      value: {
        __typename?: 'CostChargeAnalysis';
        measurementUnit: string;
        surface: {
          __typename?: 'CostChargeAnalysisSurface';
          currentYear?: { __typename?: 'CostChargeAnalysisSurfaceValue'; area: number; date: string } | null;
          previousYear?: { __typename?: 'CostChargeAnalysisSurfaceValue'; area: number; date: string } | null;
        };
        consumption: {
          __typename?: 'CostChargeAnalysisConsumption';
          currentYearValue: number;
          previousYearValue: number;
          difference: number;
          differencePercentage?: number | null;
        };
        cost: {
          __typename?: 'CostChargeAnalysisCost';
          currentYearValue: number;
          previousYearValue: number;
          difference: number;
          differencePercentage?: number | null;
        };
        perYear: Array<{
          __typename?: 'KeyValuePairOfInt32AndCostChargeYearlyAnalysis';
          key: number;
          value: {
            __typename?: 'CostChargeYearlyAnalysis';
            value: {
              __typename?: 'CostChargeAnalysisValue';
              totalConsumption: number;
              consumptionPerGrossSurface?: number | null;
              consumptionPerHeatingCoolingSurface?: number | null;
              totalCost: number;
              costPerGrossSurface?: number | null;
              costPerHeatingCoolingSurface?: number | null;
            };
            perMonth?: Array<{
              __typename?: 'KeyValuePairOfInt32AndCostChargeAnalysisValue';
              key: number;
              value: {
                __typename?: 'CostChargeAnalysisValue';
                totalConsumption: number;
                consumptionPerGrossSurface?: number | null;
                consumptionPerHeatingCoolingSurface?: number | null;
                totalCost: number;
                costPerGrossSurface?: number | null;
                costPerHeatingCoolingSurface?: number | null;
              };
            }> | null;
          };
        }>;
      };
    }>;
  };
};

export type GetCostChargeCsvImportTemplateQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetCostChargeCsvImportTemplateQuery = {
  __typename?: 'Query';
  costCharge: {
    __typename?: 'CostChargeQueries';
    templateOfImportFromCsv: { __typename?: 'FileUrlOutput'; resourceUrl: string };
  };
};

export type GetCostChargeExcelImportTemplateQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetCostChargeExcelImportTemplateQuery = {
  __typename?: 'Query';
  costCharge: {
    __typename?: 'CostChargeQueries';
    templateOfImportFromExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string };
  };
};

export type ImportCostChargesMutationVariables = Types.Exact<{
  file: Types.Scalars['Upload']['input'];
}>;

export type ImportCostChargesMutation = {
  __typename?: 'Mutation';
  costCharge: {
    __typename?: 'CostChargeMutations';
    import: {
      __typename?: 'ResultOfInt32';
      errors?: Array<string | null> | null;
      isSuccess: boolean;
      value: number;
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

export const GetCostChargesDocument = gql`
  query getCostCharges(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: CostChargeFilterInput
    $order: [CostChargeSortInput!]
  ) {
    costCharge {
      listCostCharges(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...CostChargeFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${CostChargeFragmentDoc}
  ${UsageTypeFragmentDoc}
  ${AsstAddressFragmentDoc}
  ${CityFragmentDoc}
  ${CadastralCoordinatesFragmentDoc}
`;

export function useGetCostChargesQuery(options?: Omit<Urql.UseQueryArgs<GetCostChargesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCostChargesQuery, GetCostChargesQueryVariables>({
    query: GetCostChargesDocument,
    ...options,
  });
}
export const GetCostChargeDocument = gql`
  query getCostCharge($costChargeId: Int!) {
    costCharge {
      get(id: $costChargeId) {
        ...CostChargeDetailFragment
      }
    }
  }
  ${CostChargeDetailFragmentDoc}
  ${UtilityServiceFragmentDoc}
  ${UtilityChargeFieldFragmentDoc}
  ${AsstAddressFragmentDoc}
  ${CityFragmentDoc}
  ${CadastralCoordinatesFragmentDoc}
  ${CostChargeConsumptionFragmentDoc}
  ${ReadingValueFragmentDoc}
  ${CostChargeFieldFragmentDoc}
`;

export function useGetCostChargeQuery(options: Omit<Urql.UseQueryArgs<GetCostChargeQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCostChargeQuery, GetCostChargeQueryVariables>({ query: GetCostChargeDocument, ...options });
}
export const ExportCostChargesDocument = gql`
  query exportCostCharges($where: CostChargeFilterInput, $order: [CostChargeSortInput!]) {
    costCharge {
      exportToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportCostChargesQuery(options?: Omit<Urql.UseQueryArgs<ExportCostChargesQueryVariables>, 'query'>) {
  return Urql.useQuery<ExportCostChargesQuery, ExportCostChargesQueryVariables>({
    query: ExportCostChargesDocument,
    ...options,
  });
}
export const CreateCostChargeDocument = gql`
  mutation createCostCharge($costChargeInput: CostChargeInput!) {
    costCharge {
      add(input: $costChargeInput) {
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

export function useCreateCostChargeMutation() {
  return Urql.useMutation<CreateCostChargeMutation, CreateCostChargeMutationVariables>(CreateCostChargeDocument);
}
export const UpdateCostChargeDocument = gql`
  mutation updateCostCharge($costChargeId: Int!, $costChargeInput: CostChargeInput!) {
    costCharge {
      update(id: $costChargeId, input: $costChargeInput) {
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

export function useUpdateCostChargeMutation() {
  return Urql.useMutation<UpdateCostChargeMutation, UpdateCostChargeMutationVariables>(UpdateCostChargeDocument);
}
export const DeleteCostChargeDocument = gql`
  mutation deleteCostCharge($id: Int!) {
    costCharge {
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

export function useDeleteCostChargeMutation() {
  return Urql.useMutation<DeleteCostChargeMutation, DeleteCostChargeMutationVariables>(DeleteCostChargeDocument);
}
export const DeleteCostChargesDocument = gql`
  mutation deleteCostCharges($ids: [Int!]!) {
    costCharge {
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

export function useDeleteCostChargesMutation() {
  return Urql.useMutation<DeleteCostChargesMutation, DeleteCostChargesMutationVariables>(DeleteCostChargesDocument);
}
export const GetCostChargeFilteredEstatesDocument = gql`
  query getCostChargeFilteredEstates(
    $filters: CostChargeAnalysisFiltersInput
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: EstateFilterInput
    $order: [EstateSortInput!]
  ) {
    costCharge {
      filteredEstates(
        filters: $filters
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
          id
          internalCode
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
`;

export function useGetCostChargeFilteredEstatesQuery(
  options?: Omit<Urql.UseQueryArgs<GetCostChargeFilteredEstatesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetCostChargeFilteredEstatesQuery, GetCostChargeFilteredEstatesQueryVariables>({
    query: GetCostChargeFilteredEstatesDocument,
    ...options,
  });
}
export const GetCostChargeFilteredAddressesDocument = gql`
  query getCostChargeFilteredAddresses(
    $filters: CostChargeAnalysisFiltersInput
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: AsstAddressFilterInput
    $order: [AsstAddressSortInput!]
  ) {
    costCharge {
      filteredAddresses(
        filters: $filters
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
          id
          cityName
          countyName
          toponymy
          numbering
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
`;

export function useGetCostChargeFilteredAddressesQuery(
  options?: Omit<Urql.UseQueryArgs<GetCostChargeFilteredAddressesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetCostChargeFilteredAddressesQuery, GetCostChargeFilteredAddressesQueryVariables>({
    query: GetCostChargeFilteredAddressesDocument,
    ...options,
  });
}
export const GetCostChargeFilteredCityNamesDocument = gql`
  query getCostChargeFilteredCityNames(
    $filters: CostChargeAnalysisFiltersInput
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: FilteredCityNameFilterInput
    $order: [FilteredCityNameSortInput!]
  ) {
    costCharge {
      filteredCityNames(
        filters: $filters
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
          value
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
`;

export function useGetCostChargeFilteredCityNamesQuery(
  options?: Omit<Urql.UseQueryArgs<GetCostChargeFilteredCityNamesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetCostChargeFilteredCityNamesQuery, GetCostChargeFilteredCityNamesQueryVariables>({
    query: GetCostChargeFilteredCityNamesDocument,
    ...options,
  });
}
export const GetCostChargeFilteredCountyNamesDocument = gql`
  query getCostChargeFilteredCountyNames(
    $filters: CostChargeAnalysisFiltersInput
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: FilteredCountyNameFilterInput
    $order: [FilteredCountyNameSortInput!]
  ) {
    costCharge {
      filteredCountyNames(
        filters: $filters
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
          value
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
`;

export function useGetCostChargeFilteredCountyNamesQuery(
  options?: Omit<Urql.UseQueryArgs<GetCostChargeFilteredCountyNamesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetCostChargeFilteredCountyNamesQuery, GetCostChargeFilteredCountyNamesQueryVariables>({
    query: GetCostChargeFilteredCountyNamesDocument,
    ...options,
  });
}
export const GetCostChargeFilteredUtilityTypesDocument = gql`
  query getCostChargeFilteredUtilityTypes(
    $filters: CostChargeAnalysisFiltersInput
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: UtilityTypeFilterInput
    $order: [UtilityTypeSortInput!]
  ) {
    costCharge {
      filteredUtilityTypes(
        filters: $filters
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
          id
          internalCode
          description
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
`;

export function useGetCostChargeFilteredUtilityTypesQuery(
  options?: Omit<Urql.UseQueryArgs<GetCostChargeFilteredUtilityTypesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetCostChargeFilteredUtilityTypesQuery, GetCostChargeFilteredUtilityTypesQueryVariables>({
    query: GetCostChargeFilteredUtilityTypesDocument,
    ...options,
  });
}
export const GetCostChargeFilteredUtilityServicesDocument = gql`
  query getCostChargeFilteredUtilityServices(
    $filters: CostChargeAnalysisFiltersInput
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: UtilityServiceFilterInput
    $order: [UtilityServiceSortInput!]
  ) {
    costCharge {
      filteredUtilityServices(
        filters: $filters
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
          id
          utilityContractCode
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
`;

export function useGetCostChargeFilteredUtilityServicesQuery(
  options?: Omit<Urql.UseQueryArgs<GetCostChargeFilteredUtilityServicesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetCostChargeFilteredUtilityServicesQuery, GetCostChargeFilteredUtilityServicesQueryVariables>({
    query: GetCostChargeFilteredUtilityServicesDocument,
    ...options,
  });
}
export const GetCostChargeAnalysisDocument = gql`
  query getCostChargeAnalysis($filters: CostChargeAnalysisFiltersInput!) {
    costCharge {
      analysis(filters: $filters) {
        key
        value {
          ...CostChargeAnalysisFragment
        }
      }
    }
  }
  ${CostChargeAnalysisFragmentDoc}
  ${CostChargeAnalysisValueFragmentDoc}
`;

export function useGetCostChargeAnalysisQuery(
  options: Omit<Urql.UseQueryArgs<GetCostChargeAnalysisQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetCostChargeAnalysisQuery, GetCostChargeAnalysisQueryVariables>({
    query: GetCostChargeAnalysisDocument,
    ...options,
  });
}
export const GetCostChargeCsvImportTemplateDocument = gql`
  query getCostChargeCsvImportTemplate {
    costCharge {
      templateOfImportFromCsv {
        resourceUrl
      }
    }
  }
`;

export function useGetCostChargeCsvImportTemplateQuery(
  options?: Omit<Urql.UseQueryArgs<GetCostChargeCsvImportTemplateQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetCostChargeCsvImportTemplateQuery, GetCostChargeCsvImportTemplateQueryVariables>({
    query: GetCostChargeCsvImportTemplateDocument,
    ...options,
  });
}
export const GetCostChargeExcelImportTemplateDocument = gql`
  query getCostChargeExcelImportTemplate {
    costCharge {
      templateOfImportFromExcel {
        resourceUrl
      }
    }
  }
`;

export function useGetCostChargeExcelImportTemplateQuery(
  options?: Omit<Urql.UseQueryArgs<GetCostChargeExcelImportTemplateQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetCostChargeExcelImportTemplateQuery, GetCostChargeExcelImportTemplateQueryVariables>({
    query: GetCostChargeExcelImportTemplateDocument,
    ...options,
  });
}
export const ImportCostChargesDocument = gql`
  mutation importCostCharges($file: Upload!) {
    costCharge {
      import(file: $file) {
        errors
        isSuccess
        value
        validationErrors {
          ...ValidationErrorFragment
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
`;

export function useImportCostChargesMutation() {
  return Urql.useMutation<ImportCostChargesMutation, ImportCostChargesMutationVariables>(ImportCostChargesDocument);
}
