// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { CityFragmentDoc } from './RealGimm.Web.City.fragment';
import { ColumnFragmentDoc } from './RealGimm.Web.Column.fragment';
import { PageInfoFragmentDoc } from './RealGimm.Web.PageInfo.fragment';
import { TableFragmentDoc } from './RealGimm.Web.Table.fragment';
import { TaxCalculatorFragmentDoc } from './RealGimm.Web.TaxCalculator.fragment';
import { TaxConfigColumnFragmentDoc } from './RealGimm.Web.TaxConfigColumn.fragment';
import { TaxConfigMainTableRowFragmentDoc } from './RealGimm.Web.TaxConfigMainTableRow.fragment';
import { TaxConfigSubTableRowFragmentDoc } from './RealGimm.Web.TaxConfigSubTableRow.fragment';
import { TaxConfigValueBundleFragmentDoc } from './RealGimm.Web.TaxConfigValueBundle.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';

export type GetAvailableTaxCalculatorsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetAvailableTaxCalculatorsQuery = {
  __typename?: 'Query';
  taxConfiguration: {
    __typename?: 'TaxConfigQueries';
    availableCalculators: Array<{
      __typename?: 'TaxCalculator';
      id: string;
      description: string;
      configuration:
        | {
            __typename?: 'ItaILIAConfiguration';
            availableMainTables: Array<{
              __typename?: 'Table';
              code: string;
              canAddRemoveRows: boolean;
              columns: Array<{
                __typename?: 'Column';
                code: string;
                sourceField?: string | null;
                sourceKey: string;
                filterKey?: string | null;
                valueType: Types.SubValueType;
                isVisibleInTable: boolean;
                isVisibleInDetail: boolean;
                isReadonly: boolean;
                isMandatory: boolean;
              }>;
            }>;
            availableSubTables: Array<{
              __typename?: 'KeyValuePairOfStringAndTable__';
              key: string;
              value: Array<{
                __typename?: 'Table';
                code: string;
                canAddRemoveRows: boolean;
                columns: Array<{
                  __typename?: 'Column';
                  code: string;
                  sourceField?: string | null;
                  sourceKey: string;
                  filterKey?: string | null;
                  valueType: Types.SubValueType;
                  isVisibleInTable: boolean;
                  isVisibleInDetail: boolean;
                  isReadonly: boolean;
                  isMandatory: boolean;
                }>;
              }>;
            }>;
          }
        | {
            __typename?: 'ItaIMUConfiguration';
            availableMainTables: Array<{
              __typename?: 'Table';
              code: string;
              canAddRemoveRows: boolean;
              columns: Array<{
                __typename?: 'Column';
                code: string;
                sourceField?: string | null;
                sourceKey: string;
                filterKey?: string | null;
                valueType: Types.SubValueType;
                isVisibleInTable: boolean;
                isVisibleInDetail: boolean;
                isReadonly: boolean;
                isMandatory: boolean;
              }>;
            }>;
            availableSubTables: Array<{
              __typename?: 'KeyValuePairOfStringAndTable__';
              key: string;
              value: Array<{
                __typename?: 'Table';
                code: string;
                canAddRemoveRows: boolean;
                columns: Array<{
                  __typename?: 'Column';
                  code: string;
                  sourceField?: string | null;
                  sourceKey: string;
                  filterKey?: string | null;
                  valueType: Types.SubValueType;
                  isVisibleInTable: boolean;
                  isVisibleInDetail: boolean;
                  isReadonly: boolean;
                  isMandatory: boolean;
                }>;
              }>;
            }>;
          };
    }>;
  };
};

export type GetAvailableHistoricalTaxCalculatorsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetAvailableHistoricalTaxCalculatorsQuery = {
  __typename?: 'Query';
  taxConfiguration: {
    __typename?: 'TaxConfigQueries';
    historyAvailableCalculators: Array<{ __typename?: 'TaxCalculatorName'; id: string; description: string }>;
  };
};

export type GetTaxConfigMainTableValuesQueryVariables = Types.Exact<{
  calculatorId: Types.Scalars['UUID']['input'];
  tableCode: Types.Scalars['String']['input'];
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  where?: Types.InputMaybe<Types.ITaxConfigMainTableRowFilterInput>;
  order?: Types.InputMaybe<Array<Types.ITaxConfigMainTableRowSortInput> | Types.ITaxConfigMainTableRowSortInput>;
}>;

