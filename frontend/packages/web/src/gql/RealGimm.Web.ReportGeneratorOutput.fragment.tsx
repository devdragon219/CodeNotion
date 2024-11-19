// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { ReportGeneratorFilterFieldFragmentDoc } from './RealGimm.Web.ReportGeneratorFilterField.fragment';

export type ReportGeneratorOutputFragment = {
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
};

export const ReportGeneratorOutputFragmentDoc = gql`
  fragment ReportGeneratorOutputFragment on ReportGeneratorOutput {
    id
    name
    supportedFormats
    filterFields {
      ...ReportGeneratorFilterFieldFragment
    }
  }
`;
