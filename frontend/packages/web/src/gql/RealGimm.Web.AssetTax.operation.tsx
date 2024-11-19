// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { AssetTaxDetailEstateItemFragmentDoc } from './RealGimm.Web.AssetTaxDetailEstateItem.fragment';
import { AssetTaxDetailEstateUnitItemFragmentDoc } from './RealGimm.Web.AssetTaxDetailEstateUnitItem.fragment';
import { AssetTaxPaymentFragmentDoc } from './RealGimm.Web.AssetTaxDetailRow.fragment';
import { AssetTaxFragmentDoc } from './RealGimm.Web.AssetTaxGroupedRow.fragment';
import { AsstAddressFragmentDoc } from './RealGimm.Web.AsstAddress.fragment';
import { CadastralCoordinatesFragmentDoc } from './RealGimm.Web.CadastralCoordinates.fragment';
import { CityFragmentDoc } from './RealGimm.Web.City.fragment';
import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';

export type GetAssetTaxesQueryVariables = Types.Exact<{
  taxCalculatorId: Types.Scalars['UUID']['input'];
  currentYear: Types.Scalars['Boolean']['input'];
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.AssetTaxGroupedRowFilterInput>;
  order?: Types.InputMaybe<Array<Types.AssetTaxGroupedRowSortInput> | Types.AssetTaxGroupedRowSortInput>;
}>;

export type GetAssetTaxesQuery = {
  __typename?: 'Query';
  assetTax: {
    __typename?: 'AssetTaxQueries';
    groupedPayments?: {
      __typename?: 'GroupedPaymentsConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'AssetTaxGroupedRow';
        expectedDueDate?: string | null;
        lastUpdate?: string | null;
        managementSubject?: string | null;
        managementSubjectId: number;
        totalAmount?: number | null;
        totalTaxableAmount?: number | null;
        year: number;
        assetTaxCalculation: { __typename?: 'AssetTaxCalculation'; id: number; taxCalculator: string };
        payments?: Array<{
          __typename?: 'AssetTaxPayment';
          issue?: Types.CalculationIssue | null;
          isDefinitive: boolean;
          isIssueOverridden: boolean;
          id: number;
          assetTaxCalculation?: {
            __typename?: 'AssetTaxCalculation';
            id: number;
            cadastralUnit: {
              __typename?: 'CadastralUnit';
              id: number;
              estateUnit: {
                __typename?: 'EstateUnit';
                id: number;
                internalCode: string;
                estate: { __typename?: 'Estate'; id: number; internalCode: string };
              };
            };
          } | null;
        }> | null;
      }> | null;
    } | null;
  };
};

export type GetAllAssetTaxesQueryVariables = Types.Exact<{
  taxCalculatorId: Types.Scalars['UUID']['input'];
  currentYear: Types.Scalars['Boolean']['input'];
  where?: Types.InputMaybe<Types.AssetTaxGroupedRowFilterInput>;
  order?: Types.InputMaybe<Array<Types.AssetTaxGroupedRowSortInput> | Types.AssetTaxGroupedRowSortInput>;
}>;

export type GetAllAssetTaxesQuery = {
  __typename?: 'Query';
  assetTax: {
    __typename?: 'AssetTaxQueries';
    fullGroupedPayments: Array<{
      __typename?: 'AssetTaxGroupedRow';
      expectedDueDate?: string | null;
      lastUpdate?: string | null;
      managementSubject?: string | null;
      managementSubjectId: number;
      totalAmount?: number | null;
      totalTaxableAmount?: number | null;
      year: number;
      assetTaxCalculation: { __typename?: 'AssetTaxCalculation'; id: number; taxCalculator: string };
      payments?: Array<{
        __typename?: 'AssetTaxPayment';
        issue?: Types.CalculationIssue | null;
        isDefinitive: boolean;
        isIssueOverridden: boolean;
        id: number;
        assetTaxCalculation?: {
          __typename?: 'AssetTaxCalculation';
          id: number;
          cadastralUnit: {
            __typename?: 'CadastralUnit';
            id: number;
            estateUnit: {
              __typename?: 'EstateUnit';
              id: number;
              internalCode: string;
              estate: { __typename?: 'Estate'; id: number; internalCode: string };
            };
          };
        } | null;
      }> | null;
    }>;
  };
};