export type GetTaxConfigMainTableValuesQuery = {
  __typename?: 'Query';
  taxConfiguration: {
    __typename?: 'TaxConfigQueries';
    listTableValues?: {
      __typename?: 'ListTableValuesConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<
        | {
            __typename?: 'TaxConfigGenericRow';
            id: number;
            year: number;
            otherColumns: Array<{
              __typename?: 'TaxConfigColumn';
              key: string;
              type: Types.SubValueType;
              numberValue?: number | null;
              stringValue?: string | null;
              booleanValue?: boolean | null;
              dateValue?: string | null;
            }>;
          }
        | {
            __typename?: 'TaxConfigGroupedRow';
            id: number;
            groupingReference?: string | null;
            year: number;
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
            otherColumns: Array<{
              __typename?: 'TaxConfigColumn';
              key: string;
              type: Types.SubValueType;
              numberValue?: number | null;
              stringValue?: string | null;
              booleanValue?: boolean | null;
              dateValue?: string | null;
            }>;
          }
      > | null;
    } | null;
  };
};

export type GetTaxConfigSubTableValuesQueryVariables = Types.Exact<{
  calculatorId: Types.Scalars['UUID']['input'];
  tableCode: Types.Scalars['String']['input'];
  year: Types.Scalars['Int']['input'];
  subTable: Types.Scalars['String']['input'];
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;

export type GetTaxConfigSubTableValuesQuery = {
  __typename?: 'Query';
  taxConfiguration: {
    __typename?: 'TaxConfigQueries';
    listSubTableValue?: {
      __typename?: 'ListSubTableValueConnection';
      totalCount: number;
      pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
      };
      nodes?: Array<
        | {
            __typename?: 'TaxConfigCoefficientSubTableRow';
            id: number;
            referenceYear: string;
            coefficient?: number | null;
          }
        | {
            __typename?: 'TaxConfigRateSubTableRow';
            id: number;
            code: string;
            description: string;
            rate?: number | null;
          }
      > | null;
    } | null;
  };
};

export type GetAllTaxConfigSubTableValuesQueryVariables = Types.Exact<{
  calculatorId: Types.Scalars['UUID']['input'];
  tableCode: Types.Scalars['String']['input'];
  year: Types.Scalars['Int']['input'];
  groupReference?: Types.InputMaybe<Types.Scalars['UUID']['input']>;
  subTable: Types.Scalars['String']['input'];
}>;

export type GetAllTaxConfigSubTableValuesQuery = {
  __typename?: 'Query';
  taxConfiguration: {
    __typename?: 'TaxConfigQueries';
    listSubTableValueFull: Array<
      | {
          __typename?: 'TaxConfigCoefficientSubTableRow';
          id: number;
          referenceYear: string;
          coefficient?: number | null;
        }
      | { __typename?: 'TaxConfigRateSubTableRow'; id: number; code: string; description: string; rate?: number | null }
    >;
  };
};

export type GetTaxConfigMainTableValueQueryVariables = Types.Exact<{
  calculatorId: Types.Scalars['UUID']['input'];
  tableCode: Types.Scalars['String']['input'];
  tableValueId: Types.Scalars['Int']['input'];
}>;

