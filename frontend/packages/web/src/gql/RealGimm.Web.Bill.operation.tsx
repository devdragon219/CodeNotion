// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { AsstAddressFragmentDoc } from './RealGimm.Web.AsstAddress.fragment';
import { BillDetailFragmentDoc, BillFragmentDoc } from './RealGimm.Web.Bill.fragment';
import { BillFullListOutputFragmentDoc } from './RealGimm.Web.BillFullListOutput.fragment';
import { BillRowFragmentDoc } from './RealGimm.Web.BillRow.fragment';
import { CityFragmentDoc } from './RealGimm.Web.City.fragment';
import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';

export type GetBillsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.BillFilterInput>;
  order?: Types.InputMaybe<Array<Types.BillSortInput> | Types.BillSortInput>;
}>;

export type GetBillsQuery = {
  __typename?: 'Query';
  bill: {
    __typename?: 'BillQueries';
    listBills?: {
      __typename?: 'ListBillsConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<{
        __typename?: 'Bill';
        id: number;
        internalCode: string;
        year: number;
        isInvoiced: boolean;
        contractBillingPeriod: Types.BillingPeriod;
        isOccupiedWithoutRight: boolean;
        date: string;
        since?: string | null;
        until?: string | null;
        transactorPaymentType: Types.PaymentType;
        emissionType: Types.BillEmissionType;
        totalAmount: number;
        contract?: {
          __typename?: 'Contract';
          internalCode: string;
          managementSubject:
            | { __typename?: 'LegalSubject'; id: number; name: string }
            | { __typename?: 'ManagementSubject'; id: number; name: string }
            | { __typename?: 'PhysicalSubject'; id: number; name: string };
          type: { __typename?: 'ContractType'; id: number; description: string };
        } | null;
        counterpartSubject:
          | { __typename?: 'LegalSubject'; id: number; name: string }
          | { __typename?: 'ManagementSubject'; id: number; name: string }
          | { __typename?: 'PhysicalSubject'; id: number; name: string };
        estateUnit?: {
          __typename?: 'EstateUnit';
          id: number;
          internalCode: string;
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
        } | null;
        transactorSubject:
          | { __typename?: 'LegalSubject'; id: number; name: string }
          | { __typename?: 'ManagementSubject'; id: number; name: string }
          | { __typename?: 'PhysicalSubject'; id: number; name: string };
      }> | null;
    } | null;
  };
};

export type GetAllBillsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.BillFilterInput>;
  order?: Types.InputMaybe<Array<Types.BillSortInput> | Types.BillSortInput>;
}>;

export type GetAllBillsQuery = {
  __typename?: 'Query';
  bill: {
    __typename?: 'BillQueries';
    listBillsFull: Array<{
      __typename?: 'BillFullListOutput';
      id: number;
      contractId: number;
      contractInternalCode: string;
      since?: string | null;
      mainCounterpartSubject:
        | { __typename?: 'LegalSubject'; id: number; name: string }
        | { __typename?: 'ManagementSubject'; id: number; name: string }
        | { __typename?: 'PhysicalSubject'; id: number; name: string };
      contractManagementSubject:
        | { __typename?: 'LegalSubject'; id: number; name: string }
        | { __typename?: 'ManagementSubject'; id: number; name: string }
        | { __typename?: 'PhysicalSubject'; id: number; name: string };
    }>;
  };
};

export type GetBillQueryVariables = Types.Exact<{
  billId: Types.Scalars['Int']['input'];
}>;

