// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type ReportGeneratorFilterFieldFragment = {
  __typename?: 'ReportGeneratorFilterField';
  name: string;
  label: string;
  isMandatory: boolean;
  type: Types.CustomFieldType;
  validValues?: Array<{ __typename?: 'KeyValuePairOfStringAndString'; key: string; value: string }> | null;
};

export const ReportGeneratorFilterFieldFragmentDoc = gql`
  fragment ReportGeneratorFilterFieldFragment on ReportGeneratorFilterField {
    name
    label
    isMandatory
    type
    validValues {
      key
      value
    }
  }
`;