export type GetTaxConfigMainTableValueQuery = {
  __typename?: 'Query';
  taxConfiguration: {
    __typename?: 'TaxConfigQueries';
    tableValueBundle?: {
      __typename?: 'TaxConfigValueBundle';
      calculator: {
        __typename?: 'TaxCalculator';
        id: string;
        description: string;
        configuration:
          | {
              __typename?: 'ItaILIAConfiguration';
              availableMainTables: Array<{
                __typename?: 'Table';
                code: string;
                canAddRemoveRows: boolean;
                columns: Array<{
                  __typename?: 'Column';
                  code: string;
                  sourceField?: string | null;
                  sourceKey: string;
                  filterKey?: string | null;
                  valueType: Types.SubValueType;
                  isVisibleInTable: boolean;
                  isVisibleInDetail: boolean;
                  isReadonly: boolean;
                  isMandatory: boolean;
                }>;
              }>;
              availableSubTables: Array<{
                __typename?: 'KeyValuePairOfStringAndTable__';
                key: string;
                value: Array<{
                  __typename?: 'Table';
                  code: string;
                  canAddRemoveRows: boolean;
                  columns: Array<{
                    __typename?: 'Column';
                    code: string;
                    sourceField?: string | null;
                    sourceKey: string;
                    filterKey?: string | null;
                    valueType: Types.SubValueType;
                    isVisibleInTable: boolean;
                    isVisibleInDetail: boolean;
                    isReadonly: boolean;
                    isMandatory: boolean;
                  }>;
                }>;
              }>;
            }
          | {
              __typename?: 'ItaIMUConfiguration';
              availableMainTables: Array<{
                __typename?: 'Table';
                code: string;
                canAddRemoveRows: boolean;
                columns: Array<{
                  __typename?: 'Column';
                  code: string;
                  sourceField?: string | null;
                  sourceKey: string;
                  filterKey?: string | null;
                  valueType: Types.SubValueType;
                  isVisibleInTable: boolean;
                  isVisibleInDetail: boolean;
                  isReadonly: boolean;
                  isMandatory: boolean;
                }>;
              }>;
              availableSubTables: Array<{
                __typename?: 'KeyValuePairOfStringAndTable__';
                key: string;
                value: Array<{
                  __typename?: 'Table';
                  code: string;
                  canAddRemoveRows: boolean;
                  columns: Array<{
                    __typename?: 'Column';
                    code: string;
                    sourceField?: string | null;
                    sourceKey: string;
                    filterKey?: string | null;
                    valueType: Types.SubValueType;
                    isVisibleInTable: boolean;
                    isVisibleInDetail: boolean;
                    isReadonly: boolean;
                    isMandatory: boolean;
                  }>;
                }>;
              }>;
            };
      };
      mainValue:
        | {
            __typename?: 'TaxConfigGenericRow';
            id: number;
            year: number;
            otherColumns: Array<{
              __typename?: 'TaxConfigColumn';
              key: string;
              type: Types.SubValueType;
              numberValue?: number | null;
              stringValue?: string | null;
              booleanValue?: boolean | null;
              dateValue?: string | null;
            }>;
          }
        | {
            __typename?: 'TaxConfigGroupedRow';
            id: number;
            groupingReference?: string | null;
            year: number;
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
            otherColumns: Array<{
              __typename?: 'TaxConfigColumn';
              key: string;
              type: Types.SubValueType;
              numberValue?: number | null;
              stringValue?: string | null;
              booleanValue?: boolean | null;
              dateValue?: string | null;
            }>;
          };
      allSubTableValues: Array<{
        __typename?: 'KeyValuePairOfStringAndITaxConfigSubTableRow__';
        key: string;
        value: Array<
          | {
              __typename?: 'TaxConfigCoefficientSubTableRow';
              id: number;
              referenceYear: string;
              coefficient?: number | null;
            }
          | {
              __typename?: 'TaxConfigRateSubTableRow';
              id: number;
              code: string;
              description: string;
              rate?: number | null;
            }
        >;
      }>;
    } | null;
  };
};

export type AddTaxConfigMainTableValueMutationVariables = Types.Exact<{
  calculatorId: Types.Scalars['UUID']['input'];
  tableCode: Types.Scalars['String']['input'];
  input: Types.TaxConfigInput;
}>;