export type GetBillQuery = {
  __typename?: 'Query';
  bill: {
    __typename?: 'BillQueries';
    get?: {
      __typename?: 'Bill';
      isTemporary: boolean;
      year: number;
      isInvoiced: boolean;
      contractBillingPeriod: Types.BillingPeriod;
      isOccupiedWithoutRight: boolean;
      date: string;
      since?: string | null;
      until?: string | null;
      transactorPaymentType: Types.PaymentType;
      emissionType: Types.BillEmissionType;
      finalDate?: string | null;
      totalAmount: number;
      internalCode: string;
      id: number;
      contract?: {
        __typename?: 'Contract';
        internalCode: string;
        counterparts: Array<{
          __typename?: 'Counterpart';
          subject:
            | { __typename?: 'LegalSubject'; name: string; id: number }
            | { __typename?: 'ManagementSubject'; name: string; id: number }
            | { __typename?: 'PhysicalSubject'; name: string; id: number };
        }>;
        managementSubject:
          | { __typename?: 'LegalSubject'; name: string }
          | { __typename?: 'ManagementSubject'; name: string }
          | { __typename?: 'PhysicalSubject'; name: string };
        transactors: Array<{
          __typename?: 'Transactor';
          subject:
            | { __typename?: 'LegalSubject'; name: string; id: number }
            | { __typename?: 'ManagementSubject'; name: string; id: number }
            | { __typename?: 'PhysicalSubject'; name: string; id: number };
        }>;
        type: { __typename?: 'ContractType'; description: string };
      } | null;
      counterpartSubject:
        | { __typename?: 'LegalSubject'; name: string; id: number }
        | { __typename?: 'ManagementSubject'; name: string; id: number }
        | { __typename?: 'PhysicalSubject'; name: string; id: number };
      estateUnit?: {
        __typename?: 'EstateUnit';
        internalCode: string;
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
      } | null;
      transactorSubject:
        | { __typename?: 'LegalSubject'; name: string; id: number }
        | { __typename?: 'ManagementSubject'; name: string; id: number }
        | { __typename?: 'PhysicalSubject'; name: string; id: number };
      billRows: Array<{
        __typename?: 'BillRow';
        since?: string | null;
        until?: string | null;
        amount: number;
        id: number;
        itemType: {
          __typename?: 'BillItemType';
          description: string;
          id: number;
          defaultAccountingItem?: { __typename?: 'AccountingItem'; internalCode: string } | null;
        };
        vatRate: { __typename?: 'VATRate'; internalCode: string; description: string; ratePercent: number; id: number };
      }>;
    } | null;
  };
};

export type UpdateBillMutationVariables = Types.Exact<{
  billId: Types.Scalars['Int']['input'];
  input: Types.BillInput;
}>;