export type GetAssetTaxQueryVariables = Types.Exact<{
  taxCalculatorId: Types.Scalars['UUID']['input'];
  year: Types.Scalars['Int']['input'];
  managementSubjectId: Types.Scalars['Int']['input'];
  expectedDueDate: Types.Scalars['Date']['input'];
}>;

export type GetAssetTaxQuery = {
  __typename?: 'Query';
  assetTax: {
    __typename?: 'AssetTaxQueries';
    singleGroupedPayment?: {
      __typename?: 'AssetTaxGroupedRow';
      expectedDueDate?: string | null;
      lastUpdate?: string | null;
      managementSubject?: string | null;
      managementSubjectId: number;
      totalAmount?: number | null;
      totalTaxableAmount?: number | null;
      year: number;
      assetTaxCalculation: { __typename?: 'AssetTaxCalculation'; id: number; taxCalculator: string };
      payments?: Array<{
        __typename?: 'AssetTaxPayment';
        issue?: Types.CalculationIssue | null;
        isDefinitive: boolean;
        isIssueOverridden: boolean;
        id: number;
        assetTaxCalculation?: {
          __typename?: 'AssetTaxCalculation';
          id: number;
          cadastralUnit: {
            __typename?: 'CadastralUnit';
            id: number;
            estateUnit: {
              __typename?: 'EstateUnit';
              id: number;
              internalCode: string;
              estate: { __typename?: 'Estate'; id: number; internalCode: string };
            };
          };
        } | null;
      }> | null;
    } | null;
  };
};

export type GetAssetTaxPaymentsQueryVariables = Types.Exact<{
  taxCalculatorId: Types.Scalars['UUID']['input'];
  year: Types.Scalars['Int']['input'];
  managementSubjectId: Types.Scalars['Int']['input'];
  expectedDueDate: Types.Scalars['Date']['input'];
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.AssetTaxDetailRowFilterInput>;
  order?: Types.InputMaybe<Array<Types.AssetTaxDetailRowSortInput> | Types.AssetTaxDetailRowSortInput>;
}>;

export type GetAssetTaxPaymentsQuery = {
  __typename?: 'Query';
  assetTax: {
    __typename?: 'AssetTaxQueries';
    detailGroupedPayments?: {
      __typename?: 'DetailGroupedPaymentsConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'AssetTaxDetailRow';
        cityName?: string | null;
        estatesCount: number;
        estateUnitsCount: number;
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
        subRows: Array<{
          __typename?: 'AssetTaxDetailEstateItem';
          estateInternalCode?: string | null;
          totalAmountPaid: number;
          totalBaseTaxableAmount: number;
          totalGrossCadastralIncome: number;
          totalActualizedCadastralIncome: number;
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
          subRows: Array<{
            __typename?: 'AssetTaxDetailEstateUnitItem';
            estateUnitInternalCode?: string | null;
            estateUnitOwnershipPercent?: number | null;
            amountPaid: number;
            baseTaxableAmount: number;
            grossCadastralIncome: number;
            actualizedCadastralIncome: number;
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
            cadastralCoordinates: Array<{
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
            cadastralUnitIncome?: {
              __typename?: 'CadastralUnitIncome';
              macroCategory?: string | null;
              microCategory?: string | null;
              metricAmount?: number | null;
              type?: Types.IncomeType | null;
            } | null;
            cadastralUnitTaxConfig?: {
              __typename?: 'CadastralUnitTaxConfig';
              id: number;
              value?: string | null;
            } | null;
          }>;
        }>;
      }> | null;
    } | null;
  };
};

export type FinalizeAssetTaxesMutationVariables = Types.Exact<{
  taxPaymentIds: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
  taxCalculatorId: Types.Scalars['UUID']['input'];
}>;