export type AddTaxConfigMainTableValueMutation = {
  __typename?: 'Mutation';
  taxConfiguration: {
    __typename?: 'TaxConfigMutations';
    addTableValue: {
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

export type UpdateTaxConfigMainTableValueMutationVariables = Types.Exact<{
  calculatorId: Types.Scalars['UUID']['input'];
  tableCode: Types.Scalars['String']['input'];
  tableValueId: Types.Scalars['Int']['input'];
  input: Types.TaxConfigInput;
}>;

export type UpdateTaxConfigMainTableValueMutation = {
  __typename?: 'Mutation';
  taxConfiguration: {
    __typename?: 'TaxConfigMutations';
    updateTableValue: {
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

export type DeleteTaxConfigMainTableValueMutationVariables = Types.Exact<{
  calculatorId: Types.Scalars['UUID']['input'];
  tableValueId: Types.Scalars['Int']['input'];
}>;

export type DeleteTaxConfigMainTableValueMutation = {
  __typename?: 'Mutation';
  taxConfiguration: {
    __typename?: 'TaxConfigMutations';
    deleteTableValue: {
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

export type DeleteTaxConfigMainTableValuesMutationVariables = Types.Exact<{
  calculatorId: Types.Scalars['UUID']['input'];
  tableValueIds: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeleteTaxConfigMainTableValuesMutation = {
  __typename?: 'Mutation';
  taxConfiguration: {
    __typename?: 'TaxConfigMutations';
    deleteTableValueRange: {
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

export type AddTaxConfigSubTableValueMutationVariables = Types.Exact<{
  calculatorId: Types.Scalars['UUID']['input'];
  tableCode: Types.Scalars['String']['input'];
  year: Types.Scalars['Int']['input'];
  input: Types.TaxConfigSubValueRowInput;
}>;

export type AddTaxConfigSubTableValueMutation = {
  __typename?: 'Mutation';
  taxConfiguration: {
    __typename?: 'TaxConfigMutations';
    addSubTableValue: {
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

export type UpdateTaxConfigSubTableValueMutationVariables = Types.Exact<{
  calculatorId: Types.Scalars['UUID']['input'];
  tableCode: Types.Scalars['String']['input'];
  year: Types.Scalars['Int']['input'];
  subTableValueId: Types.Scalars['Int']['input'];
  input: Types.TaxConfigSubValueRowInput;
}>;

export type UpdateTaxConfigSubTableValueMutation = {
  __typename?: 'Mutation';
  taxConfiguration: {
    __typename?: 'TaxConfigMutations';
    updateSubTableValue: {
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

export type DeleteTaxConfigSubTableValueMutationVariables = Types.Exact<{
  calculatorId: Types.Scalars['UUID']['input'];
  tableCode: Types.Scalars['String']['input'];
  year: Types.Scalars['Int']['input'];
  subTableValueId: Types.Scalars['Int']['input'];
}>;

export type DeleteTaxConfigSubTableValueMutation = {
  __typename?: 'Mutation';
  taxConfiguration: {
    __typename?: 'TaxConfigMutations';
    deleteSubTableValue: {
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

export type DeleteTaxConfigSubTableValuesMutationVariables = Types.Exact<{
  calculatorId: Types.Scalars['UUID']['input'];
  tableCode: Types.Scalars['String']['input'];
  year: Types.Scalars['Int']['input'];
  subTableValueIds: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;

export type DeleteTaxConfigSubTableValuesMutation = {
  __typename?: 'Mutation';
  taxConfiguration: {
    __typename?: 'TaxConfigMutations';
    deleteSubTableValueRange: {
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

export type ExportTaxConfigMainTableValuesQueryVariables = Types.Exact<{
  calculatorId: Types.Scalars['UUID']['input'];
  tableCode: Types.Scalars['String']['input'];
  where?: Types.InputMaybe<Types.ITaxConfigMainTableRowFilterInput>;
  order?: Types.InputMaybe<Array<Types.ITaxConfigMainTableRowSortInput> | Types.ITaxConfigMainTableRowSortInput>;
}>;

export type ExportTaxConfigMainTableValuesQuery = {
  __typename?: 'Query';
  taxConfiguration: {
    __typename?: 'TaxConfigQueries';
    exportToExcelMainTable: { __typename?: 'FileUrlOutput'; resourceUrl: string };
  };
};

export type ExportTaxConfigSubTableValuesQueryVariables = Types.Exact<{
  calculatorId: Types.Scalars['UUID']['input'];
  tableCode: Types.Scalars['String']['input'];
  subTable: Types.Scalars['String']['input'];
  year: Types.Scalars['Int']['input'];
  where?: Types.InputMaybe<Types.ITaxConfigSubTableRowFilterInput>;
  order?: Types.InputMaybe<Array<Types.ITaxConfigSubTableRowSortInput> | Types.ITaxConfigSubTableRowSortInput>;
}>;

export type ExportTaxConfigSubTableValuesQuery = {
  __typename?: 'Query';
  taxConfiguration: {
    __typename?: 'TaxConfigQueries';
    exportToExcelSubTables: { __typename?: 'FileUrlOutput'; resourceUrl: string };
  };
};

export type CheckTagConfigTableValueExistsQueryVariables = Types.Exact<{
  calculatorId: Types.Scalars['UUID']['input'];
  tableCode: Types.Scalars['String']['input'];
  year: Types.Scalars['Int']['input'];
  groupingReference?: Types.InputMaybe<Types.Scalars['UUID']['input']>;
}>;

export type CheckTagConfigTableValueExistsQuery = {
  __typename?: 'Query';
  taxConfiguration: { __typename?: 'TaxConfigQueries'; checkTableValueExists: boolean };
};

export const GetAvailableTaxCalculatorsDocument = gql`
  query getAvailableTaxCalculators {
    taxConfiguration {
      availableCalculators {
        ...TaxCalculatorFragment
      }
    }
  }
  ${TaxCalculatorFragmentDoc}
  ${TableFragmentDoc}
  ${ColumnFragmentDoc}
`;

export function useGetAvailableTaxCalculatorsQuery(
  options?: Omit<Urql.UseQueryArgs<GetAvailableTaxCalculatorsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetAvailableTaxCalculatorsQuery, GetAvailableTaxCalculatorsQueryVariables>({
    query: GetAvailableTaxCalculatorsDocument,
    ...options,
  });
}
export const GetAvailableHistoricalTaxCalculatorsDocument = gql`
  query getAvailableHistoricalTaxCalculators {
    taxConfiguration {
      historyAvailableCalculators {
        id
        description
      }
    }
  }
`;

export function useGetAvailableHistoricalTaxCalculatorsQuery(
  options?: Omit<Urql.UseQueryArgs<GetAvailableHistoricalTaxCalculatorsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetAvailableHistoricalTaxCalculatorsQuery, GetAvailableHistoricalTaxCalculatorsQueryVariables>({
    query: GetAvailableHistoricalTaxCalculatorsDocument,
    ...options,
  });
}
export const GetTaxConfigMainTableValuesDocument = gql`
  query getTaxConfigMainTableValues(
    $calculatorId: UUID!
    $tableCode: String!
    $first: Int
    $after: String
    $last: Int
    $before: String
    $where: ITaxConfigMainTableRowFilterInput
    $order: [ITaxConfigMainTableRowSortInput!]
  ) {
    taxConfiguration {
      listTableValues(
        calculatorId: $calculatorId
        tableCode: $tableCode
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
          ...TaxConfigMainTableRowFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${TaxConfigMainTableRowFragmentDoc}
  ${TaxConfigColumnFragmentDoc}
  ${CityFragmentDoc}
`;

export function useGetTaxConfigMainTableValuesQuery(
  options: Omit<Urql.UseQueryArgs<GetTaxConfigMainTableValuesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetTaxConfigMainTableValuesQuery, GetTaxConfigMainTableValuesQueryVariables>({
    query: GetTaxConfigMainTableValuesDocument,
    ...options,
  });
}
export const GetTaxConfigSubTableValuesDocument = gql`
  query getTaxConfigSubTableValues(
    $calculatorId: UUID!
    $tableCode: String!
    $year: Int!
    $subTable: String!
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    taxConfiguration {
      listSubTableValue(
        calculatorId: $calculatorId
        tableCode: $tableCode
        year: $year
        subTable: $subTable
        first: $first
        after: $after
        last: $last
        before: $before
      ) {
        pageInfo {
          ...PageInfoFragment
        }
        nodes {
          ...TaxConfigSubTableRowFragment
        }
        totalCount
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${TaxConfigSubTableRowFragmentDoc}
`;

export function useGetTaxConfigSubTableValuesQuery(
  options: Omit<Urql.UseQueryArgs<GetTaxConfigSubTableValuesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetTaxConfigSubTableValuesQuery, GetTaxConfigSubTableValuesQueryVariables>({
    query: GetTaxConfigSubTableValuesDocument,
    ...options,
  });
}
export const GetAllTaxConfigSubTableValuesDocument = gql`
  query getAllTaxConfigSubTableValues(
    $calculatorId: UUID!
    $tableCode: String!
    $year: Int!
    $groupReference: UUID
    $subTable: String!
  ) {
    taxConfiguration {
      listSubTableValueFull(
        calculatorId: $calculatorId
        tableCode: $tableCode
        year: $year
        groupReference: $groupReference
        subTable: $subTable
      ) {
        ...TaxConfigSubTableRowFragment
      }
    }
  }
  ${TaxConfigSubTableRowFragmentDoc}
`;

export function useGetAllTaxConfigSubTableValuesQuery(
  options: Omit<Urql.UseQueryArgs<GetAllTaxConfigSubTableValuesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetAllTaxConfigSubTableValuesQuery, GetAllTaxConfigSubTableValuesQueryVariables>({
    query: GetAllTaxConfigSubTableValuesDocument,
    ...options,
  });
}
export const GetTaxConfigMainTableValueDocument = gql`
  query getTaxConfigMainTableValue($calculatorId: UUID!, $tableCode: String!, $tableValueId: Int!) {
    taxConfiguration {
      tableValueBundle(calculatorId: $calculatorId, tableCode: $tableCode, tableValueId: $tableValueId) {
        ...TaxConfigValueBundleFragment
      }
    }
  }
  ${TaxConfigValueBundleFragmentDoc}
  ${TaxCalculatorFragmentDoc}
  ${TableFragmentDoc}
  ${ColumnFragmentDoc}
  ${TaxConfigMainTableRowFragmentDoc}
  ${TaxConfigColumnFragmentDoc}
  ${CityFragmentDoc}
  ${TaxConfigSubTableRowFragmentDoc}
`;

export function useGetTaxConfigMainTableValueQuery(
  options: Omit<Urql.UseQueryArgs<GetTaxConfigMainTableValueQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetTaxConfigMainTableValueQuery, GetTaxConfigMainTableValueQueryVariables>({
    query: GetTaxConfigMainTableValueDocument,
    ...options,
  });
}
export const AddTaxConfigMainTableValueDocument = gql`
  mutation addTaxConfigMainTableValue($calculatorId: UUID!, $tableCode: String!, $input: TaxConfigInput!) {
    taxConfiguration {
      addTableValue(calculatorId: $calculatorId, tableCode: $tableCode, input: $input) {
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

export function useAddTaxConfigMainTableValueMutation() {
  return Urql.useMutation<AddTaxConfigMainTableValueMutation, AddTaxConfigMainTableValueMutationVariables>(
    AddTaxConfigMainTableValueDocument,
  );
}
export const UpdateTaxConfigMainTableValueDocument = gql`
  mutation updateTaxConfigMainTableValue(
    $calculatorId: UUID!
    $tableCode: String!
    $tableValueId: Int!
    $input: TaxConfigInput!
  ) {
    taxConfiguration {
      updateTableValue(calculatorId: $calculatorId, tableCode: $tableCode, tableValueId: $tableValueId, input: $input) {
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

export function useUpdateTaxConfigMainTableValueMutation() {
  return Urql.useMutation<UpdateTaxConfigMainTableValueMutation, UpdateTaxConfigMainTableValueMutationVariables>(
    UpdateTaxConfigMainTableValueDocument,
  );
}
export const DeleteTaxConfigMainTableValueDocument = gql`
  mutation deleteTaxConfigMainTableValue($calculatorId: UUID!, $tableValueId: Int!) {
    taxConfiguration {
      deleteTableValue(calculatorId: $calculatorId, tableValueId: $tableValueId) {
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

export function useDeleteTaxConfigMainTableValueMutation() {
  return Urql.useMutation<DeleteTaxConfigMainTableValueMutation, DeleteTaxConfigMainTableValueMutationVariables>(
    DeleteTaxConfigMainTableValueDocument,
  );
}
export const DeleteTaxConfigMainTableValuesDocument = gql`
  mutation deleteTaxConfigMainTableValues($calculatorId: UUID!, $tableValueIds: [Int!]!) {
    taxConfiguration {
      deleteTableValueRange(calculatorId: $calculatorId, tableValueIds: $tableValueIds) {
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

export function useDeleteTaxConfigMainTableValuesMutation() {
  return Urql.useMutation<DeleteTaxConfigMainTableValuesMutation, DeleteTaxConfigMainTableValuesMutationVariables>(
    DeleteTaxConfigMainTableValuesDocument,
  );
}
export const AddTaxConfigSubTableValueDocument = gql`
  mutation addTaxConfigSubTableValue(
    $calculatorId: UUID!
    $tableCode: String!
    $year: Int!
    $input: TaxConfigSubValueRowInput!
  ) {
    taxConfiguration {
      addSubTableValue(calculatorId: $calculatorId, tableCode: $tableCode, year: $year, input: $input) {
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

export function useAddTaxConfigSubTableValueMutation() {
  return Urql.useMutation<AddTaxConfigSubTableValueMutation, AddTaxConfigSubTableValueMutationVariables>(
    AddTaxConfigSubTableValueDocument,
  );
}
export const UpdateTaxConfigSubTableValueDocument = gql`
  mutation updateTaxConfigSubTableValue(
    $calculatorId: UUID!
    $tableCode: String!
    $year: Int!
    $subTableValueId: Int!
    $input: TaxConfigSubValueRowInput!
  ) {
    taxConfiguration {
      updateSubTableValue(
        calculatorId: $calculatorId
        tableCode: $tableCode
        year: $year
        subTableValueId: $subTableValueId
        input: $input
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

export function useUpdateTaxConfigSubTableValueMutation() {
  return Urql.useMutation<UpdateTaxConfigSubTableValueMutation, UpdateTaxConfigSubTableValueMutationVariables>(
    UpdateTaxConfigSubTableValueDocument,
  );
}
export const DeleteTaxConfigSubTableValueDocument = gql`
  mutation deleteTaxConfigSubTableValue(
    $calculatorId: UUID!
    $tableCode: String!
    $year: Int!
    $subTableValueId: Int!
  ) {
    taxConfiguration {
      deleteSubTableValue(
        calculatorId: $calculatorId
        tableCode: $tableCode
        year: $year
        subTableValueId: $subTableValueId
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

export function useDeleteTaxConfigSubTableValueMutation() {
  return Urql.useMutation<DeleteTaxConfigSubTableValueMutation, DeleteTaxConfigSubTableValueMutationVariables>(
    DeleteTaxConfigSubTableValueDocument,
  );
}
export const DeleteTaxConfigSubTableValuesDocument = gql`
  mutation deleteTaxConfigSubTableValues(
    $calculatorId: UUID!
    $tableCode: String!
    $year: Int!
    $subTableValueIds: [Int!]!
  ) {
    taxConfiguration {
      deleteSubTableValueRange(
        calculatorId: $calculatorId
        tableCode: $tableCode
        year: $year
        subTableValueIds: $subTableValueIds
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

export function useDeleteTaxConfigSubTableValuesMutation() {
  return Urql.useMutation<DeleteTaxConfigSubTableValuesMutation, DeleteTaxConfigSubTableValuesMutationVariables>(
    DeleteTaxConfigSubTableValuesDocument,
  );
}
export const ExportTaxConfigMainTableValuesDocument = gql`
  query exportTaxConfigMainTableValues(
    $calculatorId: UUID!
    $tableCode: String!
    $where: ITaxConfigMainTableRowFilterInput
    $order: [ITaxConfigMainTableRowSortInput!]
  ) {
    taxConfiguration {
      exportToExcelMainTable(calculatorId: $calculatorId, tableCode: $tableCode, where: $where, order: $order) {
        resourceUrl
      }
    }
  }
`;

export function useExportTaxConfigMainTableValuesQuery(
  options: Omit<Urql.UseQueryArgs<ExportTaxConfigMainTableValuesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ExportTaxConfigMainTableValuesQuery, ExportTaxConfigMainTableValuesQueryVariables>({
    query: ExportTaxConfigMainTableValuesDocument,
    ...options,
  });
}
export const ExportTaxConfigSubTableValuesDocument = gql`
  query exportTaxConfigSubTableValues(
    $calculatorId: UUID!
    $tableCode: String!
    $subTable: String!
    $year: Int!
    $where: ITaxConfigSubTableRowFilterInput
    $order: [ITaxConfigSubTableRowSortInput!]
  ) {
    taxConfiguration {
      exportToExcelSubTables(
        calculatorId: $calculatorId
        tableCode: $tableCode
        subTable: $subTable
        year: $year
        where: $where
        order: $order
      ) {
        resourceUrl
      }
    }
  }
`;

export function useExportTaxConfigSubTableValuesQuery(
  options: Omit<Urql.UseQueryArgs<ExportTaxConfigSubTableValuesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ExportTaxConfigSubTableValuesQuery, ExportTaxConfigSubTableValuesQueryVariables>({
    query: ExportTaxConfigSubTableValuesDocument,
    ...options,
  });
}
export const CheckTagConfigTableValueExistsDocument = gql`
  query checkTagConfigTableValueExists(
    $calculatorId: UUID!
    $tableCode: String!
    $year: Int!
    $groupingReference: UUID
  ) {
    taxConfiguration {
      checkTableValueExists(
        calculatorId: $calculatorId
        tableCode: $tableCode
        year: $year
        groupingReference: $groupingReference
      )
    }
  }
`;

export function useCheckTagConfigTableValueExistsQuery(
  options: Omit<Urql.UseQueryArgs<CheckTagConfigTableValueExistsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<CheckTagConfigTableValueExistsQuery, CheckTagConfigTableValueExistsQueryVariables>({
    query: CheckTagConfigTableValueExistsDocument,
    ...options,
  });
}