export type UpdateBillMutation = {
  __typename?: 'Mutation';
  bill: {
    __typename?: 'BillMutations';
    update: {
      __typename?: 'ResultOfBill';
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

export type FinalizeBillsMutationVariables = Types.Exact<{
  billIds: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type FinalizeBillsMutation = {
  __typename?: 'Mutation';
  bill: {
    __typename?: 'BillMutations';
    finalize: {
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

export type ExportActiveBillsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.BillFilterInput>;
  order?: Types.InputMaybe<Array<Types.BillSortInput> | Types.BillSortInput>;
}>;

export type ExportActiveBillsQuery = {
  __typename?: 'Query';
  bill: { __typename?: 'BillQueries'; exportActiveToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string } };
};

export type ExportPassiveBillsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.BillFilterInput>;
  order?: Types.InputMaybe<Array<Types.BillSortInput> | Types.BillSortInput>;
}>;

export type ExportPassiveBillsQuery = {
  __typename?: 'Query';
  bill: { __typename?: 'BillQueries'; exportPassiveToExcel: { __typename?: 'FileUrlOutput'; resourceUrl: string } };
};

export type GetBillStatisticsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetBillStatisticsQuery = {
  __typename?: 'Query';
  bill: {
    __typename?: 'BillQueries';
    billStateStatisticsOutput: {
      __typename?: 'BillStateStatisticsOutput';
      finalBillsPercentage: number;
      temporaryBillsPercentage: number;
    };
  };
};

export type GenerateBillPdfQueryVariables = Types.Exact<{
  billId: Types.Scalars['Int']['input'];
}>;

export type GenerateBillPdfQuery = {
  __typename?: 'Query';
  bill: {
    __typename?: 'BillQueries';
    generatePdf: {
      __typename?: 'ResultOfFileUrlOutput';
      errors?: Array<string | null> | null;
      isSuccess: boolean;
      validationErrors?: Array<{
        __typename?: 'ValidationError';
        identifier?: string | null;
        errorMessage?: string | null;
        errorCode?: string | null;
        severity: Types.ValidationSeverity;
      } | null> | null;
      value?: { __typename?: 'FileUrlOutput'; resourceUrl: string } | null;
    };
  };
};

export const GetBillsDocument = gql`
  query getBills(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: BillFilterInput
    $order: [BillSortInput!]
  ) {
    bill {
      listBills(first: $first, after: $after, last: $last, before: $before, where: $where, order: $order) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...BillFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${BillFragmentDoc}
  ${AsstAddressFragmentDoc}
  ${CityFragmentDoc}
`;

export function useGetBillsQuery(options?: Omit<Urql.UseQueryArgs<GetBillsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetBillsQuery, GetBillsQueryVariables>({ query: GetBillsDocument, ...options });
}
export const GetAllBillsDocument = gql`
  query getAllBills($where: BillFilterInput, $order: [BillSortInput!]) {
    bill {
      listBillsFull(where: $where, order: $order) {
        ...BillFullListOutputFragment
      }
    }
  }
  ${BillFullListOutputFragmentDoc}
`;

export function useGetAllBillsQuery(options?: Omit<Urql.UseQueryArgs<GetAllBillsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllBillsQuery, GetAllBillsQueryVariables>({ query: GetAllBillsDocument, ...options });
}
export const GetBillDocument = gql`
  query getBill($billId: Int!) {
    bill {
      get(id: $billId) {
        ...BillDetailFragment
      }
    }
  }
  ${BillDetailFragmentDoc}
  ${AsstAddressFragmentDoc}
  ${CityFragmentDoc}
  ${BillRowFragmentDoc}
`;

export function useGetBillQuery(options: Omit<Urql.UseQueryArgs<GetBillQueryVariables>, 'query'>) {
  return Urql.useQuery<GetBillQuery, GetBillQueryVariables>({ query: GetBillDocument, ...options });
}
export const UpdateBillDocument = gql`
  mutation updateBill($billId: Int!, $input: BillInput!) {
    bill {
      update(id: $billId, input: $input) {
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

export function useUpdateBillMutation() {
  return Urql.useMutation<UpdateBillMutation, UpdateBillMutationVariables>(UpdateBillDocument);
}
export const FinalizeBillsDocument = gql`
  mutation finalizeBills($billIds: [Int!]!) {
    bill {
      finalize(ids: $billIds) {
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

export function useFinalizeBillsMutation() {
  return Urql.useMutation<FinalizeBillsMutation, FinalizeBillsMutationVariables>(FinalizeBillsDocument);
}
export const ExportActiveBillsDocument = gql`
  query exportActiveBills($where: BillFilterInput, $order: [BillSortInput!]) {
    bill {
      exportActiveToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportActiveBillsQuery(options?: Omit<Urql.UseQueryArgs<ExportActiveBillsQueryVariables>, 'query'>) {
  return Urql.useQuery<ExportActiveBillsQuery, ExportActiveBillsQueryVariables>({
    query: ExportActiveBillsDocument,
    ...options,
  });
}
export const ExportPassiveBillsDocument = gql`
  query exportPassiveBills($where: BillFilterInput, $order: [BillSortInput!]) {
    bill {
      exportPassiveToExcel(where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportPassiveBillsQuery(
  options?: Omit<Urql.UseQueryArgs<ExportPassiveBillsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ExportPassiveBillsQuery, ExportPassiveBillsQueryVariables>({
    query: ExportPassiveBillsDocument,
    ...options,
  });
}
export const GetBillStatisticsDocument = gql`
  query getBillStatistics {
    bill {
      billStateStatisticsOutput {
        finalBillsPercentage
        temporaryBillsPercentage
      }
    }
  }
`;

export function useGetBillStatisticsQuery(options?: Omit<Urql.UseQueryArgs<GetBillStatisticsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetBillStatisticsQuery, GetBillStatisticsQueryVariables>({
    query: GetBillStatisticsDocument,
    ...options,
  });
}
export const GenerateBillPdfDocument = gql`
  query generateBillPdf($billId: Int!) {
    bill {
      generatePdf(billId: $billId) {
        errors
        isSuccess
        validationErrors {
          ...ValidationErrorFragment
        }
        value {
          resourceUrl
        }
      }
    }
  }
  ${ValidationErrorFragmentDoc}
`;

export function useGenerateBillPdfQuery(options: Omit<Urql.UseQueryArgs<GenerateBillPdfQueryVariables>, 'query'>) {
  return Urql.useQuery<GenerateBillPdfQuery, GenerateBillPdfQueryVariables>({
    query: GenerateBillPdfDocument,
    ...options,
  });
}