export type FinalizeAssetTaxesMutation = {
  __typename?: 'Mutation';
  assetTax: {
    __typename?: 'AssetTaxMutations';
    setDefinitive: {
      __typename?: 'ResultOfIEnumerableOfAssetTaxPayment';
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

export type SetAssetTaxPaymentsIssueOverriddenMutationVariables = Types.Exact<{
  taxCalculatorId: Types.Scalars['UUID']['input'];
  year: Types.Scalars['Int']['input'];
  managementSubjectId: Types.Scalars['Int']['input'];
  expectedDueDate: Types.Scalars['Date']['input'];
  inputValues: Array<Types.KeyValuePairOfInt32AndBooleanInput> | Types.KeyValuePairOfInt32AndBooleanInput;
}>;

export type SetAssetTaxPaymentsIssueOverriddenMutation = {
  __typename?: 'Mutation';
  assetTax: {
    __typename?: 'AssetTaxMutations';
    setIssueOverridden: {
      __typename?: 'ResultOfIEnumerableOfAssetTaxCalculation';
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

export type ExportAssetTaxPaymentsQueryVariables = Types.Exact<{
  taxCalculatorId: Types.Scalars['UUID']['input'];
  year: Types.Scalars['Int']['input'];
  managementSubjectId: Types.Scalars['Int']['input'];
  expectedDueDate: Types.Scalars['Date']['input'];
  where?: Types.InputMaybe<Types.AssetTaxDetailRowFilterInput>;
  order?: Types.InputMaybe<Array<Types.AssetTaxDetailRowSortInput> | Types.AssetTaxDetailRowSortInput>;
}>;

export type ExportAssetTaxPaymentsQuery = {
  __typename?: 'Query';
  assetTax: {
    __typename?: 'AssetTaxQueries';
    exportDetailGroupedPayments: { __typename?: 'FileUrlOutput'; resourceUrl: string };
  };
};

export type ExportAssetTaxesQueryVariables = Types.Exact<{
  taxCalculatorId: Types.Scalars['UUID']['input'];
  currentYear: Types.Scalars['Boolean']['input'];
  where?: Types.InputMaybe<Types.AssetTaxGroupedRowFilterInput>;
  order?: Types.InputMaybe<Array<Types.AssetTaxGroupedRowSortInput> | Types.AssetTaxGroupedRowSortInput>;
}>;

export type ExportAssetTaxesQuery = {
  __typename?: 'Query';
  assetTax: {
    __typename?: 'AssetTaxQueries';
    exportGroupedPayments: { __typename?: 'FileUrlOutput'; resourceUrl: string };
  };
};

export const GetAssetTaxesDocument = gql`
  query getAssetTaxes(
    $taxCalculatorId: UUID!
    $currentYear: Boolean!
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: AssetTaxGroupedRowFilterInput
    $order: [AssetTaxGroupedRowSortInput!]
  ) {
    assetTax {
      groupedPayments(
        taxCalculatorId: $taxCalculatorId
        currentYear: $currentYear
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
          ...AssetTaxFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${AssetTaxFragmentDoc}
`;

export function useGetAssetTaxesQuery(options: Omit<Urql.UseQueryArgs<GetAssetTaxesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAssetTaxesQuery, GetAssetTaxesQueryVariables>({ query: GetAssetTaxesDocument, ...options });
}
export const GetAllAssetTaxesDocument = gql`
  query getAllAssetTaxes(
    $taxCalculatorId: UUID!
    $currentYear: Boolean!
    $where: AssetTaxGroupedRowFilterInput
    $order: [AssetTaxGroupedRowSortInput!]
  ) {
    assetTax {
      fullGroupedPayments(taxCalculatorId: $taxCalculatorId, currentYear: $currentYear, where: $where, order: $order) {
        ...AssetTaxFragment
      }
    }
  }
  ${AssetTaxFragmentDoc}
`;

export function useGetAllAssetTaxesQuery(options: Omit<Urql.UseQueryArgs<GetAllAssetTaxesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllAssetTaxesQuery, GetAllAssetTaxesQueryVariables>({
    query: GetAllAssetTaxesDocument,
    ...options,
  });
}
export const GetAssetTaxDocument = gql`
  query getAssetTax($taxCalculatorId: UUID!, $year: Int!, $managementSubjectId: Int!, $expectedDueDate: Date!) {
    assetTax {
      singleGroupedPayment(
        taxCalculatorId: $taxCalculatorId
        year: $year
        managementSubjectId: $managementSubjectId
        expectedDueDate: $expectedDueDate
      ) {
        ...AssetTaxFragment
      }
    }
  }
  ${AssetTaxFragmentDoc}
`;

export function useGetAssetTaxQuery(options: Omit<Urql.UseQueryArgs<GetAssetTaxQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAssetTaxQuery, GetAssetTaxQueryVariables>({ query: GetAssetTaxDocument, ...options });
}
export const GetAssetTaxPaymentsDocument = gql`
  query getAssetTaxPayments(
    $taxCalculatorId: UUID!
    $year: Int!
    $managementSubjectId: Int!
    $expectedDueDate: Date!
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: AssetTaxDetailRowFilterInput
    $order: [AssetTaxDetailRowSortInput!]
  ) {
    assetTax {
      detailGroupedPayments(
        taxCalculatorId: $taxCalculatorId
        year: $year
        managementSubjectId: $managementSubjectId
        expectedDueDate: $expectedDueDate
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
          ...AssetTaxPaymentFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${AssetTaxPaymentFragmentDoc}
  ${AsstAddressFragmentDoc}
  ${CityFragmentDoc}
  ${AssetTaxDetailEstateItemFragmentDoc}
  ${AssetTaxDetailEstateUnitItemFragmentDoc}
  ${CadastralCoordinatesFragmentDoc}
`;

export function useGetAssetTaxPaymentsQuery(
  options: Omit<Urql.UseQueryArgs<GetAssetTaxPaymentsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetAssetTaxPaymentsQuery, GetAssetTaxPaymentsQueryVariables>({
    query: GetAssetTaxPaymentsDocument,
    ...options,
  });
}
export const FinalizeAssetTaxesDocument = gql`
  mutation finalizeAssetTaxes($taxPaymentIds: [Int!]!, $taxCalculatorId: UUID!) {
    assetTax {
      setDefinitive(taxPaymentIds: $taxPaymentIds, taxCalculatorId: $taxCalculatorId) {
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

export function useFinalizeAssetTaxesMutation() {
  return Urql.useMutation<FinalizeAssetTaxesMutation, FinalizeAssetTaxesMutationVariables>(FinalizeAssetTaxesDocument);
}
export const SetAssetTaxPaymentsIssueOverriddenDocument = gql`
  mutation setAssetTaxPaymentsIssueOverridden(
    $taxCalculatorId: UUID!
    $year: Int!
    $managementSubjectId: Int!
    $expectedDueDate: Date!
    $inputValues: [KeyValuePairOfInt32AndBooleanInput!]!
  ) {
    assetTax {
      setIssueOverridden(
        taxCalculatorId: $taxCalculatorId
        year: $year
        managementSubjectId: $managementSubjectId
        expectedDueDate: $expectedDueDate
        inputValues: $inputValues
      ) {
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

export function useSetAssetTaxPaymentsIssueOverriddenMutation() {
  return Urql.useMutation<
    SetAssetTaxPaymentsIssueOverriddenMutation,
    SetAssetTaxPaymentsIssueOverriddenMutationVariables
  >(SetAssetTaxPaymentsIssueOverriddenDocument);
}
export const ExportAssetTaxPaymentsDocument = gql`
  query exportAssetTaxPayments(
    $taxCalculatorId: UUID!
    $year: Int!
    $managementSubjectId: Int!
    $expectedDueDate: Date!
    $where: AssetTaxDetailRowFilterInput
    $order: [AssetTaxDetailRowSortInput!]
  ) {
    assetTax {
      exportDetailGroupedPayments(
        taxCalculatorId: $taxCalculatorId
        year: $year
        managementSubjectId: $managementSubjectId
        expectedDueDate: $expectedDueDate
        where: $where
        order: $order
      ) {
        resourceUrl
      }
    }
  }
`;

export function useExportAssetTaxPaymentsQuery(
  options: Omit<Urql.UseQueryArgs<ExportAssetTaxPaymentsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ExportAssetTaxPaymentsQuery, ExportAssetTaxPaymentsQueryVariables>({
    query: ExportAssetTaxPaymentsDocument,
    ...options,
  });
}
export const ExportAssetTaxesDocument = gql`
  query exportAssetTaxes(
    $taxCalculatorId: UUID!
    $currentYear: Boolean!
    $where: AssetTaxGroupedRowFilterInput
    $order: [AssetTaxGroupedRowSortInput!]
  ) {
    assetTax {
      exportGroupedPayments(
        taxCalculatorId: $taxCalculatorId
        currentYear: $currentYear
        where: $where
        order: $order
      ) {
        resourceUrl
      }
    }
  }
`;

export function useExportAssetTaxesQuery(options: Omit<Urql.UseQueryArgs<ExportAssetTaxesQueryVariables>, 'query'>) {
  return Urql.useQuery<ExportAssetTaxesQuery, ExportAssetTaxesQueryVariables>({
    query: ExportAssetTaxesDocument,
    ...options,
  });
}
