// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';
import * as Urql from 'urql';

import { ReportGeneratorFilterFieldFragmentDoc } from './RealGimm.Web.ReportGeneratorFilterField.fragment';
import { ReportGeneratorOutputFragmentDoc } from './RealGimm.Web.ReportGeneratorOutput.fragment';
import { ValidationErrorFragmentDoc } from './RealGimm.Web.ValidationError.fragment';

export type GetAvailableReportGeneratorsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetAvailableReportGeneratorsQuery = {
  __typename?: 'Query';
  reportGenerator: {
    __typename?: 'ReportGeneratorQueries';
    availableReportGenerators: Array<{
      __typename?: 'ReportGeneratorOutput';
      id: string;
      name: string;
      supportedFormats: Array<Types.ReportFormat>;
      filterFields: Array<
        Array<{
          __typename?: 'ReportGeneratorFilterField';
          name: string;
          label: string;
          isMandatory: boolean;
          type: Types.CustomFieldType;
          validValues?: Array<{ __typename?: 'KeyValuePairOfStringAndString'; key: string; value: string }> | null;
        }>
      >;
    }>;
  };
};

export type GenerateReportsMutationVariables = Types.Exact<{
  reportGeneratorId: Types.Scalars['UUID']['input'];
  targetReportFormats: Array<Types.ReportFormat> | Types.ReportFormat;
  filters: Array<Types.ReportGeneratorFilterInput> | Types.ReportGeneratorFilterInput;
}>;

export type GenerateReportsMutation = {
  __typename?: 'Mutation';
  reportGenerator: {
    __typename?: 'ReportGeneratorMutations';
    generateReports: {
      __typename?: 'ResultOfIEnumerableOfFileUrlOutput';
      errors?: Array<string | null> | null;
      isSuccess: boolean;
      validationErrors?: Array<{
        __typename?: 'ValidationError';
        identifier?: string | null;
        errorMessage?: string | null;
        errorCode?: string | null;
        severity: Types.ValidationSeverity;
      } | null> | null;
      value?: Array<{ __typename?: 'FileUrlOutput'; resourceUrl: string } | null> | null;
    };
  };
};

export const GetAvailableReportGeneratorsDocument = gql`
  query getAvailableReportGenerators {
    reportGenerator {
      availableReportGenerators {
        ...ReportGeneratorOutputFragment
      }
    }
  }
  ${ReportGeneratorOutputFragmentDoc}
  ${ReportGeneratorFilterFieldFragmentDoc}
`;

export function useGetAvailableReportGeneratorsQuery(
  options?: Omit<Urql.UseQueryArgs<GetAvailableReportGeneratorsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetAvailableReportGeneratorsQuery, GetAvailableReportGeneratorsQueryVariables>({
    query: GetAvailableReportGeneratorsDocument,
    ...options,
  });
}
export const GenerateReportsDocument = gql`
  mutation generateReports(
    $reportGeneratorId: UUID!
    $targetReportFormats: [ReportFormat!]!
    $filters: [ReportGeneratorFilterInput!]!
  ) {
    reportGenerator {
      generateReports(
        reportGeneratorId: $reportGeneratorId
        targetReportFormats: $targetReportFormats
        filters: $filters
      ) {
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

export function useGenerateReportsMutation() {
  return Urql.useMutation<GenerateReportsMutation, GenerateReportsMutationVariables>(GenerateReportsDocument);
}
